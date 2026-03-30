import z from "zod";

export const fundraiserSchema = z.object({
  id: z.int(),
  userId: z.int(),
  user: z.object({
    name: z.string(),
    image: z.string().nullable(),
  }),
  status: z.enum(["pending", "approved", "rejected"]),
  adminNotes: z.string().nullable(),
  createdAt: z.string(),
});

export type Fundraiser = z.infer<typeof fundraiserSchema>;
