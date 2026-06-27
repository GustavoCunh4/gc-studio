'use client'

import { useEffect, useRef, useState } from 'react'

export function useCounter(
  target: number,
  duration = 2000,
  start = false
): number {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, start])

  return count
}
