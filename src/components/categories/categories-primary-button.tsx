import { PackagePlus } from "lucide-react";
import { Button } from "../ui/button";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { useCategoryStore } from "@/stores/use-category-store";

export default function CategoriesPrimaryButton() {
  const { onAdd } = useDialogActions(useCategoryStore);

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={onAdd}>
        <PackagePlus size={18} />
        <span>Add Category</span>
      </Button>
    </div>
  );
}
