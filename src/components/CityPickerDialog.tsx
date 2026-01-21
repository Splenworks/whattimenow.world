import * as React from "react";
import type { City } from "../types/city";

type Props = {
  availableCities: City[];
  isOpen: boolean;
  onAddCity: (cityId: string) => void;
  onClose: () => void;
};

const normalize = (value: string) => value.trim().toLowerCase();

export function CityPickerDialog({
  availableCities,
  isOpen,
  onAddCity,
  onClose,
}: Props) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = React.useState("");

  const normalizedQuery = normalize(query);
  const filteredCities = React.useMemo(() => {
    if (!normalizedQuery) return availableCities;
    return availableCities.filter((city) => {
      const label = normalize(city.label);
      const id = normalize(city.id);
      return label.includes(normalizedQuery) || id.includes(normalizedQuery);
    });
  }, [availableCities, normalizedQuery]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  const handleSelect = (cityId: string) => {
    onAddCity(cityId);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="city-picker-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="
        m-auto h-fit max-h-[85vh] w-[92vw] max-w-md overflow-hidden
        rounded-2xl border border-gray-200 bg-white p-0 shadow-xl
        backdrop:bg-black/20
      "
    >
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="city-picker-title"
              className="text-base font-semibold text-gray-900"
            >
              Add a city
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search and select a city to add.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              inline-flex h-8 w-8 items-center justify-center rounded-full
              text-gray-400 transition
              hover:bg-gray-100 hover:text-gray-600
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200
            "
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <label
            htmlFor="city-search-input"
            className="text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            Search
          </label>
          <input
            ref={inputRef}
            id="city-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by city name…"
            className="
              mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2
              text-sm text-gray-900 placeholder:text-gray-400
              outline-none transition
              focus:border-gray-300 focus:ring-2 focus:ring-gray-200
            "
          />
        </div>

        {/* Results */}
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
          {filteredCities.length ? (
            <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto">
              {filteredCities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(city.id)}
                    className="
                      flex w-full items-center justify-between gap-3 px-4 py-3 text-left
                      transition
                      hover:bg-gray-50
                      focus-visible:outline-none focus-visible:bg-gray-50
                    "
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate text-sm font-medium text-gray-900">
                        {city.label}
                      </span>
                      {city.flag ? (
                        <span className="text-base leading-none opacity-80">
                          {city.flag}
                        </span>
                      ) : null}
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      UTC{city.utcOffset}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-sm text-gray-500">
              {availableCities.length
                ? `No cities match “${query}”.`
                : "No cities available to add."}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex items-center rounded-full border border-gray-200
              bg-white px-4 py-2 text-sm font-medium text-gray-700
              transition hover:bg-gray-50
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
