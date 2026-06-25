import { z } from "zod";

const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const salariedSchema = z.object({
  employmentType: z.literal("salaried"),
  companyName: z.string().min(2, "Company name is required"),
  designation: z.string().min(2, "Designation is required"),
  monthlyIncome: z.coerce
    .number()
    .min(10000, "Monthly income must be at least ₹10,000"),
  workExperience: z.coerce
    .number()
    .min(0, "Experience cannot be negative"),
});

const selfEmployedSchema = z.object({
  employmentType: z.literal("selfEmployed"),
  profession: z.string().min(2, "Profession is required"),
  annualIncome: z.coerce
    .number()
    .min(120000, "Annual income must be at least ₹1,20,000"),
  yearsInProfession: z.coerce
    .number()
    .min(1, "Years in profession is required"),
});

const businessOwnerSchema = z.object({
  employmentType: z.literal("businessOwner"),
  businessName: z.string().min(2, "Business name is required"),
  gstNumber: z
    .string()
    .regex(gstRegex, "Enter valid GST number"),
  annualTurnover: z.coerce
    .number()
    .min(100000, "Annual turnover must be at least ₹1,00,000"),
  yearsInBusiness: z.coerce
    .number()
    .min(1, "Years in business is required"),
});

export const step5Schema = z.discriminatedUnion("employmentType", [
  salariedSchema,
  selfEmployedSchema,
  businessOwnerSchema,
]);

export { gstRegex };