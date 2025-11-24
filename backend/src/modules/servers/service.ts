import { db } from "../../../lib/db";
import { ServerModel } from "./model";

export abstract class ServerService {
  static async getAll(userId: string) {
    const servers = await db.gameServer.findMany({
      where: {
        userId,
      },
    });

    return servers;
  }

  static async getById(userId: string, id: string) {
    const server = await db.gameServer.findUnique({
      where: {
        userId,
        id,
      },
    });

    return server;
  }

  static async create(userId: string, input: ServerModel.CreateServerInput) {
    const server = await db.gameServer.create({
      data: {
        serverName: input.serverName,
        password: input.password,
        maxPlayers: input.maxPlayers || 4,
        containerId: "",
        port: 15636,
        status: "CREATING",
        userId,
        type: input.type,
      },
    });

    return server;
  }

  static async delete(userId: string, serverId: string) {
    const server = await db.gameServer.delete({
      where: {
        id: serverId,
        userId,
      },
    });

    return server;
  }

  static async setContainerInfo(
    serverId: string,
    containerId: string,
    port: number
  ) {
    return await db.gameServer.update({
      where: { id: serverId },
      data: {
        containerId,
        status: "RUNNING",
        port,
      },
    });
  }
}
