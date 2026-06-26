import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import RadioGroup from "../components/common/RadioGroup";

import { loanPurposes } from "../schemas/step1Schema";

function Step1() {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const selectedLoanType = watch("loanType");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 1: Loan Details</h2>

      <RadioGroup
        label="Loan Type"
        name="loanType"
        options={[
          { value: "home", label: "Home Loan" },
          { value: "personal", label: "Personal Loan" },
          { value: "car", label: "Car Loan" },
        ]}
        selectedValue={selectedLoanType}
        onChange={(e) => {
          setValue("loanType", e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
          trigger("loanType");
        }}
        error={errors.loanType?.message}
      />

      {selectedLoanType && (
        <>
          <Input
            label="Loan Amount"
            type="number"
            error={errors.amount?.message}
            {...register("amount")}
          />

          <Input
            label="Tenure (Years)"
            type="number"
            error={errors.tenure?.message}
            {...register("tenure")}
          />

          <Select
            label="Purpose"
            error={errors.purpose?.message}
            options={loanPurposes.map((purpose) => ({
              value: purpose,
              label: purpose,
            }))}
            {...register("purpose")}
          />
        </>
      )}
    </div>
  );
}

export default Step1;