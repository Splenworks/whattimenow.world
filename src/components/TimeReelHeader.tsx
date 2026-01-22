import * as React from "react"
import { twJoin, twMerge } from "tailwind-merge"
import type { City } from "../types/city"
import { CityPickerDialog } from "./CityPickerDialog"

type Props = {
  cities: City[]
  availableCities: City[]
  onAddCity: (cityId: string) => void
  onRemoveCity: (cityId: string) => void
  labelWidthPx: number
  cellWidthPx: number
}

export function TimeReelHeader({
  cities,
  availableCities,
  onAddCity,
  onRemoveCity,
  labelWidthPx,
  cellWidthPx,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <div className="sticky top-0 z-10 bg-white/95 px-4 py-2">
      <div className="flex flex-nowrap items-center">
        <div style={{ width: labelWidthPx }} />
        {cities.map((c) => (
          <div
            key={c.id}
            className={twMerge(
              "group relative flex flex-col items-center justify-center gap-1 rounded-md py-2",
              c.id !== "local" && "hover:bg-gray-100",
            )}
            style={{ width: cellWidthPx }}
          >
            <div className="flex items-center gap-1 text-xl">
              <span className="block truncate font-semibold text-gray-800">{c.label}</span>
              <span className="opacity-90">{c.flag}</span>
            </div>
            <span className="text-sm text-gray-500">UTC{c.utcOffset}</span>
            {c.id !== "local" ? (
              <button
                type="button"
                aria-label={`Remove ${c.label}`}
                onClick={() => onRemoveCity(c.id)}
                className={twJoin(
                  "absolute top-0 right-2 cursor-pointer",
                  "text-gray-400 transition hover:text-gray-600",
                  "pointer-events-none opacity-0",
                  "group-hover:pointer-events-auto group-hover:opacity-100",
                  "focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none",
                )}
              >
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
              </button>
            ) : null}
          </div>
        ))}
        <div style={{ width: labelWidthPx }}>
          <div className="flex flex-col items-center justify-center gap-1">
            <div
              className="cursor-pointer rounded-md px-4 py-2 text-xl font-semibold text-gray-800 hover:bg-gray-100"
              onClick={() => setIsDialogOpen(true)}
            >
              Add+
            </div>
            <span className="text-sm">&nbsp;</span>
          </div>
        </div>
      </div>
      <CityPickerDialog
        availableCities={availableCities}
        isOpen={isDialogOpen}
        onAddCity={onAddCity}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}
