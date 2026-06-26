import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import RadioGroup from "../components/common/RadioGroup";

import { step2Schema } from "../schemas/step2Schema";

function Step2() {
const {
  register,
  watch,
  setValue,
  trigger,
  formState: { errors },
} = useFormContext();

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-bold">
        Step 2: Personal Information
      </h2>

      <Input
        label="Full Name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <Input
        label="Date of Birth"
        type="date"
        error={errors.dob?.message}
        {...register("dob")}
      />

      <RadioGroup
        label="Gender"
        name="gender"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
        selectedValue={watch("gender")}
        onChange={(e) => setValue("gender", e.target.value)}
        error={errors.gender?.message}
      />

      <Select
        label="Marital Status"
        options={[
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
        ]}
        error={errors.maritalStatus?.message}
        {...register("maritalStatus")}
      />

      <Input
        label="Father Name"
        error={errors.fatherName?.message}
        {...register("fatherName")}
      />

      <Input
        label="Mother Name"
        error={errors.motherName?.message}
        {...register("motherName")}
      />

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Mobile Number"
        error={errors.mobile?.message}
        {...register("mobile")}
      />

      <Input
        label="Alternate Mobile Number"
        error={errors.alternateMobile?.message}
        {...register("alternateMobile")}
      />

      

    </div>
  );
}

export default Step2;