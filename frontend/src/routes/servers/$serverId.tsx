import { Container } from "@/components/container";
import { ServerActions } from "@/components/server-widgets/server-actions";
import { ServerDanger } from "@/components/server-widgets/server-danger";
import { ServerInfo } from "@/components/server-widgets/server-info";
import { ServerStatus } from "@/components/server-widgets/server-status";
import { client } from "@/lib/eden";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
        <Link
          className="flex items-center space-x-2 text-sm hover:underline"
          to="/dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go back</span>
        </Link>

        <div className="flex justify-between items-center mt-6">
          <h1 className="text-2xl">Server Details</h1>
        </div>
        <section className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServerInfo {...server} />
            <ServerStatus {...server} />
            <ServerDanger {...server} />
            <ServerActions {...server} />
          </div>
        </section>
      </Container>
    </main>
  );
}
