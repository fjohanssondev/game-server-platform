import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Server } from "@/lib/eden";
import { TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";

export function ServerDanger(server: Server) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-md font-medium">
          <TriangleAlert />
          <span>Danger Zone</span>
        </CardTitle>
        <CardDescription>
          Be cautious! Deleting your server is irreversible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Button>Delete server</Button>
          <Button variant="outline">Pause Server</Button>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
