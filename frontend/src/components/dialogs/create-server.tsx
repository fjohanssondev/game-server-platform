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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateServerDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Create Server</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create server</DialogTitle>
            <DialogDescription>
              You're almost there with your new server. Pick a name, password
              and the type of game you want to host.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Server name</Label>
              <Input id="name" name="name" placeholder="My Server" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                autoComplete="new-password"
                name="password"
                type="password"
                placeholder="************"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="game">Game</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enshrouded">Enshrouded</SelectItem>
                  <SelectItem value="satisfactory">Satisfactory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
