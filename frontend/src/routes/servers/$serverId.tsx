import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servers/$serverId")({
  component: ServerComponent,
});

function ServerComponent() {
  return <div>Hello "/servers/$serverId"!</div>;
}
