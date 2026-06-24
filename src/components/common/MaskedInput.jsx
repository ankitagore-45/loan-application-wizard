import { useState } from "react";

function MaskedInput({
  label,
  id,
  error,
  maskCharacter = "*",
  onChange,
  ...props
}) {
  const [actualValue, setActualValue] = useState("");

  const getMaskedValue = (value) => {
    if (value.length <= 4) return value;

    const masked = maskCharacter.repeat(value.length - 4);
    return masked + value.slice(-4);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setActualValue(value);

    if (onChange) {
      onChange({
        target: {
          name: e.target.name,
          value,
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
        value={getMaskedValue(actualValue)}
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

export default MaskedInput;