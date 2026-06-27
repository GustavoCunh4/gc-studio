'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const LenisProvider = dynamic(
  () => import('@/components/providers/LenisProvider'),
  { ssr: false }
)

function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .reveal-scale, section[id]:not(#hero)')

    targets.forEach((el) => {
      if (el instanceof HTMLElement && el.matches('section[id]:not(#hero)')) {
        el.classList.add('scroll-section')
      }
    })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('is-visible'))
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

    targets.forEach((el) => observer.observe(el))
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
