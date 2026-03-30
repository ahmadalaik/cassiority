import { formatDate, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { usePaymentMethodStore } from "@/stores/use-payment-method-store";

export default function PaymentMethodsViewDialog() {
  const { open, currentRow: paymentMethod, setOpen, setCurrentRow } = usePaymentMethodStore();
  if (!paymentMethod) return;

  const isOpen = open !== null && open === "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const formattedType = (values: string) => {
    const separator = values === "e_wallet" ? "-" : " ";
    return values
      .split("_")
      .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
      .join(separator);
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
            <span className="text-muted-foreground">Provider</span>
            <span className="font-normal">{paymentMethod.provider}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Account Number</span>
            <span className="font-normal">{paymentMethod.accountNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Account Holder Name</span>
            <span className="font-normal">{paymentMethod.accountHolderName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Type</span>
            <span className="font-normal">{formattedType(paymentMethod.type)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Created</span>
            <span className="font-normal">{formatDate(parseISO(paymentMethod.createdAt), "MMMM dd yyyy")}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
