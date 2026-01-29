import { useCityParams } from "../hooks/useCityParams"
import { WorldTimeApp } from "../components/WorldTimeApp"
import { capitalizeWords, formatList } from "../lib/string"

export function WorldTimePage() {
  const { cityIds } = useCityParams()
  const routedCityIds = ["local", ...cityIds, "utc"]
  const cityNames = cityIds.map((id) => capitalizeWords(id.replaceAll("-", " ")))

  // Force remount on route change so TimeReel re-centers on "Now".
  return (
    <>
      <h1 className="sr-only">Compare the timezones of {formatList(cityNames)}</h1>
      <WorldTimeApp key={cityIds.join("|")} cityIds={routedCityIds} lockCities />
    </>
  )
}
