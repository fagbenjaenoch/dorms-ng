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
  latitude: z.coerce
    .number<number>()
    .min(-90, "Latitude cannot be be less than -90 degrees")
    .max(90, "Latitude cannot be greater than 90 degrees"),
  longitude: z.coerce
    .number<number>()
    .min(-180, "Longitude cannot be be less than -90 degrees")
    .max(180, "Longitude cannot be greater than 90 degrees"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name is too long"),
});

export type CreateInstitutionData = z.infer<typeof createInstitutionSchema>;

export const createHostelListingSchema = z.object({
  name: z.string().min(3, "Hostel name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(4000, "Description must not exceed 4000 characters"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name is too long"),
  estimatedPriceRange: z.coerce.number<number>(),
  address: z.string().min(5, "Address must not be less than 5 characters"),
  latitude: z.coerce
    .number<number>()
    .min(-90, "Latitude cannot be be less than -90 degrees")
    .max(90, "Latitude cannot be greater than 90 degrees"),
  longitude: z.coerce
    .number<number>()
    .min(-180, "Longitude cannot be be less than -90 degrees")
    .max(180, "Longitude cannot be greater than 90 degrees"),
  distanceKm: z.coerce.number<number>().min(0, "Required"),
  etaMins: z.coerce.number<number>().min(0, "Required"),
  googlePlaceId: z.string(),
  isVerified: z.boolean("Field must be a valid boolean i.e True or False"),
});

export type CreateHostelListingData = z.infer<typeof createHostelListingSchema>;

export const createNeighborhoodSchema = z.object({
  name: z.string().min(3, "Neigborhood name must not be less than 2 characters"),
  institution: z.string(),
  institutionId: z.uuid(),
});

export type CreateNeighborhoodData = z.infer<typeof createNeighborhoodSchema>;
