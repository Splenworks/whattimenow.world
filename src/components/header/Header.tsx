import { useState } from "react"
import { twMerge } from "tailwind-merge"
import type { City } from "../../types/city"
import { AddButton } from "./AddButton"
import { AddCity } from "./AddCity"
import { CloseButton } from "./CloseButton"
import { DarkmodeButton } from "./DarkmodeButton"
import { NowButton } from "./NowButton"

type HeaderProps = {
  cities: City[]
  availableCities: City[]
  onAddCity: (cityId: string) => void
  onRemoveCity: (cityId: string) => void
  cellWidthPx: number
  maxCities: number
  onGoToNow: () => void
  showNowButton: boolean
  isReadOnly?: boolean
}

export function Header({
  cities,
  availableCities,
  onAddCity,
  onRemoveCity,
  cellWidthPx,
  maxCities,
  onGoToNow,
  showNowButton,
  isReadOnly = false,
}: HeaderProps) {
  const [isAdding, setIsAdding] = useState(false)
  const canAddCity = !isReadOnly && cities.length < maxCities

  return (
    <header className="sticky top-0 z-10 w-max min-w-full border-b border-gray-200 bg-gray-100/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex w-max flex-nowrap items-center px-4 py-2">
        <div className="flex items-center justify-end" style={{ width: cellWidthPx }}>
          <NowButton
            onClick={onGoToNow}
            className={showNowButton ? "opacity-100" : "pointer-events-none opacity-0"}
          />
        </div>

        {cities.map((c) => (
          <div
            key={c.id}
            className={twMerge(
              "group relative flex flex-col items-center justify-center gap-1 rounded-md py-2 hover:bg-gray-200 dark:hover:bg-gray-800",
            )}
            style={{ width: cellWidthPx }}
          >
            <div className="flex max-w-full items-center gap-2">
              <span className="block truncate text-lg font-semibold text-gray-900 dark:text-gray-100">
                {c.label}
              </span>
              {c.flag ? (
                <span className={`fi fi-${c.flag} text-sm opacity-90`} aria-hidden="true" />
              ) : null}
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              UTC{c.utcOffset}
            </span>

            {!isReadOnly && cities.length > 2 && <CloseButton onClick={() => onRemoveCity(c.id)} />}
          </div>
        ))}

        {isReadOnly ? (
          <div className="flex items-center" style={{ width: cellWidthPx }}>
            <DarkmodeButton />
          </div>
        ) : canAddCity && isAdding ? (
          <AddCity
            widthPx={cellWidthPx}
            availableCities={availableCities}
            onAddCity={onAddCity}
            onClose={() => setIsAdding(false)}
          />
        ) : (
          <div className="flex items-center gap-4" style={{ width: cellWidthPx }}>
            {canAddCity ? <AddButton onClick={() => setIsAdding(true)} /> : null}
            <DarkmodeButton />
          </div>
        )}
      </div>
    </header>
  )
}
