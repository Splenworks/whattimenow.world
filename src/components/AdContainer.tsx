import React, { type PropsWithChildren } from "react"

export const AdContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
