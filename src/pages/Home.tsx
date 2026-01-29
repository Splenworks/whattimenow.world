import { useLocalStorage } from "usehooks-ts"
import { WorldTimeApp } from "../components/WorldTimeApp"
import { defaultCityIds } from "../lib/city"

const STORAGE_KEY = "wtnw-cities"

export function HomePage() {
  const [storedCityIds, setStoredCityIds] = useLocalStorage<string[]>(STORAGE_KEY, defaultCityIds)

  const handleAddCity = (cityId: string) => {
    setStoredCityIds((prev) => (prev.includes(cityId) ? prev : [...prev, cityId]))
  }

  const handleRemoveCity = (cityId: string) => {
    setStoredCityIds((prev) => prev.filter((id) => id !== cityId))
  }

  return (
    <>
      <h1 className="sr-only">World clock and time zone comparison tool</h1>
      <WorldTimeApp
        cityIds={storedCityIds}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
      />
    </>
  )
}
