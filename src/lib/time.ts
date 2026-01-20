export type City = {
  id: string
  label: string
  timeZone: string // IANA TZ name
}

export const DEFAULT_CITIES: City[] = [
  { id: "la", label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { id: "lon", label: "London", timeZone: "Europe/London" },
  { id: "sel", label: "Seoul", timeZone: "Asia/Seoul" },
]

export type TimeParts = {
  hh: string
  mm: string
  ss: string
}

export function getTimeParts(date: Date, timeZone: string): TimeParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00"

  return { hh: get("hour"), mm: get("minute"), ss: get("second") }
}
