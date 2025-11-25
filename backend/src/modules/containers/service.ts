import Dockerode from "dockerode";
import type { GameServer } from "../../../generated/prisma_client/client";
import { getServerIP } from "../../../lib/network";

const docker = new Dockerode();

export abstract class ContainerService {
  static async create(server: GameServer) {
    const slug = server.serverName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const containerName = `${server.type.toLowerCase()}-${slug}-${server.id}`;

    const container = await docker.createContainer({
      name: containerName,
      Image: this.getImage(server.type),
      Env: [
        `SERVER_NAME=${server.serverName}`,
        `SERVER_PASSWORD=${server.password}`,
        `MAX_PLAYERS=${server.maxPlayers}`,
      ],
      ExposedPorts: { "15636/udp": {} },
      HostConfig: {
        PortBindings: {
          "15636/udp": [{ HostPort: "0" }], // TODO: Problably want to change this later
        },
      },
    });

    await container.start();

    const info = await container.inspect();
    const assignedPort = parseInt(
      info.NetworkSettings.Ports["15636/udp"][0].HostPort
    );

    return {
      containerId: container.id,
      port: assignedPort,
      ip: getServerIP(),
    };
  }

  private static getImage(type: GameServer["type"]) {
    const images: Record<GameServer["type"], string> = {
      ENSHROUDED: "mornedhels/enshrouded-server:latest",
    };

    return images[type];
  }

  static async getStatus(id: string) {
    const container = docker.getContainer(id);
    const info = await container.inspect();

    const startedAt = new Date(info.State.StartedAt);
    const now = new Date();
    const uptime = now.getTime() - startedAt.getTime();

    return {
      containerId: info.Id,
      status: info.State.Status,
      uptime,
    };
  }

  static async getPerformanceStats(containerId: string) {
    const container = docker.getContainer(containerId);
    const stats = await container.stats({ stream: false });

    const cpuDelta =
      stats.cpu_stats.cpu_usage.total_usage -
      stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta =
      stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    const cpuPercent =
      (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100;

    const memoryUsage = stats.memory_stats.usage;
    const memoryLimit = stats.memory_stats.limit;
    const memoryPercent = (memoryUsage / memoryLimit) * 100;

    const networks = stats.networks || {};
    const networkRx = Object.values(networks).reduce(
      (acc: number, net: any) => acc + net.rx_bytes,
      0
    );
    const networkTx = Object.values(networks).reduce(
      (acc: number, net: any) => acc + net.tx_bytes,
      0
    );

    return {
      cpu: {
        percent: cpuPercent.toFixed(2),
      },
      memory: {
        usage: (memoryUsage / 1024 / 1024).toFixed(2), // MB
        limit: (memoryLimit / 1024 / 1024).toFixed(2), // MB
        percent: memoryPercent.toFixed(2),
      },
      network: {
        rx: (networkRx / 1024 / 1024).toFixed(2), // MB
        tx: (networkTx / 1024 / 1024).toFixed(2), // MB
      },
    };
  }

  static async getById(id: string) {
    const container = docker.getContainer(id);
    const info = await container.inspect();

    return {
      name: info.Name,
      status: info.State.Status,
      createdAt: info.State.StartedAt,
    };
  }

  static async getAll() {
    const containers = await docker.listContainers({ all: true });
    return {
      success: true,
      containerCount: containers.length,
      containers: containers.map((c) => ({
        id: c.Id.substring(0, 12),
        name: c.Names[0],
        status: c.State,
      })),
    };
  }
}
