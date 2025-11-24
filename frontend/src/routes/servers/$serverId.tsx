import { Container } from "@/components/container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servers/$serverId")({
  component: ServerComponent,
});

function ServerComponent() {
  return (
    <main className="mt-14">
      <Container className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Server Details</h1>
        </div>
      </Container>
    </main>
  );
}
