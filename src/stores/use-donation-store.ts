import { type Donation } from "@/schema/donation";
import { createDialogStore } from "./dialog-store";

export const useDonationStore = createDialogStore<Donation>();
