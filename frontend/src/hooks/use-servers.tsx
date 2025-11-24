import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/eden";

export function useServers() {
  return useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      const { data, error } = await client.api.servers.get();
      if (error) throw error;
      return data;
    },
  });
}
