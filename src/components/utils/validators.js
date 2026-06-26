export const validatePAN = (pan) => {
  const value = pan.toUpperCase();

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  if (!panRegex.test(value)) {
    return {
      isValid: false,
      message: "PAN must be in format AAAAA9999A",
    };
  }

  const validEntityTypes = ["P", "C", "H", "F", "A", "T", "B", "L", "J", "G"];

  if (!validEntityTypes.includes(value[3])) {
    return {
      isValid: false,
      message: "PAN 4th character must indicate valid entity type",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

const multiplicationTable = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const permutationTable = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

export const validateAadhaar = (aadhaar) => {
  const value = aadhaar.replace(/\D/g, "");

  if (!/^\d{12}$/.test(value)) {
    return {
      isValid: false,
      message: "Aadhaar must contain exactly 12 digits",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};  