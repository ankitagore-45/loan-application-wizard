  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";

  import Input from "../components/common/Input";
  import Select from "../components/common/Select";
  import RadioGroup from "../components/common/RadioGroup";

  import { step1Schema, loanPurposes } from "../schemas/step1Schema";

  function Step1() {
    const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
      resolver: zodResolver(step1Schema),
      defaultValues: {
        loanType: "",
        amount: "",
        tenure: "",
        purpose: "",
      },
    });

    const selectedLoanType = watch("loanType");

    const onSubmit = (data) => {
      console.log(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <h2 className="text-2xl font-bold">
          Step 1: Loan Details
        </h2>

        <RadioGroup
    label="Loan Type"
    name="loanType"
    options={[
      { value: "home", label: "Home Loan" },
      { value: "personal", label: "Personal Loan" },
      { value: "car", label: "Car Loan" },
    ]}
    selectedValue={watch("loanType")}
    onChange={(e) => setValue("loanType", e.target.value)}
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

        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white rounded"
        >
          Validate Step 1
        </button>

      </form>
    );
  }

  export default Step1;