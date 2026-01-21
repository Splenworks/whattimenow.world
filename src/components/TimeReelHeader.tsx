import type { City } from "../types/city";

type Props = {
  cities: City[];
  labelWidthPx: number;
  cellWidthPx: number;
};

export function TimeReelHeader({ cities, labelWidthPx, cellWidthPx }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white/95 p-4">
      <div className="flex flex-nowrap gap-3">
        <div style={{ width: labelWidthPx }} />
        {cities.map((c) => (
          <div
            key={c.id}
            className="truncate text-center flex flex-col justify-center items-center gap-1"
            style={{ width: cellWidthPx }}
          >
            <span className="font-semibold text-2xl text-gray-800">
              {c.label}
              <span className="ml-1 opacity-90">{c.flag}</span>
            </span>
            <span className="text-sm text-gray-500">UTC{c.utcOffset}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
