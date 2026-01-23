import { cities } from "../data/cities"
import type { City } from "../types/city"

const now = new Date()
const getUtcOffset = (timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(now)
  const tzPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT"

  if (tzPart === "GMT" || tzPart === "UTC") return "+00:00"
  const match = tzPart.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/)
  if (!match) return "+00:00"

  const sign = match[1].startsWith("-") ? "-" : "+"
  const hours = Math.abs(parseInt(match[1], 10))
  const minutes = match[2] ? parseInt(match[2], 10) : 0
  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
export const local = {
  id: "local",
  label: "Local Time",
  tz: localTimezone,
  utcOffset: getUtcOffset(localTimezone),
}

const utc = {
  id: "utc",
  label: "UTC",
  tz: "UTC",
  utcOffset: "+00:00",
}

export const allCities: City[] = [local, utc, ...cities]

export const cityMapping = new Map(allCities.map((city) => [city.id, city]))

export const defaultCityIds = ["local", "new-york", "mumbai", "seoul", "utc"]

export const defaultCities = allCities.filter((city) => defaultCityIds.includes(city.id))
