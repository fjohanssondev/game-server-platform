import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/eden";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  name: z.string().min(3).max(30),
  password: z.string().min(5).max(30),
  game: z.enum(["ENSHROUDED"]),
});

export function CreateServerDialog() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      name,
      password,
      game,
    }: z.infer<typeof formSchema>) => {
      const { data: server, error } = await client.api.servers.post({
        serverName: name,
        password,
        type: game,
        maxPlayers: 4,
      });

      if (error) throw error;

      return server;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["servers"],
      });
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
      game: "ENSHROUDED" as const,
    } as FormValues,
    onSubmit: async ({ value }) => {
      mutate({
        name: value.name,
        password: value.password,
        game: value.game,
      });
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Server</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create server</DialogTitle>
          <DialogDescription>
            You're almost there with your new server. Pick a name, password and
            the type of game you want to host.
          </DialogDescription>
        </DialogHeader>
        <form
          id="create-server-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Server name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="My Server"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    <FieldDescription>
                      This will be the name of the server everyone will see.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      autoComplete="new-password"
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      placeholder="**********"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      Provide a super secure password for your server.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="game"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Type of Game</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as FormValues["game"])
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your game" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ENSHROUDED">Enshrouded</SelectItem>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="create-server-form" type="submit">
            {isPending ? <Spinner /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
