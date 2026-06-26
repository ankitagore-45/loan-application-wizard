function ProgressBar({ steps = [], currentStep = 0, progress = 0 }) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-medium">Progress: {progress}%</p>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-blue-700 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => (
          <span
            key={step.id}
            className={`px-3 py-1 rounded text-sm ${
              index === currentStep
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;