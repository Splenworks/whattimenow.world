import React from "react"
import { addMinutes } from "../lib/time"

interface OffsetTimeProps {
  hourOffset: number
  nowMinute: Date
  cellWidthPx: number
  rowHeightPx: number
  getNowTopPx: (now: Date) => number
}

const OffsetTime = React.memo(function OffsetHourRow({
  hourOffset,
  nowMinute,
  cellWidthPx,
  rowHeightPx,
  getNowTopPx,
}: OffsetTimeProps) {
  const d = React.useMemo(() => addMinutes(nowMinute, hourOffset * 60), [nowMinute, hourOffset])
  const label = hourOffset > 0 ? `${hourOffset} hrs later` : `${-hourOffset} hrs ago`

  return (
    <div
      className="absolute left-0 px-4"
      style={{
        top: getNowTopPx(d),
        height: rowHeightPx,
      }}
    >
      <div
        className="text-right text-xs font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
        style={{ width: cellWidthPx }}
      >
        {label}
      </div>
    </div>
  )
})

export default OffsetTime
