export default function useMoneyFormat(
  notation: "compact" | "standard" = "compact",
): Intl.NumberFormat {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: notation,
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  return formatter;
}
