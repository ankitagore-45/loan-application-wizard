import { useState } from "react";
import Step1 from "../../steps/Step1";
import Step2 from "../../steps/Step2";
import Step3 from "../../steps/Step3";
import Step4 from "../../steps/Step4";
import Step5 from "../../steps/Step5";
import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";


const stepRegistry = [
  {
    id: 1,
    name: "Personal",
    component: Step1,
  },
  {
    id: 2,
    name: "Employment",
    component: Step2,
  },
  {
    id: 3,
    name: "Loan",
    component: Step3,
  },
   {
    id: 4,
    name: "Address",
    component: Step4,
  },
   {
    id: 5,
    name: "Employment",
    component: Step5,
  },
];

function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const CurrentStepComponent = stepRegistry[currentStep].component;

  const nextStep = () => {
    if (currentStep < stepRegistry.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / stepRegistry.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Loan Application Wizard
      </h1>

      <p className="mb-4">Progress: {progress}%</p>

      <CurrentStepComponent />

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === stepRegistry.length - 1}
          className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Wizard;