import { useState } from "react";

function CurrencyInput({ label, id, error, onChange, ...props }) {
  const [value, setValue] = useState("");

  const formatINR = (input) => {
    const number = input.replace(/\D/g, "");
    if (!number) return "";

    return new Intl.NumberFormat("en-IN").format(Number(number));
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatINR(rawValue);

    setValue(formattedValue);

    if (onChange) {
      onChange({
        target: {
          name: e.target.name,
          value: rawValue,
        },
      });
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        className={`w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={!!error}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default CurrencyInput;