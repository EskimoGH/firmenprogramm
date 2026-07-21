export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "-"
  }

  return `${new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} €`
}


export function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "-"
  }

  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}