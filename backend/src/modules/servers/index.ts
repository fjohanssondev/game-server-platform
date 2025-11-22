import { Elysia } from "elysia";
import { ServerService } from "./service";
import { ServerModel } from "./model";
import { betterAuthContext } from "../../../plugins/auth";

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
      return await ServerService.getById(user.id, id);
    },
    { auth: true }
  )
  .post(
    "/",
    async ({ body, user }) => {
      return await ServerService.create(user.id, body);
    },
    {
      body: ServerModel.createServerSchema,
      auth: true,
    }
  );
