import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const donationSchema = z.object({
  id: z.number(),
  campaign: z.object({
    title: z.string(),
  }),
  donor: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  amount: z.bigint().positive("Amount must be greater than zero"),
  // proof: z
  //   .custom((val) => val instanceof FileList, "Harus berupa file")
  //   .transform((list) => (list as FileList)[0]) // Ambil file pertama dari FileList
  //   .refine((file) => file !== undefined || file !== "", "File tidak boleh kosong"),
  transferProof: z
    .custom<FileList>()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
  status: z.enum(["pending", "success", "failed"]),
});

export const createDonationSchema = donationSchema.pick({
  donor: true,
  transferProof: true,
  notes: true,
});

export const updateDonationSchema = donationSchema.pick({
  id: true,
  status: true,
});

export type Donation = z.infer<typeof donationSchema>;
export type CreateDonation = z.infer<typeof createDonationSchema>;
export type UpdateDonation = z.infer<typeof updateDonationSchema>;
