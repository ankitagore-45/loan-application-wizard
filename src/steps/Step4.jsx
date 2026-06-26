import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";
import CheckBox from "../components/common/CheckBox";
import usePinCodeLookup from "../hooks/usePinCodeLookup";

function Step4() {
  const { watch, setValue } = useFormContext();

  const pinCode = watch("pinCode");
  const houseNo = watch("houseNo");
  const street = watch("street");
  const city = watch("city");
  const state = watch("state");
  const postOffice = watch("postOffice");
  const residenceType = watch("residenceType");
  const rentAmount = watch("rentAmount");
  const yearsAtAddress = watch("yearsAtAddress");
  const previousAddress = watch("previousAddress");
  const sameAsPermanent = watch("sameAsPermanent");

  const pinResult = usePinCodeLookup(pinCode);

  useEffect(() => {
    if (pinResult.city && pinResult.state) {
      setValue("city", pinResult.city);
      setValue("state", pinResult.state);
      setValue("postOffice", pinResult.postOffice);
    }
  }, [pinResult.city, pinResult.state, pinResult.postOffice, setValue]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 4: Address Details</h2>

      <Input
        label="House / Flat No."
        value={houseNo}
        onChange={(e) => setValue("houseNo", e.target.value)}
      />

      <Input
        label="Street / Area"
        value={street}
        onChange={(e) => setValue("street", e.target.value)}
      />

      <Input
        label="PIN Code"
        value={pinCode}
        onChange={(e) => setValue("pinCode", e.target.value)}
        maxLength="6"
      />

      {pinResult.isLoading && (
        <p className="text-blue-600">Looking up PIN...</p>
      )}

      {pinResult.error && (
        <p className="text-red-600">{pinResult.error}</p>
      )}

      <Input
        label="City"
        value={city}
        onChange={(e) => setValue("city", e.target.value)}
      />

      <Input
        label="State"
        value={state}
        onChange={(e) => setValue("state", e.target.value)}
      />

      {pinResult.state &&
        state &&
        pinResult.state.toLowerCase() !== state.toLowerCase() && (
          <p className="text-amber-600 text-sm">
            ⚠ State does not match the entered PIN code.
          </p>
        )}

      <Input
        label="Post Office"
        value={postOffice}
        onChange={(e) => setValue("postOffice", e.target.value)}
      />

      <Select
        label="Residence Type"
        value={residenceType}
        onChange={(e) => setValue("residenceType", e.target.value)}
        options={[
          { value: "owned", label: "Owned" },
          { value: "rented", label: "Rented" },
          { value: "family", label: "Family Owned" },
        ]}
      />

      {residenceType === "rented" && (
        <Input
          label="Monthly Rent Amount"
          type="number"
          value={rentAmount}
          onChange={(e) => setValue("rentAmount", e.target.value)}
        />
      )}

      <Input
        label="Years at Current Address"
        type="number"
        value={yearsAtAddress}
        onChange={(e) => setValue("yearsAtAddress", e.target.value)}
      />

      {Number(yearsAtAddress) < 1 && yearsAtAddress !== "" && (
        <Input
          label="Previous Address"
          value={previousAddress}
          onChange={(e) => setValue("previousAddress", e.target.value)}
        />
      )}

      <CheckBox
        label="Same as permanent address"
        checked={sameAsPermanent}
        onChange={(e) => setValue("sameAsPermanent", e.target.checked)}
      />
    </div>
  );
}

export default Step4;