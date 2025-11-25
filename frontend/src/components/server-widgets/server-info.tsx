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
import { Globe } from "lucide-react";

export function ServerInfo(server: Server) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-md font-medium">
          <Globe />
          <span>Server Information</span>
        </CardTitle>
        <CardDescription>
          Here you can change and view settings for your server.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel>Server name</FieldLabel>
                <Input value={server.serverName} />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <div className="flex gap-8">
                <Field>
                  <FieldLabel>IP Address</FieldLabel>
                  <Input
                    className="text-muted-foreground"
                    value={server.ip}
                    readOnly
                  />
                </Field>
                <Field>
                  <FieldLabel>Port</FieldLabel>
                  <Input
                    className="text-muted-foreground"
                    value={server.port}
                    readOnly
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
