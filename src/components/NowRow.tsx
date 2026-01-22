import React from "react"
import { formatHHMMSS } from "../lib/time"
import type { City } from "../types/city"

interface NowOverlayRowProps {
  cities: City[]
  labelWidthPx: number
  cellWidthPx: number
  rowHeightPx: number
  getNowTopPx: (now: Date) => number
}

/**
 * Absolutely positioned inside the scroll content, so it scrolls naturally.
 * Only this component updates every second (position + HH:MM:SS text).
 */
const NowOverlayRow = React.memo(function NowOverlayRow({
  cities,
  labelWidthPx,
  cellWidthPx,
  rowHeightPx,
  getNowTopPx,
}: NowOverlayRowProps) {
  const rowRef = React.useRef<HTMLDivElement | null>(null)
  const [now, setNow] = React.useState(() => new Date())

  // Update time + position once per second (minimal scope: this component only).
  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  // Apply top position imperatively so layout is cheap.
  React.useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return

    const top = getNowTopPx(now)
    el.style.top = `${top}px`
  }, [now, getNowTopPx])

  return (
    <div
      ref={rowRef}
      className="absolute left-0 flex cursor-default flex-nowrap items-center px-4"
      style={{
        height: rowHeightPx,
        // top is set imperatively
      }}
    >
      <div
        className="mb-0.5 text-right text-2xl font-semibold text-gray-900"
        style={{ width: labelWidthPx }}
      >
        Now →
      </div>

      {cities.map((c) => (
        <div
          key={c.id}
          className="text-center font-mono text-xl font-semibold tracking-tight text-gray-900"
          style={{ width: cellWidthPx }}
        >
          {formatHHMMSS(now, c.tz)}
        </div>
      ))}
    </div>
  )
})

export default NowOverlayRow
