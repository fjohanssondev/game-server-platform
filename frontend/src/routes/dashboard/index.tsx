import { NoServers } from "@/components/no-servers";
import { Spinner } from "@/components/ui/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const servers = [];
  const isLoading = false;
  return (
    <main>
      {isLoading ? (
        <Spinner />
      ) : servers.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex items-center min-h-[calc(100vh_-_3.5rem)]">
          <div className="container mx-auto px-4">
            <div>
              <NoServers />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
