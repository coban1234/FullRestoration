export function formatCurrency(value: number): string {
  return "$" + Math.abs(value).toLocaleString("en-CA");
}

export function percentOf(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}

export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}
