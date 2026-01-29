import type { PropsWithChildren } from "react"
import { useLocation, Navigate } from "react-router-dom"

export const LowercaseUrlGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()

  const lowerPath = location.pathname.toLowerCase()

  if (location.pathname !== lowerPath) {
    return (
      <Navigate
        to={{
          pathname: lowerPath,
          search: location.search,
          hash: location.hash,
        }}
        replace
      />
    )
  }

  return <>{children}</>
}
