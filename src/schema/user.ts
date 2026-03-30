import z from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const userSchema = z.object({
  id: z.int(),
  name: z.string().nonempty("Name is required").min(3, "Name minimum 3 chararters"),
  email: z.string().nonempty("Email is required").pipe(z.email("Email not valid")),
  role: z
    .enum(["user", "fundraiser", "admin"], {
      error: "Please select a role",
    })
    .or(z.literal("")),
  avatar: z
    .custom<FileList>()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),
});

export const createUserSchema = userSchema
  .omit({
    id: true,
  })
  .extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.role !== "", {
    error: "Please select a role",
    path: ["role"],
  });

export const updateProfileUserSchema = userSchema.omit({
  email: true,
  role: true,
  avatar: true,
});

export const settingUserSchema = userSchema
  .omit({
    id: true,
  })
  .extend({
    pasword: z.string().nonempty().min(8, "Password must be at least 8 characters").optional(),
  });

export const updateRoleSchema = z.object({
  requestId: z.int(),
  status: z.enum(["approved", "rejected"]),
  adminNotes: z.string().optional(),
});

export type UserType = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUserProfile = z.infer<typeof updateProfileUserSchema>;
export type SettingUser = z.infer<typeof settingUserSchema>;

export type UpdateRole = z.infer<typeof updateRoleSchema>;
