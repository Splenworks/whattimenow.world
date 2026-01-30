import { useEffect, useMemo, useRef, useState } from "react"
import type { City } from "../../types/city"
import { normalize } from "../../lib/string"

type AddCityProps = {
  availableCities: City[]
  onAddCity: (cityId: string) => void
  onClose: () => void
  widthPx: number
}

export function AddCity({ availableCities, onAddCity, onClose, widthPx }: AddCityProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState("")

  const normalizedQuery = normalize(query)
  const filteredCities = useMemo(() => {
    if (!normalizedQuery) return availableCities
    return availableCities.filter((city) => {
      const label = normalize(city.label)
      const id = normalize(city.id)
      const tz = normalize(city.tz)
      const country = normalize(city.country ?? "")
      return (
        label.includes(normalizedQuery) ||
        id.includes(normalizedQuery) ||
        tz.includes(normalizedQuery) ||
        country.includes(normalizedQuery)
      )
    })
  }, [availableCities, normalizedQuery])

  // Focus on open
  useEffect(() => {
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  // Close on outside click
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current
      if (!root) return
      if (!root.contains(e.target as Node)) onClose()
    }
    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const handleSelect = (cityId: string) => {
    onAddCity(cityId)
    onClose()
  }

  return (
    <div
      ref={rootRef}
      className="relative flex items-center justify-end"
      style={{ width: widthPx }}
    >
      <div className="w-full">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Add city…"
          className={`w-full rounded-md border border-gray-100 px-2 py-1.5 text-sm text-gray-700 transition outline-none placeholder:text-gray-400 hover:bg-gray-100 focus:border-gray-200 focus:bg-white focus:ring-0 dark:border-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500 dark:hover:bg-gray-900 dark:focus:border-gray-700 dark:focus:bg-gray-900`}
        />

        <div className="absolute right-0 left-0 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950 dark:shadow-black/40">
          {filteredCities.length ? (
            <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
              {filteredCities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(city.id)}
                    className={`flex w-full cursor-pointer items-center justify-start gap-3 px-4 py-3 text-left transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none dark:hover:bg-gray-900 dark:focus-visible:bg-gray-900`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {city.flag ? (
                        <span
                          className={`fi fi-${city.flag} text-sm leading-none opacity-90`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                        {city.label}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
              {availableCities.length ? `No match.` : "No cities available to add."}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
