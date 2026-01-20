import * as React from "react";
import { addMinutes, ceilToStep, formatHHMM } from "../lib/time";
import type { City } from "../types/city";
import NowRow from "./NowRow";

type Props = {
  cities: City[];
  stepMinutes?: number; // default: 15
  totalHours?: number;  // default: 48 (±24h)
  rowHeightPx?: number; // default: 56
};

export function ScrollableReel({
  cities,
  stepMinutes = 15,
  totalHours = 48,
  rowHeightPx = 56,
}: Props) {
  const labelWidthPx = 72;

  // Build a stable step timeline ONCE (no shifting as seconds pass).
  // We anchor around a step boundary at mount time.
  const anchor = React.useMemo(() => ceilToStep(new Date(), stepMinutes), [stepMinutes]);

  const stepsPerHour = Math.max(1, Math.round(60 / stepMinutes));
  const totalSteps = Math.max(stepsPerHour, totalHours * stepsPerHour);
  const half = Math.floor(totalSteps / 2);

  // Timeline start time (top of the scroll content)
  const startDate = React.useMemo(() => addMinutes(anchor, -half * stepMinutes), [anchor, half, stepMinutes]);

  const stepDates = React.useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < totalSteps; i++) {
      arr.push(addMinutes(startDate, i * stepMinutes));
    }
    return arr;
  }, [totalSteps, startDate, stepMinutes]);

  const contentHeight = totalSteps * rowHeightPx;

  // Convert "now" to a top offset within the scroll content (continuous).
  const getNowTopPx = React.useCallback(
    (now: Date) => {
      const minutesFromStart = (now.getTime() - startDate.getTime()) / 60_000;
      const rowFloat = minutesFromStart / stepMinutes; // continuous
      const top = rowFloat * rowHeightPx;

      // Clamp so it stays within scroll content bounds.
      const min = 0;
      const max = Math.max(0, contentHeight - rowHeightPx);
      return Math.min(max, Math.max(min, top));
    },
    [startDate, stepMinutes, rowHeightPx, contentHeight]
  );

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full p-6 mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 p-4">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `${labelWidthPx}px repeat(${cities.length}, minmax(200px, 1fr))` }}
        >
          <div />
          {cities.map((c) => (
            <div key={c.id} className="font-semibold text-2xl text-gray-800 truncate text-center">
              {c.label}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          ref={scrollerRef}
          className="h-full"
        >
          {/* Scroll content */}
          <div className="relative" style={{ height: contentHeight }}>
            {/* Static step rows */}
            {stepDates.map((d, i) => (
              <div
                key={d.getTime()}
                className="px-4 grid gap-3 items-center"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: i * rowHeightPx,
                  height: rowHeightPx,
                  gridTemplateColumns: `${labelWidthPx}px repeat(${cities.length}, minmax(200px, 1fr))`,
                }}
              >
                <div />
                {cities.map((c) => (
                  <div key={c.id} className="tracking-tight text-2xl text-gray-400 font-mono text-center">
                    {formatHHMM(d, c.tz)}
                  </div>
                ))}
              </div>
            ))}

            <NowRow
              cities={cities}
              labelWidthPx={labelWidthPx}
              rowHeightPx={rowHeightPx}
              getNowTopPx={getNowTopPx}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
