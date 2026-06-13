function StepNavigation({
  onPrevious,
  onNext,
  onSaveDraft,
  isFirstStep,
  isLastStep,
}) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <button
        onClick={onSaveDraft}
        className="px-4 py-2 bg-amber-500 text-white rounded"
      >
        Save Draft
      </button>

      <button
        onClick={onNext}
        disabled={isLastStep}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default StepNavigation;