import { useCategoryStore } from "@/stores/use-category-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function CategoriesViewDialog() {
  const { open, currentRow: category, setOpen, setCurrentRow } = useCategoryStore();

  const isOpen = open !== null && open === "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  if (!category) return;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="sm:max-w-106.25 ">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>Information about category details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium">{category.name}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
