import { memo, useMemo } from "react"
import { addMinutes } from "../../lib/time"

interface OffsetTimeProps {
  hourOffset: number
  nowMinute: Date
  cellWidthPx: number
  rowHeightPx: number
  getNowTopPx: (now: Date) => number
}

const OffsetTime = memo(function OffsetHourRow({
  hourOffset,
  nowMinute,
  cellWidthPx,
  rowHeightPx,
  getNowTopPx,
}: OffsetTimeProps) {
  const d = useMemo(() => addMinutes(nowMinute, hourOffset * 60), [nowMinute, hourOffset])
  const label = hourOffset > 0 ? `${hourOffset} hrs later` : `${-hourOffset} hrs ago`

  return (
    <div
      className="absolute left-0 pl-4 flex items-center"
      style={{
        top: getNowTopPx(d),
        height: rowHeightPx,
      }}
    >
      <div
        className="pt-3 text-right text-xs font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
        style={{ width: cellWidthPx }}
      >
        {label}
      </div>
    </div>
  )
})

export default OffsetTime
