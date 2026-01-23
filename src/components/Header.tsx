import * as React from "react"
import { twMerge } from "tailwind-merge"
import type { City } from "../types/city"
import { AddButton } from "./AddButton"
import { AddCityInline } from "./AddCityInline"
import { CloseButton } from "./CloseButton"
import { NowButton } from "./NowButton"

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
        <div className="flex items-center justify-end" style={{ width: labelWidthPx }}>
          <NowButton onClick={onGoToNow} />
        </div>

        {/* City columns */}
        {cities.map((c) => (
          <div
            key={c.id}
            className={twMerge(
              "group relative flex flex-col items-center justify-center gap-1 rounded-md py-2 hover:bg-gray-100",
            )}
            style={{ width: cellWidthPx }}
          >
            <div className="flex max-w-full items-center gap-1">
              <span className="block truncate text-lg font-semibold text-gray-900">{c.label}</span>
              <span className="opacity-90">{c.flag}</span>
            </div>
            <span className="text-xs font-medium text-gray-500">UTC{c.utcOffset}</span>

            {cities.length > 2 && (
              <CloseButton onClick={() => onRemoveCity(c.id)} />
            )}
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
          <div className="flex items-center justify-center" style={{ width: labelWidthPx }}>
            <AddButton onClick={() => setIsAdding(true)} />
          </div>
        )}
      </div>
    </div>
  )
}
