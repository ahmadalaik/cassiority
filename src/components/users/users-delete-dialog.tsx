import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { OctagonAlert, Trash, X } from "lucide-react";
import { useUserStore } from "@/stores/use-users-store";
import { useUsers } from "@/hooks/use-users";

export default function UsersDeleteDialog() {
  const { open, setOpen, currentRow: user, setCurrentRow } = useUserStore();
  const { deleteUser } = useUsers();

  const isOpen = open !== null && open === "delete";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    await deleteUser.mutateAsync(id);

    handleClose(isOpen);
  };

  if (!user) return;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-5 w-5 text-destructive" />
            </div>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete the user
            {": "}
            <strong>{user.name}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X /> Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(user.id)}
            className="bg-destructive hover:bg-destructive/90"
            disabled={deleteUser.isPending}
          >
            <Trash /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
