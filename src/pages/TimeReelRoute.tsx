import { Navigate, useLocation } from "react-router-dom"
import { cityMapping } from "../lib/city"
import { HomePage } from "./Home"

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

export function TimeReelRoutePage() {
  const location = useLocation()
  const segments = normalizePathSegments(location.pathname)

  if (segments.length === 0) {
    return <Navigate to="/" replace />
  }

  for (const segment of segments) {
    if (!cityMapping.has(segment)) {
      return <Navigate to="/" replace />
    }
  }

  const uniqueSegments = dedupeCityIds(segments)
  const limitedSegments = uniqueSegments.slice(0, MAX_ROUTE_CITIES)

  if (limitedSegments.length === 0) {
    return <Navigate to="/" replace />
  }

  const canonicalPath = toCanonicalPath(limitedSegments)
  const normalizedPath = toCanonicalPath(segments)

  if (canonicalPath !== normalizedPath) {
    const suffix = `${location.search}${location.hash}`
    return <Navigate to={`${canonicalPath}${suffix}`} replace />
  }

  return <HomePage routeCityIds={limitedSegments} lockCities />
}
