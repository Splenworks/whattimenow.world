import React from "react"
import { formatHHMMSS } from "../lib/time"
import type { City } from "../types/city"

interface NowRowProps {
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
const NowRow = React.memo(
  React.forwardRef<HTMLDivElement, NowRowProps>(
    ({ cities, labelWidthPx, cellWidthPx, rowHeightPx, getNowTopPx }, forwardedRef) => {
      const rowRef = React.useRef<HTMLDivElement | null>(null)
      const [now, setNow] = React.useState(() => new Date())
      const setRefs = React.useCallback(
        (node: HTMLDivElement | null) => {
          rowRef.current = node
          if (!forwardedRef) return
          if (typeof forwardedRef === "function") {
            forwardedRef(node)
          } else {
            forwardedRef.current = node
          }
        },
        [forwardedRef],
      )

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
          ref={setRefs}
          className="absolute left-0 flex cursor-default flex-nowrap items-center px-4"
          style={{
            height: rowHeightPx,
            // top is set imperatively
          }}
        >
          <div className="flex items-center justify-end" style={{ width: labelWidthPx }}>
            <span className="text-xs font-semibold tracking-wide text-gray-900 uppercase">Now</span>
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
          <div className="shrink-0" style={{ width: labelWidthPx }} />
        </div>
      )
    },
  ),
)

NowRow.displayName = "NowRow"

export default NowRow
