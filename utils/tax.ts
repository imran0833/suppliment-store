export function calculateTax(total: number, country: string) {
  let taxRate = 0;

  switch (country) {
    case "IN":
      taxRate = 0.18; // 18% GST
      break;
    case "US":
      taxRate = 0.07; // 7%
      break;
    case "AE":
      taxRate = 0.05; // 5%
      break;
    default:
      taxRate = 0.10;
  }

  const taxAmount = total * taxRate;
  const finalAmount = total + taxAmount;

  return {
    taxRate,
    taxAmount,
    finalAmount,
  };
}