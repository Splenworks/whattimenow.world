import { useCityParams } from "../hooks/useCityParams"
import { WorldTimeApp } from "../components/WorldTimeApp"

export function WorldTimePage() {
  const { cityIds } = useCityParams()
  const routedCityIds = ["local", ...cityIds, "utc"]
  const routeKey = routedCityIds.join("|")

  // Force remount on route change so TimeReel re-centers on "Now".
  return <WorldTimeApp key={routeKey} cityIds={routedCityIds} lockCities />
}
