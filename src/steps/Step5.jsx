  import { useFormContext } from "react-hook-form";

  import Input from "../components/common/Input";
  import Select from "../components/common/Select";
  

  function Step5() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

    const employmentType = watch("employmentType");

  

    return (
      <div className="space-y-4">
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

    
      </div>
    );
  }

  export default Step5;