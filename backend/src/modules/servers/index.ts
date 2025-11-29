import { Elysia, t } from "elysia";
import { ServerService } from "./service";
import { ServerModel } from "./model";
import { betterAuthContext } from "../../../plugins/auth";
import { ContainerService } from "../containers/service";

export const serversModule = new Elysia({ prefix: "/api/servers" })
  .use(betterAuthContext)
  .get(
    "/",
    async ({ user }) => {
      return await ServerService.getAll(user.id);
    },
    { auth: true }
  )
  .get(
    "/:id",
    async ({ params: { id }, user }) => {
      const server = await ServerService.getById(user.id, id);

      if (!server) {
        throw new Error("Server not found");
      }

      const containerStatus = await ContainerService.getStatus(
        server.containerId
      );

      return {
        ...server,
        container: containerStatus,
      };
    },
    { auth: true }
  )
  .get(
    "/:id/stats",
    async ({ params: { id }, user }) => {
      const server = await ServerService.getById(user.id, id);
      if (!server) throw new Error("Server not found");

      const stats = await ContainerService.getPerformanceStats(
        server.containerId
      );
      return stats;
    },
    {
      auth: true,
    }
  )
  .post(
    "/",
    async ({ body, user }) => {
      try {
        const server = await ServerService.create(user.id, body);
        console.log("Server created:", server);
        try {
          const { containerId, port, ip } = await ContainerService.create(
            server
          );
          await ServerService.setContainerInfo(
            server.id,
            containerId,
            port,
            ip
          );

          return server;
        } catch (err) {
          console.error("Original error:", err);
          await ServerService.delete(user.id, server.id);
          throw new Error("Failed to create container");
        }
      } catch (err) {
        throw err;
      }
    },
    {
      body: ServerModel.createServerSchema,
      auth: true,
    }
  )
  .delete(
    "/:id",
    async ({ params: { id }, user }) => {
      const server = await ServerService.getById(user.id, id);

      if (!server) throw new Error("Server not found");

      await ContainerService.delete(server.containerId);
      await ServerService.delete(user.id, id);

      console.log("Deleted server: ", server);

      return { success: true };
    },
    { auth: true }
  );
