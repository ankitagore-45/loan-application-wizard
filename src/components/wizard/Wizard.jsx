import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { wizardSchema } from "../../schemas/wizardSchema";
import { defaultValues } from "../../form/defaultValues";


import Step1 from "../../steps/Step1";
import Step2 from "../../steps/Step2";
import Step3 from "../../steps/Step3";
import Step4 from "../../steps/Step4";
import Step5 from "../../steps/Step5";

import ProgressBar from "./ProgressBar";

const stepRegistry = [
  { id: 1, name: "Loan", component: Step1 ,fields: ["loanType", "amount", "tenure", "purpose"],},
  { id: 2, name: "Personal", component: Step2,fields: [
      "fullName",
      "dob",
      "gender",
      "maritalStatus",
      "fatherName",
      "motherName",
      "email",
      "mobile",
      "alternateMobile",
    ], },
  { id: 3, name: "KYC", component: Step3 ,fields: ["pan", "aadhaar", "aadhaarConsent"],},
  { id: 4, name: "Address", component: Step4 ,  fields: [
      "houseNo",
      "street",
      "pinCode",
      "city",
      "state",
      "postOffice",
      "residenceType",
      "rentAmount",
      "yearsAtAddress",
      "previousAddress",
      "sameAsPermanent",
    ],},
  { id: 5, name: "Employment", component: Step5, fields: ["employmentType"], },
];



function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(wizardSchema),
    defaultValues,
    mode: "onBlur",
  });

  const CurrentStepComponent = stepRegistry[currentStep].component;

  const nextStep = async () => {
    const isValid = await methods.trigger(stepRegistry[currentStep].fields);

    if (isValid && currentStep < stepRegistry.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = Math.round(
    ((currentStep + 1) / stepRegistry.length) * 100
  );

  return (
    <FormProvider {...methods}>
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Loan Application Wizard
        </h1>

        <ProgressBar
          steps={stepRegistry}
          currentStep={currentStep}
          progress={progress}
        />

        <CurrentStepComponent />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep === stepRegistry.length - 1}
            className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </FormProvider>
  );
}

export default Wizard;