function ProgressBar({ currentStep, totalSteps, stepNames }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        {stepNames.map((name, index) => (
          <span
            key={name}
            className={index <= currentStep ? "font-bold text-primary" : "text-gray-500"}
          >
            {name}
          </span>
        ))}
      </div>

      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm mt-2">
        {Math.round(progress)}% Complete
      </p>
    </div>
  );
}

export default ProgressBar;