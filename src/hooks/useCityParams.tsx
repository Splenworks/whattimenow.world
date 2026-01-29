import { useLocation, useNavigate } from "react-router-dom"
import { cityMapping } from "../lib/city"

const MAX_ROUTE_CITIES = 3

const toCanonicalPath = (cityIds: string[]) => `/${cityIds.join("/")}`

const normalizePathSegments = (pathname: string) =>
  pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment).trim().toLowerCase())
    .filter(Boolean)

const dedupeCityIds = (cityIds: string[]) => {
  const seen = new Set<string>()
  const unique: string[] = []

  for (const id of cityIds) {
    if (seen.has(id)) continue
    seen.add(id)
    unique.push(id)
  }

  return unique
}

export const useCityParams = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const segments = normalizePathSegments(location.pathname)
  const hasInvalidSegment = segments.some((segment) => !cityMapping.has(segment))
  const uniqueSegments = dedupeCityIds(segments)
  const limitedSegments = uniqueSegments.slice(0, MAX_ROUTE_CITIES)
  const canonicalPath = toCanonicalPath(limitedSegments)
  const normalizedPath = toCanonicalPath(segments)
  const suffix = `${location.search}${location.hash}`

  if (segments.length === 0 || hasInvalidSegment || limitedSegments.length === 0) {
    navigate("/", { replace: true })
  }

  if (canonicalPath !== normalizedPath) {
    navigate(`${canonicalPath}${suffix}`, { replace: true })
  }

  return {
    cityIds: limitedSegments,
  }
}
