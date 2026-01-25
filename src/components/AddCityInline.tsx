import * as React from "react"
import type { City } from "../types/city"

type AddCityInlineProps = {
  availableCities: City[]
  onAddCity: (cityId: string) => void
  onClose: () => void
  widthPx: number
}

const normalize = (value: string) => value.trim().toLowerCase()

export function AddCityInline({ availableCities, onAddCity, onClose, widthPx }: AddCityInlineProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = React.useState("")

  const normalizedQuery = normalize(query)
  const filteredCities = React.useMemo(() => {
    if (!normalizedQuery) return availableCities
    return availableCities.filter((city) => {
      const label = normalize(city.label)
      const id = normalize(city.id)
      return label.includes(normalizedQuery) || id.includes(normalizedQuery)
    })
  }, [availableCities, normalizedQuery])

  // Focus on open
  React.useEffect(() => {
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  // Close on outside click
  React.useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current
      if (!root) return
      if (!root.contains(e.target as Node)) onClose()
    }
    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [onClose])

  // Close on Escape
  React.useEffect(() => {
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

        <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950 dark:shadow-black/40">
          {filteredCities.length ? (
            <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
              {filteredCities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(city.id)}
                    className={`cursor-pointer flex w-full items-center justify-start gap-3 px-4 py-3 text-left transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none dark:hover:bg-gray-900 dark:focus-visible:bg-gray-900`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      {city.flag ? (
                        <span className="text-base leading-none opacity-80">{city.flag}</span>
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
              {availableCities.length
                ? `No cities match “${query}”.`
                : "No cities available to add."}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
