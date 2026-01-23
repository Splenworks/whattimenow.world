import * as React from "react"
import { twJoin, twMerge } from "tailwind-merge"
import type { City } from "../types/city"
import { AddCityInline } from "./AddCityInline"

type HeaderProps = {
  cities: City[]
  availableCities: City[]
  onAddCity: (cityId: string) => void
  onRemoveCity: (cityId: string) => void
  labelWidthPx: number
  cellWidthPx: number
  onGoToNow: () => void
}

export function Header({
  cities,
  availableCities,
  onAddCity,
  onRemoveCity,
  labelWidthPx,
  cellWidthPx,
  onGoToNow,
}: HeaderProps) {
  const [isAdding, setIsAdding] = React.useState(false)

  return (
    <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-max flex-nowrap items-center px-4 py-2">
        {/* Left gutter: quiet "Now" */}
        <div className="flex items-center justify-start" style={{ width: labelWidthPx }}>
          <button
            type="button"
            onClick={onGoToNow}
            className={twJoin(
              // quiet utility button
              "inline-flex items-center gap-2 rounded-md px-2 py-1",
              "text-xs font-semibold tracking-wide text-gray-600 uppercase",
              "hover:bg-gray-100 hover:text-gray-900",
              "focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none",
            )}
            title="Go to current time"
          >
            <span>Now</span>
            <span aria-hidden className="text-gray-400">
              →
            </span>
          </button>
        </div>

        {/* City columns */}
        {cities.map((c) => (
          <div
            key={c.id}
            className={twMerge(
              "group relative flex flex-col items-center justify-center gap-1 rounded-md py-2",
              c.id !== "local" && "hover:bg-gray-100",
            )}
            style={{ width: cellWidthPx }}
          >
            <div className="flex max-w-full items-center gap-1">
              <span className="block truncate text-lg font-semibold text-gray-900">{c.label}</span>
              <span className="opacity-90">{c.flag}</span>
            </div>
            <span className="text-xs font-medium text-gray-500">UTC{c.utcOffset}</span>

            {c.id !== "local" ? (
              <button
                type="button"
                aria-label={`Remove ${c.label}`}
                onClick={() => onRemoveCity(c.id)}
                className={twJoin(
                  "absolute top-1 right-2 rounded p-1",
                  "text-gray-400 transition hover:bg-white hover:text-gray-700",
                  "pointer-events-none opacity-0",
                  "group-hover:pointer-events-auto group-hover:opacity-100",
                  "focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-gray-300",
                )}
              >
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
              </button>
            ) : null}
          </div>
        ))}

        {isAdding ? (
          <AddCityInline
            widthPx={labelWidthPx}
            availableCities={availableCities}
            onAddCity={onAddCity}
            onClose={() => setIsAdding(false)}
          />
        ) : (
          <div className="flex items-center justify-end" style={{ width: labelWidthPx }}>
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className={`inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none`}
              aria-label="Add a city"
              title="Add city"
            >
              <span aria-hidden className="text-lg leading-none">
                +
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
