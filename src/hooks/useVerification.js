import { useState } from "react";
import { validatePAN, validateAadhaar } from "../utils/validators";

function useVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const verify = (value, type) => {
    setIsVerified(false);
    setError("");

    const result =
      type === "PAN" ? validatePAN(value) : validateAadhaar(value);

    if (!result.isValid) {
      setError(result.message);
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  return {
    isVerifying,
    isVerified,
    error,
    verify,
  };
}

export default useVerification;