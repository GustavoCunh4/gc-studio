'use client'

import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'
import { registerGSAP } from '@/lib/gsap'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    registerGSAP()
    initLenis()
    return () => destroyLenis()
  }, [])

  return <>{children}</>
}
