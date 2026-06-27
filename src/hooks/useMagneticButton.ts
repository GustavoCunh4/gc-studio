'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useMagneticButton<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.35
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const threshold = Math.max(rect.width, rect.height) * 0.9

      if (dist < threshold) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        })
      }
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true,
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
