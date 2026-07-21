export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "-"
  }

  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}