export default function useMoneyFormat(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });
  const formattedPrice = formatter.format(amount);
  return formattedPrice;
}
