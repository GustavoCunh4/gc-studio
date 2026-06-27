'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const LenisProvider = dynamic(
  () => import('@/components/providers/LenisProvider'),
  { ssr: false }
)

function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
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
