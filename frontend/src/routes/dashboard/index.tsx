import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return <main>Hello</main>;
}
