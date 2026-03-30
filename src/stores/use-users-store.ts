import { type UserType } from "@/schema/user";
import { createDialogStore } from "./dialog-store";

export const useUserStore = createDialogStore<UserType>();
