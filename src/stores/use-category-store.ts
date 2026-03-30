import { createDialogStore } from "@/stores/dialog-store";
import { type Category } from "@/schema/category";

export const useCategoryStore = createDialogStore<Category>();
