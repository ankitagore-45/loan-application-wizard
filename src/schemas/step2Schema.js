import { z } from "zod";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
};

export const step2Schema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must not exceed 100 characters")
      .regex(/^[A-Za-z .]+$/, "Only letters, spaces and period are allowed"),

    dob: z.string().min(1, "Date of birth is required"),

    gender: z.string().min(1, "Please select gender"),

    maritalStatus: z.string().min(1, "Please select marital status"),

    fatherName: z
      .string()
      .min(2, "Father's name is required")
      .regex(/^[A-Za-z .]+$/, "Only letters, spaces and period are allowed"),

    motherName: z
      .string()
      .min(2, "Mother's name is required")
      .regex(/^[A-Za-z .]+$/, "Only letters, spaces and period are allowed"),

    email: z.string().email("Enter a valid email address"),

    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Mobile must be 10 digits and start with 6-9"),

    alternateMobile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const age = calculateAge(data.dob);

    if (age < 21 || age > 65) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dob"],
        message: "Age must be between 21 and 65 years",
      });
    }

    if (
      data.alternateMobile &&
      !/^[6-9]\d{9}$/.test(data.alternateMobile)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["alternateMobile"],
        message: "Alternate mobile must be valid",
      });
    }

    if (data.alternateMobile && data.alternateMobile === data.mobile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["alternateMobile"],
        message: "Alternate mobile must be different from primary mobile",
      });
    }
  });

export { calculateAge };