import { useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"
import { TimeReel } from "./components/TimeReel"
import { cities as allCities, baseCities } from "./lib/cities"
import type { City } from "./types/city"

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

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
const localCity: City = {
  id: "local",
  label: "Local",
  tz,
  utcOffset: getUtcOffset(tz),
}
const cityById = new Map(allCities.map((city) => [city.id, city]))
const defaultCityIds = baseCities.filter((city) => city.tz !== tz).map((city) => city.id)
const STORAGE_KEY = "wtnw-cities"

export default function App() {
  useEffect(() => {
    if (!("scrollRestoration" in history)) return
    const previous = history.scrollRestoration
    history.scrollRestoration = "manual"
    return () => {
      history.scrollRestoration = previous
    }
  }, [])

  const [storedCityIds, setStoredCityIds] = useLocalStorage<string[]>(STORAGE_KEY, defaultCityIds)
  const selectedCities = storedCityIds.map((id) => cityById.get(id)).filter(Boolean) as City[]
  const cities = [localCity, ...selectedCities]
  const availableCities = allCities.filter((city) => !storedCityIds.includes(city.id))

  const handleAddCity = (cityId: string) => {
    setStoredCityIds((prev) => (prev.includes(cityId) ? prev : [...prev, cityId]))
  }

  const handleRemoveCity = (cityId: string) => {
    setStoredCityIds((prev) => prev.filter((id) => id !== cityId))
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-max">
        <TimeReel
          cities={cities}
          availableCities={availableCities}
          onAddCity={handleAddCity}
          onRemoveCity={handleRemoveCity}
          stepMinutes={15}
          totalHours={48}
        />
      </div>
    </div>
  )
}
