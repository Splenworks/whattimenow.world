import { useEffect } from "react"

export const useScrollRestoration = (mode: ScrollRestoration = "manual") => {
  useEffect(() => {
    if (!("scrollRestoration" in history)) return
    const previous = history.scrollRestoration
    history.scrollRestoration = mode
    return () => {
      history.scrollRestoration = previous
    }
  }, [mode])
}
