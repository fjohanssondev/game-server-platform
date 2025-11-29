import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client, type Server } from "@/lib/eden";
import { TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export function ServerDanger(server: Server) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["server-delete"],
    mutationFn: async () => {
      const { data, error } = await client.api
        .servers({ id: server.id })
        .delete();

      if (error) throw error;

      return data.success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["servers"],
      });
      //TODO: navigate
    },
  });

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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                {isPending ? <Spinner /> : "Delete Server"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your server and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutate()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline">Pause Server</Button>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
