import { t } from "elysia";

export namespace ServerModel {
  export const createServerSchema = t.Object({
    type: t.Enum({ ENSHROUDED: "ENSHROUDED" }),
    serverName: t.String({ minLength: 1, maxLength: 50 }),
    password: t.Optional(t.String({ minLength: 4 })),
    maxPlayers: t.Optional(t.Number({ minimum: 1, maximum: 100 }))
  })

  export type CreateServerInput = typeof createServerSchema.static
}