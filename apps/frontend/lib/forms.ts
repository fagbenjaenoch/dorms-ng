import * as z from "zod";

const baseAuthSchema = z.object({
  email: z.email("Email is not valid"),
  password: z
    .string()
    .min(8, "Password must not be less than 8 characters")
    .max(128, "Password must not be more than 128 characters")
    .regex(
      /^[\x20-\x7E]+$/g,
      "Passwords can only contain standard English letters, numbers, spaces and punctuation.",
    ), // x20 - x7E are the standard characters in ASCII
});

export const signupSchema = baseAuthSchema.extend({
  fullname: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name should not be more than 100 characters")
    .regex(/^[A-Za-z]+$/, "Full name must only contain standard English characters"),
});

export type SignupData = z.infer<typeof signupSchema>;

export const loginSchema = baseAuthSchema;

export type LoginData = z.infer<typeof loginSchema>;
