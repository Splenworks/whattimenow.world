import { useEffect, useRef, useState } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { TimeSteps } from "./TimeSteps"
import { useScrollRestoration } from "../hooks/useScrollRestoration"
import { allCities, cityMapping, defaultCityIds } from "../lib/city"
import type { City } from "../types/city"
import { formatList } from "../lib/string"

const STEP_MINUTES = 15
const TOTAL_HOURS = 48
const ROW_HEIGHT_PX = 44
const CELL_WIDTH_PX = 170
const MAX_CITIES = 5

type WorldTimeAppProps = {
  cityIds: string[]
  lockCities?: boolean
  onAddCity?: (cityId: string) => void
  onRemoveCity?: (cityId: string) => void
}

export function WorldTimeApp({
  cityIds,
  lockCities = false,
  onAddCity,
  onRemoveCity,
}: WorldTimeAppProps) {
  useScrollRestoration("manual")

  const selectedCities = cityIds.map((id) => cityMapping.get(id)).filter(Boolean) as City[]
  const cities = selectedCities.length
    ? selectedCities
    : (defaultCityIds.map((id) => cityMapping.get(id)) as City[])
  const effectiveCityIds = selectedCities.length
    ? selectedCities.map((city) => city.id)
    : defaultCityIds
  const availableCities = allCities.filter((city) => !effectiveCityIds.includes(city.id))
  const goToNowRef = useRef<() => void>(() => {})
  const [isNowRowVisible, setIsNowRowVisible] = useState(true) // set initially true to avoid flicker

  const handleAddCity = (cityId: string) => {
    if (lockCities || !onAddCity || cities.length >= MAX_CITIES) return
    onAddCity(cityId)
  }

  const handleRemoveCity = (cityId: string) => {
    if (lockCities || !onRemoveCity) return
    onRemoveCity(cityId)
  }

  useEffect(() => {
    if (!lockCities) {
      document.title = "What time now?"
      return
    }
    const labels = cities
      .filter((city) => city.id !== "utc" && city.id !== "local")
      .map((city) => city.label)
    document.title = `What time now in ${formatList(labels)}?`
  }, [cities, lockCities])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header
        cities={cities}
        availableCities={availableCities}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
        cellWidthPx={CELL_WIDTH_PX}
        maxCities={MAX_CITIES}
        onGoToNow={() => goToNowRef.current()}
        showNowButton={!isNowRowVisible}
        isReadOnly={lockCities}
      />
      <TimeSteps
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
