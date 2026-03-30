import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").pipe(z.email("Email not valid")),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password minimum 8 characters"),
});

export type Login = z.infer<typeof loginSchema>;
