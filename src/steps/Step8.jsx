import { useFormContext } from "react-hook-form";
import {calculateEMI,calculateBorrowingCost,calculateProcessingFee,formatIndianCurrency,
} from "../utils/emiCalculator";

function Step8() {
  const { watch } = useFormContext();

  const data = watch();

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
const monthlyIncome =
  data.employmentType === "salaried"
    ? Number(data.monthlyIncome)
    : Number(data.annualIncome) / 12 || Number(data.annualTurnover) / 12;

const emiRatio = monthlyIncome
  ? Math.round((emi / monthlyIncome) * 100)
  : 0;

const isAffordable = emiRatio <= 50;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Step 8: Review & Pre-Approval
      </h2>

      {/* Loan Details */}
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
        </div>
       
      {/* Personal Details */}
      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Personal Details</h3>

        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Mobile:</strong> {data.mobile}</p>
      </div>

      {/* KYC */}
      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">KYC</h3>

        <p><strong>PAN:</strong> {data.pan}</p>
        <p><strong>Aadhaar:</strong> {data.aadhaar}</p>
      </div>

      {/* Address */}
      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Address</h3>

        <p>{data.houseNo}</p>
        <p>{data.street}</p>
        <p>{data.city}, {data.state}</p>
        <p>{data.pinCode}</p>
      </div>

      {/* Employment */}
      <div className="border rounded p-4">
        <h3 className="font-semibold text-lg mb-2">Employment</h3>

        <p><strong>Employment Type:</strong> {data.employmentType}</p>
      </div>
    </div>
  );
}

export default Step8;