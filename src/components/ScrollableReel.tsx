import * as React from "react";
import { addMinutes, ceilToStep, formatHHMM } from "../lib/time";
import type { City } from "../types/city";
import NowRow from "./NowRow";
import OffsetHourRow from "./OffsetHourRow";

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
  const labelWidthPx = 110;
  const cellWidthPx = 160;

  const [nowMinute, setNowMinute] = React.useState(() => new Date());

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

  const offsetHours = React.useMemo(() => {
    const halfHours = Math.floor(totalHours / 2);
    const arr: number[] = [];
    for (let h = -halfHours; h <= halfHours; h += 4) {
      if (h !== 0) arr.push(h);
    }
    return arr;
  }, [totalHours]);

  React.useEffect(() => {
    let intervalId: number | undefined;
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    const timeoutId = window.setTimeout(() => {
      setNowMinute(new Date());
      intervalId = window.setInterval(() => setNowMinute(new Date()), 60_000);
    }, msToNextMinute);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

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

  const closestStepIndex = React.useMemo(() => {
    const minutesFromStart = (nowMinute.getTime() - startDate.getTime()) / 60_000;
    const rowFloat = minutesFromStart / stepMinutes;
    const nearest = Math.round(rowFloat);
    return Math.min(totalSteps - 1, Math.max(0, nearest));
  }, [nowMinute, startDate, stepMinutes, totalSteps]);

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const didInitialScroll = React.useRef(false);

  React.useLayoutEffect(() => {
    if (didInitialScroll.current) return;
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const nowTopPx = getNowTopPx(new Date());
    const contentTopPx = contentEl.getBoundingClientRect().top + window.scrollY;
    const targetTop =
      contentTopPx + nowTopPx - (window.innerHeight / 2 - rowHeightPx / 2);

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
    didInitialScroll.current = true;
  }, [getNowTopPx, rowHeightPx]);

  return (
    <div className="w-full p-6 mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 p-4">
        <div
          className="flex flex-nowrap gap-3"
        >
          <div style={{ width: labelWidthPx }} />
          {cities.map((c) => (
            <div
              key={c.id}
              className="font-semibold text-2xl text-gray-800 truncate text-center"
              style={{ width: cellWidthPx }}
            >
              {c.label}
            </div>
          ))}
        </div>
      </div>

      <div className="h-full">
        {/* Scroll content */}
        <div ref={contentRef} className="relative" style={{ height: contentHeight }}>
          {/* Static step rows */}
          {stepDates.map((d, i) => {
            if (i === closestStepIndex) return null;
            return (
              <div
                key={d.getTime()}
                className="px-4 flex flex-nowrap gap-3 items-center"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: i * rowHeightPx,
                  height: rowHeightPx,
                }}
              >
                <div style={{ width: labelWidthPx }} />
                {cities.map((c) => (
                  <div
                    key={c.id}
                    className="tracking-tight text-2xl text-gray-400 font-mono text-center"
                    style={{ width: cellWidthPx }}
                  >
                    {formatHHMM(d, c.tz)}
                  </div>
                ))}
              </div>
            );
          })}

          {offsetHours.map((h) => (
            <OffsetHourRow
              key={h}
              hourOffset={h}
              nowMinute={nowMinute}
              cities={cities}
              labelWidthPx={labelWidthPx}
              cellWidthPx={cellWidthPx}
              rowHeightPx={rowHeightPx}
              getNowTopPx={getNowTopPx}
            />
          ))}

          <NowRow
            cities={cities}
            labelWidthPx={labelWidthPx}
            cellWidthPx={cellWidthPx}
            rowHeightPx={rowHeightPx}
            getNowTopPx={getNowTopPx}
          />
        </div>
      </div>
    </div>
  );
}
