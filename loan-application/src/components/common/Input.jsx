import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, helpText, id, className = "", ...props }, ref) => {
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
          id={id}
          ref={ref}
          className={`w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helpText ? `${id}-help` : undefined
          }
          {...props}
        />

        {helpText && !error && (
          <p id={`${id}-help`} className="mt-1 text-xs text-gray-500">
            {helpText}
          </p>
        )}

        {error && (
          <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;