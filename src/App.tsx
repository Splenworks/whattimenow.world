import { useRef, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Header } from "./components/Header"
import { TimeReel } from "./components/TimeReel"
import { useScrollRestoration } from "./hooks/useScrollRestoration"
import { allCities, cityMapping, defaultCityIds } from "./lib/city"
import type { City } from "./types/city"
import { Footer } from "./components/Footer"

const STORAGE_KEY = "wtnw-cities"
const STEP_MINUTES = 15
const TOTAL_HOURS = 48
const ROW_HEIGHT_PX = 44
const CELL_WIDTH_PX = 170

export default function App() {
  useScrollRestoration("manual")

  const [storedCityIds, setStoredCityIds] = useLocalStorage<string[]>(STORAGE_KEY, defaultCityIds)
  const storedCities = storedCityIds.map((id) => cityMapping.get(id)).filter(Boolean) as City[]
  const cities = storedCities ?? (defaultCityIds.map((id) => cityMapping.get(id)) as City[])
  const availableCities = allCities.filter((city) => !storedCityIds.includes(city.id))
  const goToNowRef = useRef<() => void>(() => {})
  const [isNowRowVisible, setIsNowRowVisible] = useState(true) // set initially true to avoid flicker

  const handleAddCity = (cityId: string) => {
    setStoredCityIds((prev) => (prev.includes(cityId) ? prev : [...prev, cityId]))
  }

  const handleRemoveCity = (cityId: string) => {
    setStoredCityIds((prev) => prev.filter((id) => id !== cityId))
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header
        cities={cities}
        availableCities={availableCities}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
        cellWidthPx={CELL_WIDTH_PX}
        onGoToNow={() => goToNowRef.current()}
        showNowButton={!isNowRowVisible}
      />
      <TimeReel
        cities={cities}
        cellWidthPx={CELL_WIDTH_PX}
        stepMinutes={STEP_MINUTES}
        totalHours={TOTAL_HOURS}
        rowHeightPx={ROW_HEIGHT_PX}
        onGoToNowReady={(handler) => {
          goToNowRef.current = handler
        }}
        onNowRowVisibilityChange={setIsNowRowVisible}
      />
      <Footer />
    </div>
  )
}
