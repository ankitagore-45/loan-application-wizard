import { useEffect, useState } from "react";
import pinCodeData from "../utils/pinCodeData.json";

function usePinCodeLookup(pinCode) {
  const [result, setResult] = useState({
    city: "",
    state: "",
    postOffice: "",
    isLoading: false,
    error: "",
  });

  useEffect(() => {
    if (!pinCode || pinCode.length < 6) {
      setResult({
        city: "",
        state: "",
        postOffice: "",
        isLoading: false,
        error: "",
      });
      return;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      setResult({
        city: "",
        state: "",
        postOffice: "",
        isLoading: false,
        error: "PIN code must be 6 digits",
      });
      return;
    }

    setResult((prev) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));

    setTimeout(() => {
      const match = pinCodeData.find((item) => item.pin === pinCode);

      if (match) {
        setResult({
          city: match.city,
          state: match.state,
          postOffice: match.postOffice,
          isLoading: false,
          error: "",
        });
      } else {
        setResult({
          city: "",
          state: "",
          postOffice: "",
          isLoading: false,
          error: "PIN code not found",
        });
      }
    }, 800);
  }, [pinCode]);

  return result;
}

export default usePinCodeLookup;