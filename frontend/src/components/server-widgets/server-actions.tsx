import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Server } from "@/lib/eden";
import { Wand } from "lucide-react";
import { Button } from "../ui/button";

export function ServerActions(server: Server) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-md font-medium">
          <Wand />
          <span>Server Actions</span>
        </CardTitle>
        <CardDescription>Take action on your server.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Button>Restart server</Button>
          <Button variant="outline">Stop server</Button>
          <Button variant="link">View logs</Button>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
