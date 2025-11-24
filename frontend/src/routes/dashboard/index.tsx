import { CreateServerDialog } from "@/components/dialogs/create-server";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router";
import { Server } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <main className="flex items-center h-[calc(100vh_-_3.5rem)]">
      <div className="container mx-auto px-4">
        <div>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Server />
              </EmptyMedia>
              <EmptyTitle>No servers here</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any server yet. Get started by creating
                your first server.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <CreateServerDialog />
                <Button variant="outline">Read More</Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </main>
  );
}
