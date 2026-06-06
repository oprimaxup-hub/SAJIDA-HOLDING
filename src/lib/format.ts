const nf = new Intl.NumberFormat("fr-FR");

export function formatFCFA(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "—";
  return `${nf.format(Math.round(value))} FCFA`;
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "—";
  return nf.format(value);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatMonth(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
}
