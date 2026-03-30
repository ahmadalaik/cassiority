import z from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("Name is required").min(3, "Name minimum 3 chararters"),
  email: z.string().nonempty("Email is required").pipe(z.email("Email not valid")),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password minimum 8 characters"),
});

export type Register = z.infer<typeof registerSchema>;
