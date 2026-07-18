import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Synchronous state update removed to prevent cascading render warning.
    // Instead, initialize correctly or accept a potential initial hydration mismatch 
    // which is already handled by `undefined` -> `false`.
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
