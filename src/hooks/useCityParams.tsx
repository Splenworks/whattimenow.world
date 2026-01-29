import { useLocation, useNavigate } from "react-router-dom"
import { cityMapping } from "../lib/city"

const MAX_ROUTE_CITIES = 3

const toCanonicalPath = (cityIds: string[]) => `/${cityIds.join("/")}`

const parseCities = (pathname: string) =>
  pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment).trim().toLowerCase())
    .filter((segment) => cityMapping.has(segment))
    .slice(0, MAX_ROUTE_CITIES)

export const useCityParams = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const cityIds = parseCities(pathname)
  const canonicalPath = toCanonicalPath(cityIds)

  if (cityIds.length === 0) {
    navigate("/", { replace: true })
  }

  if (canonicalPath !== pathname) {
    navigate(canonicalPath, { replace: true })
  }

  return {
    cityIds,
  }
}
