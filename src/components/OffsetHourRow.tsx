import React from "react"
import { addMinutes } from "../lib/time"

interface OffsetHourRowProps {
  hourOffset: number
  nowMinute: Date
  labelWidthPx: number
  rowHeightPx: number
  getNowTopPx: (now: Date) => number
}

const OffsetHourRow = React.memo(function OffsetHourRow({
  hourOffset,
  nowMinute,
  labelWidthPx,
  rowHeightPx,
  getNowTopPx,
}: OffsetHourRowProps) {
  const d = React.useMemo(() => addMinutes(nowMinute, hourOffset * 60), [nowMinute, hourOffset])
  const label = hourOffset > 0 ? `${hourOffset} hrs later` : `${-hourOffset} hrs ago`

  return (
    <div
      className="absolute left-0 flex flex-nowrap items-center gap-3 px-4"
      style={{
        top: getNowTopPx(d),
        height: rowHeightPx,
      }}
    >
      <div
        className="text-right text-lg font-semibold text-gray-700"
        style={{ width: labelWidthPx }}
      >
        {label}
      </div>
    </div>
  )
})

export default OffsetHourRow
