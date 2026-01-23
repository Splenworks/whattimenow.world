import { useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"
import { TimeReel } from "./components/TimeReel"
import { allCities, cityMapping, defaultCityIds, localCity } from "./lib/cities"
import type { City } from "./types/city"

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
  const selectedCities = storedCityIds.map((id) => cityMapping.get(id)).filter(Boolean) as City[]
  const cities = localCity ? [localCity, ...selectedCities] : selectedCities
  const availableCities = allCities.filter((city) => !storedCityIds.includes(city.id))

  const handleAddCity = (cityId: string) => {
    setStoredCityIds((prev) => (prev.includes(cityId) ? prev : [...prev, cityId]))
  }

  const handleRemoveCity = (cityId: string) => {
    setStoredCityIds((prev) => prev.filter((id) => id !== cityId))
  }

  return (
    <div className="min-h-screen">
      <TimeReel
        cities={cities}
        availableCities={availableCities}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
        stepMinutes={15}
        totalHours={48}
      />
    </div>
  )
}
