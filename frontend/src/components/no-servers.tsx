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
import { Server } from "lucide-react";

export function NoServers() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Server />
        </EmptyMedia>
        <EmptyTitle>No servers here</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any server yet. Get started by creating your
          first server.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <CreateServerDialog />
          <Button variant="outline">Read More</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
