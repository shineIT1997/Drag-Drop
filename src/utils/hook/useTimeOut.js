import { useRef, useEffect, useCallback } from 'react'

const useTimeOut = (callback, delay) => {
  const timeoutIdRef = useRef(null)

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, delay)
    return clear
  }, [ callback ])

  const clear = useCallback(
    () => {
      const timeoutId = timeoutIdRef.current
      if (timeoutId) {
        timeoutIdRef.current = undefined
        clearTimeout(timeoutId)
      }
    },
    [ timeoutIdRef ]
  )

  useEffect(
    () => {
      timeoutIdRef.current = setTimeout(callback, delay)
      return clear
    },
    [ callback, delay, clear ]
  )

  return clear
}

export default useTimeOut
