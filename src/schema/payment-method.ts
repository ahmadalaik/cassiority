import { z } from "zod";

export const paymentMethodSchema = z.object({
  id: z.int(),
  type: z
    .enum(["bank", "e-wallet"], {
      error: "Please select a type",
    })
    .or(z.literal("")),
  provider: z
    .string()
    .nonempty("Provider is required")
    .min(3, "Provider must be at least 3 characters long"),
  accountNumber: z
    .string()
    .nonempty("Account number is required")
    .min(8, "Account number must be at least 8 characters long"),
  accountHolderName: z
    .string()
    .nonempty("Account holder name is required")
    .min(3, "Account Name must be at least 3 characters long"),
  createdAt: z.string(),
});

export const createPaymentMethodSchema = paymentMethodSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .refine((data) => data.type !== "", {
    error: "Please select a type",
    path: ["type"],
  });

export const updatePaymentMethodSchema = paymentMethodSchema.omit({
  createdAt: true,
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CreatePaymentMethod = z.infer<typeof createPaymentMethodSchema>;
export type UpdatePaymentMethod = z.infer<typeof updatePaymentMethodSchema>;
