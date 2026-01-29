import { useEffect, useRef, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Header } from "../components/Header"
import { TimeReel } from "../components/TimeReel"
import { useScrollRestoration } from "../hooks/useScrollRestoration"
import { allCities, cityMapping, defaultCityIds } from "../lib/city"
import type { City } from "../types/city"
import { Footer } from "../components/Footer"

const STORAGE_KEY = "wtnw-cities"
const STEP_MINUTES = 15
const TOTAL_HOURS = 48
const ROW_HEIGHT_PX = 44
const CELL_WIDTH_PX = 170

type HomePageProps = {
  routeCityIds?: string[]
  lockCities?: boolean
}

const buildTitle = (labels: string[]) => {
  if (labels.length === 0) return "WhatTimeNow"
  if (labels.length === 1) return `${labels[0]} Time | WhatTimeNow`
  if (labels.length === 2) return `${labels[0]} ↔ ${labels[1]} Time Comparison | WhatTimeNow`
  return `${labels.slice(0, 3).join(", ")} Time Comparison | WhatTimeNow`
}

const buildDescription = (labels: string[]) => {
  if (labels.length === 0) return "Compare time zones around the world with WhatTimeNow."
  if (labels.length === 1) return `Check the current time in ${labels[0]} with WhatTimeNow.`
  if (labels.length === 2) return `Compare times in ${labels[0]} and ${labels[1]} with WhatTimeNow.`
  return `Compare times in ${labels.slice(0, 3).join(", ")} with WhatTimeNow.`
}

const updateMetaDescription = (description: string) => {
  const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (existing) {
    existing.content = description
    return
  }

  const meta = document.createElement("meta")
  meta.name = "description"
  meta.content = description
  document.head.appendChild(meta)
}

export function HomePage({ routeCityIds, lockCities = false }: HomePageProps) {
  useScrollRestoration("manual")

  const [storedCityIds, setStoredCityIds] = useLocalStorage<string[]>(STORAGE_KEY, defaultCityIds)
  const selectedCityIds = routeCityIds ?? storedCityIds
  const selectedCities = selectedCityIds.map((id) => cityMapping.get(id)).filter(Boolean) as City[]
  const cities = selectedCities.length ? selectedCities : defaultCityIds.map((id) => cityMapping.get(id)) as City[]
  const availableCities = allCities.filter((city) => !selectedCityIds.includes(city.id))
  const goToNowRef = useRef<() => void>(() => {})
  const [isNowRowVisible, setIsNowRowVisible] = useState(true) // set initially true to avoid flicker

  const handleAddCity = (cityId: string) => {
    if (lockCities) return
    setStoredCityIds((prev) => (prev.includes(cityId) ? prev : [...prev, cityId]))
  }

  const handleRemoveCity = (cityId: string) => {
    if (lockCities) return
    setStoredCityIds((prev) => prev.filter((id) => id !== cityId))
  }

  useEffect(() => {
    const labels = cities.map((city) => city.label)
    document.title = buildTitle(labels)
    updateMetaDescription(buildDescription(labels))
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
