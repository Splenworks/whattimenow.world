import React from "react";
import { addMinutes } from "../lib/time";
import type { City } from "../types/city";

interface OffsetHourRowProps {
  hourOffset: number;
  nowMinute: Date;
  cities: City[];
  labelWidthPx: number;
  minGridWidthPx: number;
  maxGridWidthPx: number;
  rowHeightPx: number;
  getNowTopPx: (now: Date) => number;
}

const OffsetHourRow = React.memo(function OffsetHourRow({
  hourOffset,
  nowMinute,
  cities,
  labelWidthPx,
  minGridWidthPx,
  maxGridWidthPx,
  rowHeightPx,
  getNowTopPx,
}: OffsetHourRowProps) {
  const d = React.useMemo(
    () => addMinutes(nowMinute, hourOffset * 60),
    [nowMinute, hourOffset]
  );
  const label = hourOffset > 0 ? `${hourOffset} hrs later` : `${-hourOffset} hrs ago`;

  return (
    <div
      className="absolute left-0 right-0 px-4 grid gap-3 items-center"
      style={{
        top: getNowTopPx(d),
        height: rowHeightPx,
        gridTemplateColumns: `${labelWidthPx}px repeat(${cities.length}, minmax(${minGridWidthPx}px, ${maxGridWidthPx}px))`,
      }}
    >
      <div className="text-xl font-semibold text-gray-700 text-right">{label}</div>
      {cities.map((c) => (
        <div key={c.id} />
      ))}
    </div>
  );
});

export default OffsetHourRow;
