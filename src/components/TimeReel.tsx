import { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect } from "react"
import { twJoin } from "tailwind-merge"
import { addMinutes, ceilToStep, formatHHMM } from "../lib/time"
import type { City } from "../types/city"
import NowRow from "./NowRow"
import OffsetTime from "./OffsetTime"

type Props = {
  cities: City[]
  cellWidthPx?: number // default: 170
  stepMinutes?: number // default: 15
  totalHours?: number // default: 48 (±24h)
  rowHeightPx?: number // default: 44
  onGoToNowReady?: (handler: () => void) => void
  onNowRowVisibilityChange?: (isVisible: boolean) => void
}

export function TimeReel({
  cities,
  cellWidthPx = 170,
  stepMinutes = 15,
  totalHours = 48,
  rowHeightPx = 44,
  onGoToNowReady,
  onNowRowVisibilityChange,
}: Props) {
  const [nowMinute, setNowMinute] = useState(() => new Date())

  // Build a stable step timeline ONCE (no shifting as seconds pass).
  // We anchor around a step boundary at mount time.
  const anchor = useMemo(() => ceilToStep(new Date(), stepMinutes), [stepMinutes])

  const stepsPerHour = Math.max(1, Math.round(60 / stepMinutes))
  const totalSteps = Math.max(stepsPerHour, totalHours * stepsPerHour)
  const half = Math.floor(totalSteps / 2)

  // Timeline start time (top of the scroll content)
  const startDate = useMemo(
    () => addMinutes(anchor, -half * stepMinutes),
    [anchor, half, stepMinutes],
  )

  const stepDates = useMemo(() => {
    const arr: Date[] = []
    for (let i = 0; i < totalSteps; i++) {
      arr.push(addMinutes(startDate, i * stepMinutes))
    }
    return arr
  }, [totalSteps, startDate, stepMinutes])

  const contentHeight = totalSteps * rowHeightPx

  const offsetHours = useMemo(() => {
    const halfHours = Math.floor(totalHours / 2)
    const arr: number[] = []
    for (let h = -halfHours; h <= halfHours; h += 2) {
      if (h !== 0) arr.push(h)
    }
    return arr.slice(1, -1) // remove endpoints
  }, [totalHours])

  useEffect(() => {
    let intervalId: number | undefined
    const msToNextMinute = 60_000 - (Date.now() % 60_000)
    const timeoutId = window.setTimeout(() => {
      setNowMinute(new Date())
      intervalId = window.setInterval(() => setNowMinute(new Date()), 60_000)
    }, msToNextMinute)
    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [])

  // Convert "now" to a top offset within the scroll content (continuous).
  const getNowTopPx = useCallback(
    (now: Date) => {
      const minutesFromStart = (now.getTime() - startDate.getTime()) / 60_000
      const rowFloat = minutesFromStart / stepMinutes // continuous
      const top = rowFloat * rowHeightPx

      // Clamp so it stays within scroll content bounds.
      const min = 0
      const max = Math.max(0, contentHeight - rowHeightPx)
      return Math.min(max, Math.max(min, top))
    },
    [startDate, stepMinutes, rowHeightPx, contentHeight],
  )

  const closestStepIndex = useMemo(() => {
    const minutesFromStart = (nowMinute.getTime() - startDate.getTime()) / 60_000
    const rowFloat = minutesFromStart / stepMinutes
    const nearest = Math.round(rowFloat)
    return Math.min(totalSteps - 1, Math.max(0, nearest))
  }, [nowMinute, startDate, stepMinutes, totalSteps])

  const contentRef = useRef<HTMLDivElement | null>(null)
  const nowRowRef = useRef<HTMLDivElement | null>(null)
  const didInitialScroll = useRef(false)

  const handleGoToNow = useCallback(() => {
    const contentEl = contentRef.current
    if (!contentEl) return

    const nowTopPx = getNowTopPx(new Date())
    const contentTopPx = contentEl.getBoundingClientRect().top + window.scrollY
    const targetTop = contentTopPx + nowTopPx - (window.innerHeight / 2 - rowHeightPx / 2)

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" })
  }, [getNowTopPx, rowHeightPx])

  useEffect(() => {
    onGoToNowReady?.(handleGoToNow)
  }, [handleGoToNow, onGoToNowReady])

  useLayoutEffect(() => {
    if (didInitialScroll.current) return
    const contentEl = contentRef.current
    if (!contentEl) return

    const nowTopPx = getNowTopPx(new Date())
    const contentTopPx = contentEl.getBoundingClientRect().top + window.scrollY
    const targetTop = contentTopPx + nowTopPx - (window.innerHeight / 2 - rowHeightPx / 2)

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" })
    didInitialScroll.current = true
  }, [getNowTopPx, rowHeightPx])

  useEffect(() => {
    const el = nowRowRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        onNowRowVisibilityChange?.(entry.isIntersecting)
      },
      { root: null, threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onNowRowVisibilityChange])

  return (
    <div
      ref={contentRef}
      className="relative mx-auto w-max bg-gray-50 dark:bg-gray-950"
      style={{ height: contentHeight }}
    >
      {stepDates.map((d, i) => {
        return (
          <div
            key={d.getTime()}
            className="group flex flex-nowrap items-center px-4"
            style={{
              height: rowHeightPx,
            }}
          >
            <div style={{ width: cellWidthPx }} />
            {cities.map((c, cityIndex) => (
              <div
                key={c.id}
                className={twJoin(
                  "relative cursor-default py-2 text-center font-mono text-lg font-light tracking-tight text-gray-400 dark:text-gray-500",
                  i !== closestStepIndex &&
                    "transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-800",
                  cityIndex === 0 && "rounded-l-md",
                  cityIndex === cities.length - 1 && "rounded-r-md",
                )}
                style={{ width: cellWidthPx }}
              >
                {i === closestStepIndex ? "" : formatHHMM(d, c.tz)}
                {/* {i !== closestStepIndex && (
                    <span className="absolute top-0 right-0 left-0 text-center font-mono text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-500">
                      {formatDateYYYYMMDD(d, c.tz)}
                    </span>
                  )} */}
              </div>
            ))}
            <div className="shrink-0" style={{ width: cellWidthPx }} />
          </div>
        )
      })}

      {offsetHours.map((h) => (
        <OffsetTime
          key={h}
          hourOffset={h}
          nowMinute={nowMinute}
          cellWidthPx={cellWidthPx}
          rowHeightPx={rowHeightPx}
          getNowTopPx={getNowTopPx}
        />
      ))}

      <NowRow
        ref={nowRowRef}
        cities={cities}
        cellWidthPx={cellWidthPx}
        rowHeightPx={rowHeightPx}
        getNowTopPx={getNowTopPx}
      />
    </div>
  )
}
