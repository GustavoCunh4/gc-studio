'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const LenisProvider = dynamic(
  () => import('@/components/providers/LenisProvider'),
  { ssr: false }
)

function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '-8% 0px -8% 0px' }
    )

    const elements = document.querySelectorAll('.reveal, .reveal-scale')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <RevealObserver />
      {children}
    </LenisProvider>
  )
}
