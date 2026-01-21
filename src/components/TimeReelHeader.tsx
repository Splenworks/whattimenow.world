import * as React from "react";
import { twJoin, twMerge } from "tailwind-merge";
import type { City } from "../types/city";
import { CityPickerDialog } from "./CityPickerDialog";

type Props = {
  cities: City[];
  availableCities: City[];
  onAddCity: (cityId: string) => void;
  onRemoveCity: (cityId: string) => void;
  labelWidthPx: number;
  cellWidthPx: number;
};

export function TimeReelHeader({
  cities,
  availableCities,
  onAddCity,
  onRemoveCity,
  labelWidthPx,
  cellWidthPx,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-10 bg-white/95 p-4">
      <div className="flex flex-nowrap gap-3 items-center">
        <div style={{ width: labelWidthPx }} />
        {cities.map((c) => (
          <div
            key={c.id}
            className={twMerge(
              "py-2 group relative flex flex-col justify-center items-center gap-1 rounded-md",
              c.id !== "local" && "hover:bg-gray-100"
            )}
            style={{ width: cellWidthPx }}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-gray-800 truncate">
                {c.label}
                <span className="ml-1 opacity-90">{c.flag}</span>
              </span>
              {c.id !== "local" ? (
                <button
                  type="button"
                  aria-label={`Remove ${c.label}`}
                  onClick={() => onRemoveCity(c.id)}
                  className={twJoin(
                    "absolute right-2 top-0 cursor-pointer",
                    "text-gray-400 hover:text-gray-600 transition",
                    "opacity-0 pointer-events-none",
                    "group-hover:opacity-100 group-hover:pointer-events-auto",
                    "focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:outline-none",
                  )}
                >
                  <span aria-hidden className="text-lg leading-none">×</span>
                </button>
              ) : null}
            </div>
            <span className="text-sm text-gray-500">UTC{c.utcOffset}</span>
          </div>
        ))}
        <div style={{ width: labelWidthPx }}>
          <div
            className="relative flex flex-col justify-center items-center gap-1"
            style={{ width: cellWidthPx }}
          >
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 font-semibold text-2xl text-gray-800 truncate cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() => setIsDialogOpen(true)}
              >
                Add+
              </div>
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
  );
}
