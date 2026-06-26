import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  calculateEMI,
  calculateBorrowingCost,
  calculateProcessingFee,
  formatIndianCurrency,
} from "../utils/emiCalculator";

function Step8() {
  const { watch } = useFormContext();
  const data = watch();

  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const emi = calculateEMI(
    Number(data.amount),
    data.loanType,
    Number(data.tenure)
  );

  const processingFee = calculateProcessingFee(Number(data.amount));

  const borrowingCost = calculateBorrowingCost(
    emi,
    Number(data.amount),
    Number(data.tenure)
  );

  const totalPayable = Number(data.amount) + borrowingCost + processingFee;

  let monthlyIncome = 0;

  if (data.employmentType === "salaried") {
    monthlyIncome = Number(data.monthlyIncome);
  } else if (data.employmentType === "selfEmployed") {
    monthlyIncome = Number(data.annualIncome) / 12;
  } else if (data.employmentType === "businessOwner") {
    monthlyIncome = Number(data.annualTurnover) / 12;
  }

  const emiRatio = monthlyIncome
    ? Math.round((emi / monthlyIncome) * 100)
    : 0;

  const isAffordable = emiRatio <= 50;

  const handleSubmitApplication = () => {
    const ref = `LS-${Date.now().toString().slice(-8)}`;
    setReferenceNumber(ref);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 8: Review & Pre-Approval</h2>

      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Loan Details</h3>
        <p><strong>Loan Type:</strong> {data.loanType}</p>
        <p><strong>Loan Amount:</strong> ₹{data.amount}</p>
        <p><strong>Tenure:</strong> {data.tenure} Years</p>
        <p><strong>Purpose:</strong> {data.purpose}</p>
      </div>

      <div className="border rounded p-4 bg-blue-50">
        <h3 className="font-semibold text-lg mb-2">Pre-Approval Summary</h3>
        <p><strong>Monthly EMI:</strong> ₹{formatIndianCurrency(emi)}</p>
        <p><strong>Processing Fee:</strong> ₹{formatIndianCurrency(processingFee)}</p>
        <p><strong>Total Cost of Borrowing:</strong> ₹{formatIndianCurrency(borrowingCost)}</p>
        <p><strong>Total Payable:</strong> ₹{formatIndianCurrency(totalPayable)}</p>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h3 className="font-semibold text-lg mb-2">EMI Affordability</h3>
        <p><strong>Monthly Income:</strong> ₹{formatIndianCurrency(monthlyIncome)}</p>
        <p><strong>EMI Ratio:</strong> {emiRatio}%</p>

        {isAffordable ? (
          <p className="text-green-600 font-semibold">
            🟢 Eligible: EMI is within 50% of monthly income.
          </p>
        ) : (
          <p className="text-amber-600 font-semibold">
            ⚠ Warning: EMI exceeds 50% of monthly income.
          </p>
        )}
      </div>

      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Mobile:</strong> {data.mobile}</p>
      </div>

      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">KYC</h3>
        <p><strong>PAN:</strong> {data.pan}</p>
        <p><strong>Aadhaar:</strong> {data.aadhaar}</p>
      </div>

      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Address</h3>
        <p>{data.houseNo}</p>
        <p>{data.street}</p>
        <p>{data.city}, {data.state}</p>
        <p>{data.pinCode}</p>
      </div>

      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Employment</h3>
        <p><strong>Employment Type:</strong> {data.employmentType}</p>
      </div>

      <div className="border rounded p-4 bg-gray-50 space-y-2">
        <label className="flex gap-2">
          <input type="checkbox" />
          <span>I confirm that all information provided is correct.</span>
        </label>

        <label className="flex gap-2">
          <input type="checkbox" />
          <span>I agree to the loan processing terms and conditions.</span>
        </label>

        <button
          type="button"
          onClick={handleSubmitApplication}
          className="px-4 py-2 bg-green-700 text-white rounded"
        >
          Submit Application
        </button>
      </div>

      {submitted && (
        <div className="border rounded p-4 bg-green-50 text-green-700">
          <h3 className="font-bold text-lg">
            Application Submitted Successfully 🎉
          </h3>
          <p>
            Reference Number: <strong>{referenceNumber}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Step8;