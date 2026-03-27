import * as z from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.email("Email is not valid"),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[A-Za-z0-9_]+/g, "Password must not contain spaces"),
});

export type SignupData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export type LoginData = z.infer<typeof loginSchema>;
