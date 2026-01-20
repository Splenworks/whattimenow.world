import React from "react";
import { formatHHMMSS } from "../lib/time";
import type { City } from "../types/city";

/**
 * Absolutely positioned inside the scroll content, so it scrolls naturally.
 * Only this component updates every second (position + HH:MM:SS text).
 */
const NowOverlayRow = React.memo(function NowOverlayRow({
  cities,
  labelWidthPx,
  rowHeightPx,
  getNowTopPx,
  didInitialCenterRef,
  centerNowInView,
}: {
  cities: City[];
  labelWidthPx: number;
  rowHeightPx: number;
  getNowTopPx: (now: Date) => number;
  didInitialCenterRef: React.MutableRefObject<boolean>;
  centerNowInView: (nowTopPx: number) => void;
}) {
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const [now, setNow] = React.useState(() => new Date());

  // Update time + position once per second (minimal scope: this component only).
  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Apply top position imperatively so layout is cheap.
  React.useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const top = getNowTopPx(now);
    el.style.top = `${top}px`;

    // Ensure initial centering happens once, after we know our top.
    if (!didInitialCenterRef.current) {
      didInitialCenterRef.current = true;
      centerNowInView(top);
    }
  }, [now, getNowTopPx, centerNowInView, didInitialCenterRef]);

  return (
    <div
      ref={rowRef}
      className="absolute left-0 right-0 px-4 grid gap-3 items-center"
      style={{
        height: rowHeightPx,
        gridTemplateColumns: `${labelWidthPx}px repeat(${cities.length}, minmax(0, 1fr))`,
        // top is set imperatively
      }}
    >
      <div className="text-2xl font-semibold text-gray-900 text-right mb-0.5">Now</div>

      {cities.map((c) => (
        <div key={c.id} className="font-mono text-2xl tracking-tight text-gray-900 font-semibold text-center">
          {formatHHMMSS(now, c.tz)}
        </div>
      ))}
    </div>
  );
});

export default NowOverlayRow;