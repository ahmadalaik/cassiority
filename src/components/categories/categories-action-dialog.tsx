import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/stores/use-category-store";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorySchema,
  updateCategorySchema,
  type CreateCategory,
  type UpdateCategory,
} from "@/schema/category";
import { useAdminCategoryActions } from "@/hooks/admin/use-admin-categories";

export default function CategoriesActionDialog() {
  const { open, currentRow, setOpen, setCurrentRow } = useCategoryStore();
  const { createCategory, updateCategory } = useAdminCategoryActions();

  const isOpen = open !== null && open !== "delete" && open !== "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const form = useForm<CreateCategory | UpdateCategory>({
    resolver: zodResolver(currentRow ? updateCategorySchema : createCategorySchema),
    values: {
      ...(currentRow && { id: currentRow.id }),
      name: currentRow?.name || "",
    },
  });

  const onSubmit = async (data: CreateCategory | UpdateCategory) => {
    if (!currentRow) {
      await createCategory.mutateAsync(data);
    }

    if (currentRow) {
      await updateCategory.mutateAsync({ ...data, id: currentRow.id });
    }

    form.reset();
    handleClose(isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{currentRow ? "Edit Category" : "Create Category"}</DialogTitle>
          <DialogDescription>
            {currentRow ? "Update the category here. " : "Create new category here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form id="form-category" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-category-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-category-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Category Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="form-category"
            disabled={createCategory.isPending || updateCategory.isPending}
          >
            {currentRow ? "Save changes" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
