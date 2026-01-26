import { useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"
import { TimeReel } from "./components/TimeReel"
import { allCities, cityMapping, defaultCityIds } from "./lib/city"
import type { City } from "./types/city"

const STORAGE_KEY = "wtnw-cities"
const STEP_MINUTES = 15
const TOTAL_HOURS = 48
const ROW_HEIGHT_PX = 44

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
  const storedCities = storedCityIds.map((id) => cityMapping.get(id)).filter(Boolean) as City[]
  const availableCities = allCities.filter((city) => !storedCityIds.includes(city.id))

  const handleAddCity = (cityId: string) => {
    setStoredCityIds((prev) => (prev.includes(cityId) ? prev : [...prev, cityId]))
  }

  const handleRemoveCity = (cityId: string) => {
    setStoredCityIds((prev) => prev.filter((id) => id !== cityId))
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <TimeReel
        cities={storedCities ?? defaultCityIds.map((id) => cityMapping.get(id)) as City[]}
        availableCities={availableCities}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
        stepMinutes={STEP_MINUTES}
        totalHours={TOTAL_HOURS}
        rowHeightPx={ROW_HEIGHT_PX}
      />
    </div>
  )
}
