import * as React from "react";
import { twJoin } from "tailwind-merge";
import type { City } from "../types/city";

type Props = {
  cities: City[];
  availableCities: City[];
  onAddCity: (cityId: string) => void;
  onRemoveCity: (cityId: string) => void;
  labelWidthPx: number;
  cellWidthPx: number;
};

const normalize = (value: string) => value.trim().toLowerCase();

export function TimeReelHeader({
  cities,
  availableCities,
  onAddCity,
  onRemoveCity,
  labelWidthPx,
  cellWidthPx,
}: Props) {
  const [query, setQuery] = React.useState("");
  const normalizedQuery = normalize(query);
  const matchedCity = availableCities.find((city) => {
    const label = normalize(city.label);
    const id = normalize(city.id);
    return label === normalizedQuery || id === normalizedQuery;
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!matchedCity) return;
    onAddCity(matchedCity.id);
    setQuery("");
  };

  return (
    <div className="sticky top-0 z-10 bg-white/95 p-4">
      <div className="flex flex-nowrap gap-4 items-center">
        <div className="flex flex-nowrap gap-3 items-center">
          <div style={{ width: labelWidthPx }} />
          {cities.map((c) => (
            <div
              key={c.id}
              className="py-2 group relative flex flex-col justify-center items-center gap-1 hover:bg-gray-100 rounded-md"
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
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 ml-3">
          <div className="flex flex-col items-start">
            <label
              htmlFor="city-add-input"
              className="text-xs uppercase tracking-wide text-gray-500"
            >
              Add City
            </label>
            <input
              id="city-add-input"
              list="city-suggestions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Start typing..."
              className="w-48 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
            />
            <datalist id="city-suggestions">
              {availableCities.map((city) => (
                <option key={city.id} value={city.label} />
              ))}
            </datalist>
          </div>
          <button
            type="submit"
            disabled={!matchedCity}
            className="mt-4 rounded-md border border-gray-900 bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
