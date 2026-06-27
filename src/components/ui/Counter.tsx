'use client'

import { useRef, useState, useEffect } from 'react'
import { useCounter } from '@/hooks/useCounter'

interface CounterProps {
  value: number
  suffix?: string
  label: string
}

export default function Counter({ value, suffix = '', label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const count = useCounter(value, 2200, started)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div
        className="text-5xl md:text-6xl font-display font-600 leading-none"
        style={{ color: 'var(--text-primary)' }}
      >
        <span style={{ color: 'var(--accent)' }}>{count}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm text-text-secondary font-body">{label}</p>
    </div>
  )
}
