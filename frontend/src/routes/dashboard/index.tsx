import { NoServers } from "@/components/no-servers";
import { Spinner } from "@/components/ui/spinner";
import { useServers } from "@/hooks/use-servers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardComponent,
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
    <main>
      {servers.map((server) => (
        <span>{server.serverName}</span>
      ))}
    </main>
  );
}
