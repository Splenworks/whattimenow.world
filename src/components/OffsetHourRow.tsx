import React from "react";
import { addMinutes } from "../lib/time";
import type { City } from "../types/city";

interface OffsetHourRowProps {
  hourOffset: number;
  nowMinute: Date;
  cities: City[];
  labelWidthPx: number;
  cellWidthPx: number;
  rowHeightPx: number;
  getNowTopPx: (now: Date) => number;
}

const OffsetHourRow = React.memo(function OffsetHourRow({
  hourOffset,
  nowMinute,
  cities,
  labelWidthPx,
  cellWidthPx,
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
      className="absolute left-0 right-0 px-4 flex flex-nowrap gap-3 items-center"
      style={{
        top: getNowTopPx(d),
        height: rowHeightPx,
      }}
    >
      <div className="text-xl font-semibold text-gray-700 text-right" style={{ width: labelWidthPx }}>
        {label}
      </div>
      {cities.map((c) => (
        <div key={c.id} style={{ width: cellWidthPx }} />
      ))}
    </div>
  );
});

export default OffsetHourRow;
