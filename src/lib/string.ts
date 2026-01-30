/**
 * Formats a list like: "A", "A and B", "A, B, and C"
 */
export function formatList(items: string[]): string {
  if (items.length === 0) return ""
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`
}

export function capitalize(s: string): string {
  if (s.length === 0) return s
  return s[0].toUpperCase() + s.slice(1)
}

export function capitalizeWords(s: string): string {
  return s
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ")
}

export const normalize = (value: string) => value.trim().toLowerCase()
