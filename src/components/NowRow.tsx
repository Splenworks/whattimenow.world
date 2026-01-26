import React from "react"
import { formatDateYYYYMMDD, formatHHMMSS } from "../lib/time"
import type { City } from "../types/city"
import { twJoin } from "tailwind-merge"

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
          className="group absolute left-0 flex cursor-default flex-nowrap items-center px-4"
          style={{
            height: rowHeightPx,
            // top is set imperatively
          }}
        >
          <div className="flex items-center justify-end" style={{ width: labelWidthPx }}>
            <span className="text-xs font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
              Now
            </span>
          </div>

          {cities.map((c, i) => (
            <div
              key={c.id}
              className={twJoin(
                "relative pt-5 pb-2 text-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800",
                i === 0 && "rounded-l-md",
                i === cities.length - 1 && "rounded-r-md",
              )}
              style={{ width: cellWidthPx }}
            >
              <span className="font-mono text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                {formatHHMMSS(now, c.tz)}
              </span>
              <span className="absolute top-1 right-0 left-0 text-xs font-medium text-gray-900 opacity-0 transition-opacity group-hover:opacity-100 dark:text-white">
                {formatDateYYYYMMDD(now, c.tz)}
              </span>
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
