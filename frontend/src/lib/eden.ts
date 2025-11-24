import { treaty } from "@elysiajs/eden";
import type { App } from "../../../backend/src/index";

export const client = treaty<App>("localhost:3000", {
  fetch: {
    credentials: "include",
  },
});

export type ServersResponse = Awaited<
  ReturnType<typeof client.api.servers.get>
>["data"];
export type Server = NonNullable<ServersResponse>[number];
