import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Server } from "@/lib/eden";
import { Server as ServerIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export function ServerCard(props: Server) {
  function copyToClipboard(text: string) {
    return navigator.clipboard.writeText(text);
  }

  function serverAddress(ip: string, port: number) {
    return `${ip}:${port}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ServerIcon className="w-5 h-5" />
          <span>Game Server</span>
        </CardTitle>
        <CardDescription>Metadata about your server</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col space-y-2 text-sm">
          <li>
            <span className="font-medium">Name: </span>
            {props.serverName}
          </li>
          <li>
            <span className="font-medium">Status:</span> {props.status}
          </li>
          <li>
            <span className="font-medium">Game:</span> {props.type}
          </li>
          <li>
            <span className="font-medium">Adress:</span>{" "}
            {serverAddress(props.ip || "https://localhost:3000", props.port)}
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() =>
              copyToClipboard(
                `${props.ip || "https://localhost:3000"}:${props.port}`
              )
            }
            className="text-xs"
          >
            Copy IP to Clipboard
          </Button>
          <Button variant="link" asChild>
            <Link
              className="text-xs"
              to="/servers/$serverId"
              params={{ serverId: props.id }}
            >
              View Server Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
