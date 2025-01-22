import { useEffect, useMemo, useState } from 'react'

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function updateWindowWidth() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', updateWindowWidth)

    return () => {
      window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  const isMobileScreen = useMemo<boolean>(() => {
    return windowWidth <= 768
  }, [windowWidth])

  return {
    isMobileScreen,
  }
}
