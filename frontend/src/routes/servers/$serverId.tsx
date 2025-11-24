import { Container } from "@/components/container";
import { client } from "@/lib/eden";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servers/$serverId")({
  component: ServerComponent,
  loader: async ({ params, context: { queryClient } }) => {
    return await queryClient.ensureQueryData({
      queryKey: ["server", params.serverId],
      queryFn: async () => {
        const { data, error } = await client.api
          .servers({ id: params.serverId })
          .get();

        if (error) throw error;

        return data;
      },
    });
  },
});

function ServerComponent() {
  const server = Route.useLoaderData();
  return (
    <main className="mt-14">
      <Container className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Server Details</h1>
        </div>
        {server.serverName}
      </Container>
    </main>
  );
}
