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
      className="border border-gray-200 bg-white p-0 shadow-2xl m-auto h-fit max-h-[85vh] w-[92vw] max-w-md rounded-lg overflow-y-auto"
    >
      <div className="py-4 px-6">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="city-picker-title"
            className="text-lg font-semibold text-gray-800"
          >
            Add a city
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer focus-visible:outline-none focus-visible:text-gray-600"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="mt-3">
          <label
            htmlFor="city-search-input"
            className="text-xs uppercase tracking-wide text-gray-500"
          >
            Search
          </label>
          <input
            ref={inputRef}
            id="city-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or code..."
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gray-400 focus:outline-none"
          />
        </div>

        <div className="mt-4 max-h-64 overflow-y-auto rounded-md border border-gray-200">
          {filteredCities.length ? (
            <ul className="divide-y divide-gray-100">
              {filteredCities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(city.id)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {city.label}
                      {city.flag ? (
                        <span className="ml-1 opacity-80">{city.flag}</span>
                      ) : null}
                    </span>
                    <span className="text-xs text-gray-500">
                      UTC{city.utcOffset}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm text-gray-500">
              {availableCities.length
                ? `No cities match "${query}".`
                : "No cities available to add."}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:border-gray-300 hover:text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
