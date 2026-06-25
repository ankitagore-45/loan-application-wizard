import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { step5Schema } from "../schemas/step5Schema";

function Step5() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      employmentType: "",
    },
  });

  const employmentType = watch("employmentType");

  const onSubmit = (data) => {
    console.log("Employment Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">Step 5: Employment & Income</h2>

      <Select
        label="Employment Type"
        error={errors.employmentType?.message}
        options={[
          { value: "salaried", label: "Salaried" },
          { value: "selfEmployed", label: "Self-Employed" },
          { value: "businessOwner", label: "Business Owner" },
        ]}
        {...register("employmentType")}
      />

      {employmentType === "salaried" && (
        <>
          <Input label="Company Name" error={errors.companyName?.message} {...register("companyName")} />
          <Input label="Designation" error={errors.designation?.message} {...register("designation")} />
          <Input label="Monthly Income" type="number" error={errors.monthlyIncome?.message} {...register("monthlyIncome")} />
          <Input label="Work Experience (Years)" type="number" error={errors.workExperience?.message} {...register("workExperience")} />
        </>
      )}

      {employmentType === "selfEmployed" && (
        <>
          <Input label="Profession" error={errors.profession?.message} {...register("profession")} />
          <Input label="Annual Income" type="number" error={errors.annualIncome?.message} {...register("annualIncome")} />
          <Input label="Years in Profession" type="number" error={errors.yearsInProfession?.message} {...register("yearsInProfession")} />
        </>
      )}

      {employmentType === "businessOwner" && (
        <>
          <Input label="Business Name" error={errors.businessName?.message} {...register("businessName")} />
          <Input label="GST Number" error={errors.gstNumber?.message} {...register("gstNumber")} />
          <Input label="Annual Turnover" type="number" error={errors.annualTurnover?.message} {...register("annualTurnover")} />
          <Input label="Years in Business" type="number" error={errors.yearsInBusiness?.message} {...register("yearsInBusiness")} />
        </>
      )}

      <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">
        Validate Step 5
      </button>
    </form>
  );
}

export default Step5;