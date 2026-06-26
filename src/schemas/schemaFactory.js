import { wizardSchema } from "./wizardSchema";

const stepFields = {
  0: ["loanType", "amount", "tenure", "purpose"],
  1: [
    "fullName",
    "dob",
    "gender",
    "maritalStatus",
    "fatherName",
    "motherName",
    "email",
    "mobile",
  ],
  2: ["pan", "aadhaar", "aadhaarConsent"],
  3: [
    "houseNo",
    "street",
    "pinCode",
    "city",
    "state",
    "postOffice",
    "residenceType",
  ],
  4: ["employmentType"],
};

export const getStepFields = (stepIndex) => {
  return stepFields[stepIndex] || [];
};

export const getWizardSchema = () => {
  return wizardSchema;
};