import { create } from "zustand";

type DialogType = "add" | "edit" | "delete" | "view";

export type DialogState<T> = {
  open: DialogType | null;
  setOpen: (open: DialogType | null) => void;
  currentRow: T | null;
  setCurrentRow: (currentRow: T | null) => void;
  reset: () => void;
}

export const createDialogStore = <T>() =>
  create<DialogState<T>>((set) => ({
    open: null,
    setOpen: (open) => set({ open }),

    currentRow: null,
    setCurrentRow: (currentRow) => set({ currentRow }),
    reset: () => set({ open: null, currentRow: null }),
  }));
