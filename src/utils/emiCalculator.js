const interestRates = {
  personal: 10.5,
  home: 8.5,
  business: 14,
};

export const calculateEMI = (
  principal,
  loanType,
  tenureYears
) => {
  if (!principal || !tenureYears || !loanType) return 0;

  const annualRate = interestRates[loanType];

  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;

  const emi =
    (principal * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  return Math.round(emi);
};

export const calculateBorrowingCost = (
  emi,
  principal,
  tenureYears
) => {
  const n = tenureYears * 12;

  return Math.round(emi * n - principal);
};

export const calculateProcessingFee = (principal) => {
  const fee = principal * 0.01;

  if (fee < 2000) return 2000;
  if (fee > 25000) return 25000;

  return Math.round(fee);
};

export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN").format(amount);
};