import { z } from "zod";

export const loanTypes = {
  home: {
    minAmount: 500000,
    maxAmount: 10000000,
    minTenure: 5,
    maxTenure: 30,
  },
  personal: {
    minAmount: 50000,
    maxAmount: 4000000,
    minTenure: 1,
    maxTenure: 5,
  },
  car: {
    minAmount: 100000,
    maxAmount: 5000000,
    minTenure: 1,
    maxTenure: 7,
  },
};

export const loanPurposes = [
  "Home Purchase",
  "Home Renovation",
  "Medical Emergency",
  "Education",
  "Business",
  "Vehicle Purchase",
  "Other",
];

export const step1Schema = z
  .object({
    loanType: z.string().min(1, "Please select a loan type"),
    amount: z.coerce.number(),
    tenure: z.coerce.number(),
    purpose: z.string().min(1, "Please select a purpose"),
  })
  .superRefine((data, ctx) => {
    const rules = loanTypes[data.loanType];

    if (!rules) return;

    if (
      data.amount < rules.minAmount ||
      data.amount > rules.maxAmount
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amount"],
        message: `Amount must be between ₹${rules.minAmount.toLocaleString(
          "en-IN"
        )} and ₹${rules.maxAmount.toLocaleString("en-IN")}`,
      });
    }

    if (
      data.tenure < rules.minTenure ||
      data.tenure > rules.maxTenure
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tenure"],
        message: `Tenure must be between ${rules.minTenure} and ${rules.maxTenure} years`,
      });
    }
  });