import * as React from "react"
import { twJoin } from "tailwind-merge"
import { addMinutes, ceilToStep, formatHHMM } from "../lib/time"
import type { City } from "../types/city"
import { Header } from "./Header"
import NowRow from "./NowRow"
import OffsetTime from "./OffsetTime"

type Props = {
  cities: City[]
  availableCities: City[]
  onAddCity: (cityId: string) => void
  onRemoveCity: (cityId: string) => void
  stepMinutes?: number // default: 15
  totalHours?: number // default: 48 (±24h)
  rowHeightPx?: number // default: 56
}

export function TimeReel({
  cities,
  availableCities,
  onAddCity,
  onRemoveCity,
  stepMinutes = 15,
  totalHours = 48,
  rowHeightPx = 44,
}: Props) {
  const labelWidthPx = 160
  const cellWidthPx = 170

  const [nowMinute, setNowMinute] = React.useState(() => new Date())

  // Build a stable step timeline ONCE (no shifting as seconds pass).
  // We anchor around a step boundary at mount time.
  const anchor = React.useMemo(() => ceilToStep(new Date(), stepMinutes), [stepMinutes])

  const stepsPerHour = Math.max(1, Math.round(60 / stepMinutes))
  const totalSteps = Math.max(stepsPerHour, totalHours * stepsPerHour)
  const half = Math.floor(totalSteps / 2)

  // Timeline start time (top of the scroll content)
  const startDate = React.useMemo(
    () => addMinutes(anchor, -half * stepMinutes),
    [anchor, half, stepMinutes],
  )

  const stepDates = React.useMemo(() => {
    const arr: Date[] = []
    for (let i = 0; i < totalSteps; i++) {
      arr.push(addMinutes(startDate, i * stepMinutes))
    }
    return arr
  }, [totalSteps, startDate, stepMinutes])

  const contentHeight = totalSteps * rowHeightPx

  const offsetHours = React.useMemo(() => {
    const halfHours = Math.floor(totalHours / 2)
    const arr: number[] = []
    for (let h = -halfHours; h <= halfHours; h += 2) {
      if (h !== 0) arr.push(h)
    }
    return arr.slice(1, -1) // remove endpoints
  }, [totalHours])

  React.useEffect(() => {
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
  const getNowTopPx = React.useCallback(
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

  const closestStepIndex = React.useMemo(() => {
    const minutesFromStart = (nowMinute.getTime() - startDate.getTime()) / 60_000
    const rowFloat = minutesFromStart / stepMinutes
    const nearest = Math.round(rowFloat)
    return Math.min(totalSteps - 1, Math.max(0, nearest))
  }, [nowMinute, startDate, stepMinutes, totalSteps])

  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const nowRowRef = React.useRef<HTMLDivElement | null>(null)
  const [isNowRowVisible, setIsNowRowVisible] = React.useState(true) // set initially true to avoid flicker
  const didInitialScroll = React.useRef(false)

  const handleGoToNow = React.useCallback(() => {
    const contentEl = contentRef.current
    if (!contentEl) return

    const nowTopPx = getNowTopPx(new Date())
    const contentTopPx = contentEl.getBoundingClientRect().top + window.scrollY
    const targetTop = contentTopPx + nowTopPx - (window.innerHeight / 2 - rowHeightPx / 2)

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" })
  }, [getNowTopPx, rowHeightPx])

  React.useLayoutEffect(() => {
    if (didInitialScroll.current) return
    const contentEl = contentRef.current
    if (!contentEl) return

    const nowTopPx = getNowTopPx(new Date())
    const contentTopPx = contentEl.getBoundingClientRect().top + window.scrollY
    const targetTop = contentTopPx + nowTopPx - (window.innerHeight / 2 - rowHeightPx / 2)

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" })
    didInitialScroll.current = true
  }, [getNowTopPx, rowHeightPx])

  React.useEffect(() => {
    const el = nowRowRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNowRowVisible(entry.isIntersecting)
      },
      { root: null, threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <Header
        cities={cities}
        availableCities={availableCities}
        onAddCity={onAddCity}
        onRemoveCity={onRemoveCity}
        labelWidthPx={labelWidthPx}
        cellWidthPx={cellWidthPx}
        onGoToNow={handleGoToNow}
        showNowButton={!isNowRowVisible}
      />

      <div ref={contentRef} className="relative mx-auto w-max" style={{ height: contentHeight }}>
        {stepDates.map((d, i) => {
          return (
            <div
              key={d.getTime()}
              className="group flex flex-nowrap items-center px-4"
              style={{
                height: rowHeightPx,
              }}
            >
              <div style={{ width: labelWidthPx }} />
              {cities.map((c, cityIndex) => (
                <div
                  key={c.id}
                  className={twJoin(
                    "cursor-default py-2 text-center font-mono text-lg font-light tracking-tight text-gray-400 dark:text-gray-500",
                    i !== closestStepIndex &&
                      "transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800",
                    (i - closestStepIndex === 1 || i - closestStepIndex === -1) &&
                      "group-hover:bg-gray-50 dark:group-hover:bg-gray-900",
                    cityIndex === 0 && "rounded-l-md",
                    cityIndex === cities.length - 1 && "rounded-r-md",
                  )}
                  style={{ width: cellWidthPx }}
                >
                  {i === closestStepIndex ? "" : formatHHMM(d, c.tz)}
                </div>
              ))}
              <div className="shrink-0" style={{ width: labelWidthPx }} />
            </div>
          )
        })}

        {offsetHours.map((h) => (
          <OffsetTime
            key={h}
            hourOffset={h}
            nowMinute={nowMinute}
            labelWidthPx={labelWidthPx}
            rowHeightPx={rowHeightPx}
            getNowTopPx={getNowTopPx}
          />
        ))}

        <NowRow
          ref={nowRowRef}
          cities={cities}
          labelWidthPx={labelWidthPx}
          cellWidthPx={cellWidthPx}
          rowHeightPx={rowHeightPx}
          getNowTopPx={getNowTopPx}
        />
      </div>
    </div>
  )
}
