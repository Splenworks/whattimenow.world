import { useCityParams } from "../hooks/useCityParams"
import { WorldTimeApp } from "../components/WorldTimeApp"

export function WorldTimePage() {
  const { cityIds } = useCityParams()

  return <WorldTimeApp cityIds={cityIds} lockCities />
}
