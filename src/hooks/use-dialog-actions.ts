import type { DialogState } from "@/stores/dialog-store";
import type { StoreApi, UseBoundStore } from "zustand";

export const useDialogActions = <T>(
  useStore: UseBoundStore<StoreApi<DialogState<T>>>
) => {
  // const { setOpen, setCurrentRow, reset } = useStore();
  const setOpen = useStore((state) => state.setOpen);
  const setCurrentRow = useStore((state) => state.setCurrentRow);
  const reset = useStore((state) => state.reset);
 
  const onAdd = () => {
    setCurrentRow(null);
    setOpen("add");
  };

  const onView = (row: T) => {
    setCurrentRow(row);
    setOpen("view");
  };

  const onEdit = (row: T) => {
    setCurrentRow(row);
    setOpen("edit");
  };

  const onDelete = (row: T) => {
    setCurrentRow(row);
    setOpen("delete");
  };

  const onClose = () => {
    reset();
  };

  return { onAdd, onView, onEdit, onDelete, onClose };
};
