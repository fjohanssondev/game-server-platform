import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/eden";
import { HeartPulse } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type {
  Games,
  GameStatus,
} from "../../../../backend/generated/prisma_client/enums";
import { formatUptime } from "@/lib/utils";
import { ServerStatusBadge } from "./server-status-badge";

interface ServerStatusProps {
  container: {
    containerId: string;
    status: string;
    uptime: number;
  };
  status: GameStatus;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  password: string;
  type: Games;
  serverName: string;
  ip: string;
  port: number;
  containerId: string;
  maxPlayers: number;
}

export function ServerStatus(server: ServerStatusProps) {
  const { data } = useQuery({
    queryKey: ["server-status", server.id],
    queryFn: async () => {
      const { data, error } = await client.api
        .servers({ id: server.id })
        .stats.get();

      if (error) throw error;

      return data;
    },
    refetchInterval: 3000,
    enabled: !!server.id,
  });

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
        <div className="flex flex-col space-y-8">
          <ul className="flex flex-col space-y-4">
            <li className="flex justify-between">
              <span className="text-sm">Status</span>
              <ServerStatusBadge status={server.status} />
            </li>
            <li className="flex justify-between">
              <span className="text-sm">Uptime</span>
              <span className="text-sm">
                {formatUptime(server.container.uptime)}
              </span>
            </li>
          </ul>
          <ul className="flex flex-col space-y-4">
            <li className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">CPU</p>
                <div className="flex space-x-1">
                  <p className="text-xs">{data?.cpu.percent}</p>
                  <span className="text-xs">/</span>
                  <p className="text-xs">100%</p>
                </div>
              </div>
              <Progress value={Number(data?.cpu.percent)} />
            </li>
            <li className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">RAM</p>
                <div className="flex space-x-1">
                  <p className="text-xs">
                    {(Number(data?.memory.usage) / 1000).toFixed(2)}
                  </p>
                  <span className="text-xs">/</span>
                  <p className="text-xs">
                    {(Number(data?.memory.limit) / 1000).toFixed(2)} GB
                  </p>
                </div>
              </div>
              <Progress value={Number(data?.memory.percent)} />
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
