function RadioGroup({
  label,
  name,
  options = [],
  selectedValue,
  onChange,
  direction = "vertical",
  error,
}) {
  return (
    <div className="mb-4">
      {label && (
        <p className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </p>
      )}

      <div
        className={`flex ${
          direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-2"
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              className="h-4 w-4"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default RadioGroup;