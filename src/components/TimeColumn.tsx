import type { City } from "../lib/time"
import { getTimeParts } from "../lib/time"

type Props = {
  city: City
  now: Date
}

export function TimeColumn({ city, now }: Props) {
  const t = getTimeParts(now, city.timeZone)

  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
      <div className="text-sm text-gray-500">{city.label}</div>

      <div className="mt-2 flex items-baseline text-4xl font-semibold tracking-tight">
        <span className="tabular-nums">{t.hh}</span>
        <span className="mx-1.5 text-gray-400">:</span>
        <span className="tabular-nums">{t.mm}</span>
        <span className="mx-1.5 text-gray-400">:</span>
        <span className="tabular-nums">{t.ss}</span>
      </div>

      <div className="mt-2 text-xs text-gray-500">{city.timeZone}</div>
    </section>
  )
}
