import { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            id={id}
            ref={ref}
            className={`h-4 w-4 ${className}`}
            aria-invalid={!!error}
            {...props}
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>

        {error && (
          <p
            id={`${id}-error`}
            className="mt-1 text-xs text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;