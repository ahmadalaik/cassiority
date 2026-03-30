import { useUserStore } from "@/stores/use-users-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function UsersViewDialog() {
  const { open, currentRow: user, setOpen, setCurrentRow } = useUserStore();
  if (!user) return;

  const isOpen = open !== null && open === "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const formattedType = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="sm:max-w-120 ">
        <DialogHeader>
          <DialogTitle>Payment Method Details</DialogTitle>
          <DialogDescription>Information about payment method details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Name</span>
            <span className="font-normal">{user.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Email</span>
            <span className="font-normal">{user.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Role</span>
            <span className="font-normal">{formattedType(user.role)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
