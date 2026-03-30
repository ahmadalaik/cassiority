import type { Campaign } from "@/schema/campaign";
import { createDialogStore } from "./dialog-store";

export const useCampaignStore = createDialogStore<Campaign>();
