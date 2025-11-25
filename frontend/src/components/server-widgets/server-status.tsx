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
import { HeartPulse } from "lucide-react";

export function ServerStatus(server: Server) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-md font-medium">
          <HeartPulse />
          <span>Server Status</span>
        </CardTitle>
        <CardDescription>
          View the uptime and status of your server.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <ul className="flex flex-col space-y-4">
          <li className="flex justify-between">
            <span>Status</span>
            <span>Online</span>
          </li>
          <li className="flex justify-between">
            <span>Uptime</span>
            <span>4d</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
