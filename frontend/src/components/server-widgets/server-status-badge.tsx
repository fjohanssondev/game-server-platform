import { Badge } from "@/components/ui/badge";
import type { GameStatus } from "../../../../backend/generated/prisma_client/enums";

export function ServerStatusBadge({ status }: { status: GameStatus }) {
  switch (status) {
    case "RUNNING":
      return (
        <Badge variant="default" className="bg-green-500 text-black">
          Online
        </Badge>
      );
    case "STOPPED":
      return <Badge variant="destructive">Offline</Badge>;
    case "CREATING":
      return (
        <Badge variant="secondary" className="bg-yellow-500">
          Starting
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
