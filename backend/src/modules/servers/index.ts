import { Elysia } from "elysia";
import { Server } from "./service";
import { ServerModel } from "./model";
import { betterAuthContext } from "../../../plugins/auth";

export const serversModule = new Elysia({ prefix: "/api/servers" })
  .use(betterAuthContext)
  .get(
    "/",
    async ({ user }) => {
      return await Server.getServers(user.id);
    },
    { auth: true }
  )
  .post(
    "/",
    async ({ body, user }) => {
      return await Server.createServer(user.id, body);
    },
    {
      body: ServerModel.createServerSchema,
      auth: true,
    }
  );
