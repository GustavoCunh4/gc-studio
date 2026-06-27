'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.12
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useScrollRevealAll(
  selector: string,
  containerRef: React.RefObject<HTMLElement | null>,
  threshold = 0.1
) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>(selector)
    const observers: IntersectionObserver[] = []

    elements.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.disconnect()
          }
        },
        { threshold }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [selector, containerRef, threshold])
}
