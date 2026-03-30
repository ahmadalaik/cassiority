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
import { useCampaignStore } from "@/stores/use-campaign-store";
import { useAdminCampaignActions } from "@/hooks/admin/use-admin-campaigns";

export default function CampaignsDeleteDialog() {
  const { open, setOpen, currentRow, setCurrentRow } = useCampaignStore();
  const { deleteCampaign } = useAdminCampaignActions();

  const isOpen = open !== null && open === "delete";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const handleDelete = async () => {
    if (!currentRow) return;
    await deleteCampaign.mutateAsync(currentRow.id);

    handleClose(isOpen);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-5 w-5 text-destructive" />
            </div>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete the category
            {": "}
            <strong>{currentRow?.category.name}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setCurrentRow(null)}>
            <X /> Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90 text-accent"
          >
            <Trash /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
