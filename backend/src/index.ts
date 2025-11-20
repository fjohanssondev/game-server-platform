import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors"
import Docker from "dockerode"
import { auth } from "../lib/auth";

const docker = new Docker({ socketPath: '/var/run/docker.sock' })
const app = new Elysia()
.use(cors())
.all('/api/auth/*', ({ request }) => auth.handler(request))
.get("/", () => "Hello Elysia").listen(3000)
.get('/api/docker/test', async () => {
  try {
    const containers = await docker.listContainers({ all: true });
    return {
      success: true,
      containerCount: containers.length,
      containers: containers.map(c => ({
        id: c.Id.substring(0, 12),
        name: c.Names[0],
        status: c.State
      }))
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
})



app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
