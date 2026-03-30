import type { PaymentMethod } from "@/schema/payment-method";
import { createDialogStore } from "./dialog-store";

export const usePaymentMethodStore = createDialogStore<PaymentMethod>();
