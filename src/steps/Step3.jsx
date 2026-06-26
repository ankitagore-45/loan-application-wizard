import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import CheckBox from "../components/common/CheckBox";
import useVerification from "../hooks/useVerification";

function Step3() {
  const { watch, setValue } = useFormContext();

  const pan = watch("pan");
  const aadhaar = watch("aadhaar");
  const consent = watch("aadhaarConsent");

  const panVerification = useVerification();
  const aadhaarVerification = useVerification();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 3: KYC Verification</h2>

      <div className="border p-4 rounded">
        <Input
          label="PAN Number"
          value={pan}
          onChange={(e) => setValue("pan", e.target.value.toUpperCase())}
          onBlur={() => panVerification.verify(pan, "PAN")}
          placeholder="ABCDE1234F"
        />

        {panVerification.isVerifying && <p className="text-blue-600">Verifying PAN...</p>}
        {panVerification.isVerified && <p className="text-green-600 font-semibold">✓ PAN Verified</p>}
        {panVerification.error && <p className="text-red-600">{panVerification.error}</p>}
      </div>

      <div className="border p-4 rounded">
        <Input
          label="Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setValue("aadhaar", e.target.value)}
          onBlur={() => aadhaarVerification.verify(aadhaar, "AADHAAR")}
          placeholder="123412341234"
        />

        {aadhaarVerification.isVerifying && <p className="text-blue-600">Verifying Aadhaar...</p>}
        {aadhaarVerification.isVerified && <p className="text-green-600 font-semibold">✓ Aadhaar Verified</p>}
        {aadhaarVerification.error && <p className="text-red-600">{aadhaarVerification.error}</p>}
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <CheckBox
          label="I consent to Aadhaar verification and processing of my KYC information for loan application purposes."
          checked={consent}
          onChange={(e) => setValue("aadhaarConsent", e.target.checked)}
        />
      </div>
    </div>
  );
}

export default Step3;