import { useDonationStore } from "@/stores/use-donation-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { useAuthStore } from "@/stores/use-auth-store";

export default function DonationsViewDialog() {
  const user = useAuthStore((state) => state.user);
  const { open, currentRow: donation, setOpen, setCurrentRow } = useDonationStore();

  const isOpen = open !== null && open === "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  if (!donation) return;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="sm:max-w-106.25 ">
        <DialogHeader>
          <DialogTitle>Donation Details</DialogTitle>
          <DialogDescription>Information about donation details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {user.role === "admin" && (
            <img
              className="w-full bg-cover"
              src={typeof donation.transferProof === "string" ? donation.transferProof : ""}
            />
          )}
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Donor</span>
            <span className="font-medium">{donation.donor}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Campaign</span>
            <span className="font-medium">{donation.campaign.title}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">{formatCurrency(donation.amount)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">
              {format(parseISO(donation.createdAt), "MMMM dd, yyyy - HH:mm:ss")}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
