import { z } from "zod";

export const categorySchema = z.object({
  id: z.int(),
  name: z
    .string()
    .nonempty("Category name is required")
    .min(3, "Category name must be at least 3 characters long"),
  slug: z.string(),
});

export const createCategorySchema = categorySchema.pick({
  name: true,
});

export const updateCategorySchema = categorySchema.omit({
  slug: true,
});

export type Category = z.infer<typeof categorySchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
