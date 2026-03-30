import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { useCampaignStore } from "@/stores/use-campaign-store";

export default function CampaignsPrimaryButton() {
  const { onAdd } = useDialogActions(useCampaignStore);

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={onAdd}>
        <Plus size={18} />
        <span>New Campaign</span>
      </Button>
    </div>
  );
}
