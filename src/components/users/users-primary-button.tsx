import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { useUserStore } from "@/stores/use-users-store";

export default function UsersPrimaryButton() {
  const { onAdd } = useDialogActions(useUserStore);

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={onAdd}>
        <UserPlus size={18} />
        <span>Add User</span>
      </Button>
    </div>
  );
}
