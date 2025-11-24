import { Container } from "@/components/container";
import { CreateServerDialog } from "@/components/dialogs/create-server";
import { NoServers } from "@/components/no-servers";
import { ServerCard } from "@/components/server-card";
import { Spinner } from "@/components/ui/spinner";
import { useServers } from "@/hooks/use-servers";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardComponent,
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect({ to: "/login" });
    }
  },
});

function DashboardComponent() {
  const { data: servers, isLoading } = useServers();

  if (isLoading) {
    return (
      <main>
        <div className="flex items-center min-h-[calc(100vh_-_3.5rem)]">
          <div className="flex justify-center container mx-auto px-4">
            <div>
              <Spinner width={48} height={48} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!servers || servers.length === 0) {
    return (
      <main>
        <div className="flex items-center min-h-[calc(100vh_-_3.5rem)]">
          <div className="container mx-auto px-4">
            <div>
              <NoServers />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-14">
      <Container className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Dashboard</h1>
          <CreateServerDialog />
        </div>
        <section className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {servers.map((server) => (
              <ServerCard key={server.id} {...server} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
