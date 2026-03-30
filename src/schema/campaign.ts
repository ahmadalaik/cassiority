import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const campaignSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  slug: z.string(),
  description: z.string().nonempty("Description is required"),
  image: z
    .custom<FileList>()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),
  category: z.object({
    name: z.string().nonempty("Please select a category"),
  }),
  targetAmount: z.bigint({ error: "Funding goal is required" }),
  currentAmount: z.bigint(),
  deadline: z.iso.datetime({ error: "Deadline is required" }),
  totalDonors: z.bigint(),
  status: z.enum(["active", "completed", "cancelled"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCampaignSchema = campaignSchema.omit({
  id: true,
  slug: true,
  currentAmount: true,
  totalDonors: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCampaignSchema = campaignSchema.omit({
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const campaignDetailSchema = campaignSchema
  .omit({
    updatedAt: true,
  })
  .extend({
    user: z.object({
      name: z.string(),
      image: z.string(),
    }),
    donations: z.array(
      z.object({
        donor: z.string(),
        amount: z.bigint(),
        notes: z.string().optional(),
      }),
    ),
  });

export const paginateCampaignSchema = z.object({
  data: z.array(campaignSchema),
  meta: z.object({
    current_page: z.int(),
    per_page: z.int(),
    total_items: z.int(),
    total_pages: z.int(),
    has_next: z.boolean(),
    has_prev: z.boolean(),
  }),
});

export type Campaign = z.infer<typeof campaignSchema>;
export type CreateCampaign = z.infer<typeof createCampaignSchema>;
export type UpdateCampaign = z.infer<typeof updateCampaignSchema>;
export type CampaignDetail = z.infer<typeof campaignDetailSchema>;
export type PaginateCampaign = z.infer<typeof paginateCampaignSchema>;
