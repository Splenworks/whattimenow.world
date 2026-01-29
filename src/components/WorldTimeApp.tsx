import { useEffect, useRef, useState } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { TimeReel } from "./TimeReel"
import { useScrollRestoration } from "../hooks/useScrollRestoration"
import { allCities, cityMapping, defaultCityIds } from "../lib/city"
import type { City } from "../types/city"

const STEP_MINUTES = 15
const TOTAL_HOURS = 48
const ROW_HEIGHT_PX = 44
const CELL_WIDTH_PX = 170

type WorldTimeAppProps = {
  cityIds: string[]
  lockCities?: boolean
  onAddCity?: (cityId: string) => void
  onRemoveCity?: (cityId: string) => void
}

const buildTitle = (labels: string[]) => {
  if (labels.length === 0) return "WhatTimeNow"
  if (labels.length === 1) return `${labels[0]} Time | WhatTimeNow`
  if (labels.length === 2) return `${labels[0]} ↔ ${labels[1]} Time Comparison | WhatTimeNow`
  return `${labels.slice(0, 3).join(", ")} Time Comparison | WhatTimeNow`
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
  const effectiveCityIds = selectedCities.length ? selectedCities.map((city) => city.id) : defaultCityIds
  const availableCities = allCities.filter((city) => !effectiveCityIds.includes(city.id))
  const goToNowRef = useRef<() => void>(() => {})
  const [isNowRowVisible, setIsNowRowVisible] = useState(true) // set initially true to avoid flicker

  const handleAddCity = (cityId: string) => {
    if (lockCities || !onAddCity) return
    onAddCity(cityId)
  }

  const handleRemoveCity = (cityId: string) => {
    if (lockCities || !onRemoveCity) return
    onRemoveCity(cityId)
  }

  useEffect(() => {
    const labels = cities.map((city) => city.label)
    document.title = buildTitle(labels)
  }, [cities])

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
        isReadOnly={lockCities}
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
