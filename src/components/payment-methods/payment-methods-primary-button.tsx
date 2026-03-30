import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { usePaymentMethodStore } from "@/stores/use-payment-method-store";

export default function PaymentMethodsPrimaryButton() {
  const { onAdd } = useDialogActions(usePaymentMethodStore);

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={onAdd}>
        <Plus size={18} />
        <span>Add Payment Method</span> 
      </Button>
    </div>
  );
}
