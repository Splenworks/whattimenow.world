import { useCityParams } from "../hooks/useCityParams"
import { HomePage } from "./Home"

export function TimeReelRoutePage() {
  const { cityIds } = useCityParams()

  return <HomePage routeCityIds={cityIds} lockCities />
}
