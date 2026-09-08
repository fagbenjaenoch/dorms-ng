export default function useNumberFormat(
  notation: "compact" | "standard" = "compact",
): Intl.NumberFormat {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    notation: notation,
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  return formatter;
}
