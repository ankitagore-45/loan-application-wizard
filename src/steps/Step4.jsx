import { useEffect, useState } from "react";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import CheckBox from "../components/common/CheckBox";
import usePinCodeLookup from "../hooks/usePinCodeLookup";

function Step4() {
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    postOffice: "",
    residenceType: "",
    rentAmount: "",
    yearsAtAddress: "",
    previousAddress: "",
    sameAsPermanent: false,
  });

  const pinResult = usePinCodeLookup(pinCode);

  useEffect(() => {
    if (pinResult.city && pinResult.state) {
      setAddress((prev) => ({
        ...prev,
        city: pinResult.city,
        state: pinResult.state,
        postOffice: pinResult.postOffice,
      }));
    }
  }, [pinResult.city, pinResult.state, pinResult.postOffice]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 4: Address Details</h2>

      <Input
        label="House / Flat No."
        value={address.houseNo}
        onChange={(e) => handleChange("houseNo", e.target.value)}
      />

      <Input
        label="Street / Area"
        value={address.street}
        onChange={(e) => handleChange("street", e.target.value)}
      />

      <Input
        label="PIN Code"
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
        maxLength="6"
      />

      {pinResult.isLoading && <p className="text-blue-600">Looking up PIN...</p>}
      {pinResult.error && <p className="text-red-600">{pinResult.error}</p>}

      <Input
        label="City"
        value={address.city}
        onChange={(e) => handleChange("city", e.target.value)}
      />

      <Input
        label="State"
        value={address.state}
        onChange={(e) => handleChange("state", e.target.value)}
      />
      {pinResult.state &&
        address.state &&
        pinResult.state.toLowerCase() !== address.state.toLowerCase() && (
          <p className="text-amber-600 text-sm">
            ⚠ State does not match the entered PIN code.
          </p>
      )}

      <Input
        label="Post Office"
        value={address.postOffice}
        onChange={(e) => handleChange("postOffice", e.target.value)}
      />

      <Select
        label="Residence Type"
        value={address.residenceType}
        onChange={(e) => handleChange("residenceType", e.target.value)}
        options={[
          { value: "owned", label: "Owned" },
          { value: "rented", label: "Rented" },
          { value: "family", label: "Family Owned" },
        ]}
      />

      {address.residenceType === "rented" && (
        <Input
          label="Monthly Rent Amount"
          type="number"
          value={address.rentAmount}
          onChange={(e) => handleChange("rentAmount", e.target.value)}
        />
      )}

      <Input
        label="Years at Current Address"
        type="number"
        value={address.yearsAtAddress}
        onChange={(e) => handleChange("yearsAtAddress", e.target.value)}
      />

      {Number(address.yearsAtAddress) < 1 && address.yearsAtAddress !== "" && (
        <Input
          label="Previous Address"
          value={address.previousAddress}
          onChange={(e) => handleChange("previousAddress", e.target.value)}
        />
      )}

      <CheckBox
        label="Same as permanent address"
        checked={address.sameAsPermanent}
        onChange={(e) => handleChange("sameAsPermanent", e.target.checked)}
      />
    </div>
  );
}

export default Step4;