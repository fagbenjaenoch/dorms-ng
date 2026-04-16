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

export const createInstitutionSchema = z.object({
  name: z.string().min(3, "University name must be at least 3 characters"),
  acronym: z
    .string()
    .min(2, "Acronym must be at least 2 characters")
    .max(10, "Acronym is too long"),
  latitude: z
    .string()
    .regex(
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
      "Invalid latitude format (e.g. 6.5158)",
    ),
  longitude: z
    .string()
    .regex(
      /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      "Invalid longitude format (e.g. 3.3897)",
    ),
});

export type CreateInstitutionData = z.infer<typeof createInstitutionSchema>;
