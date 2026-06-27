'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      const progress = max > 0 ? (scrollY / max) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[9998] h-[2px] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))',
        width: '0%',
        transition: 'width 0.1s linear',
      }}
      ref={barRef}
      aria-hidden="true"
    />
  )
}
