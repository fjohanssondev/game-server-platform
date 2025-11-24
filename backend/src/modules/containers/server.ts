import Dockerode from "dockerode";
import type { GameServer } from "../../../generated/prisma_client/client";

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

    return {
      containerId: info.Id,
      status: info.State.Status,
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
