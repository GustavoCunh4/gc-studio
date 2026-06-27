'use client'

import Lenis from 'lenis'
import { gsap } from 'gsap'

let lenis: Lenis | null = null

export function initLenis(): Lenis | undefined {
  if (typeof window === 'undefined') return undefined

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  })

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}

export function getLenis() {
  return lenis
}
