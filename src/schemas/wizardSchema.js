import { z } from "zod";

export const wizardSchema = z.object({
  // Step 1
  loanType: z.string().min(1, "Please select a loan type"),
  amount: z.coerce.number().min(1, "Loan amount is required"),
  tenure: z.coerce.number().min(1, "Tenure is required"),
  purpose: z.string().min(1, "Please select a purpose"),

  // Step 2
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select gender"),
  maritalStatus: z.string().min(1, "Please select marital status"),
  fatherName: z.string().min(2, "Father name is required"),
  motherName: z.string().min(2, "Mother name is required"),
  email: z.string().email("Enter valid email"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid mobile number"),
  alternateMobile: z.string().optional(),

  // Step 3
  pan: z.string().min(1, "PAN is required"),
  aadhaar: z.string().min(1, "Aadhaar is required"),
  aadhaarConsent: z.boolean(),

  // Step 4
  houseNo: z.string().min(1, "House number is required"),
  street: z.string().min(1, "Street is required"),
  pinCode: z.string().regex(/^\d{6}$/, "PIN must be 6 digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postOffice: z.string().min(1, "Post office is required"),
  residenceType: z.string().min(1, "Residence type is required"),
  rentAmount: z.string().optional(),
  yearsAtAddress: z.string().min(1, "Years at address is required"),
  previousAddress: z.string().optional(),
  sameAsPermanent: z.boolean(),

  // Step 5
  employmentType: z.string().min(1, "Employment type is required"),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  monthlyIncome: z.string().optional(),
  workExperience: z.string().optional(),
  profession: z.string().optional(),
  annualIncome: z.string().optional(),
  yearsInProfession: z.string().optional(),
  businessName: z.string().optional(),
  gstNumber: z.string().optional(),
  annualTurnover: z.string().optional(),
  yearsInBusiness: z.string().optional(),
});