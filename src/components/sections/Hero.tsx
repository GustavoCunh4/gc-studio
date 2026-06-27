'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { buildDirectWhatsAppLink } from '@/lib/whatsapp'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const HEADLINE_LINES = ['Transformamos operações', 'em sistemas inteligentes.']
const EYEBROW = '// GC Studio — Software que trabalha por você'

export default function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show everything immediately
      ;[eyebrowRef, line1Ref, line2Ref, subtitleRef, ctaRef].forEach((r) => {
        if (r.current) r.current.style.opacity = '1'
      })
      return
    }

    const typeText = (el: HTMLElement | null, text: string, delay: number, onDone?: () => void) => {
      if (!el) return
      el.textContent = ''
      let i = 0
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          if (i < text.length) {
            el.textContent += text[i]
            i++
          } else {
            clearInterval(interval)
            onDone?.()
          }
        }, 28)
      }, delay)
      return () => { clearTimeout(timer) }
    }

    const cleanups: ((() => void) | undefined)[] = []

    const c1 = typeText(eyebrowRef.current, EYEBROW, 200, () => {
      const c2 = typeText(line1Ref.current, HEADLINE_LINES[0], 0, () => {
        const c3 = typeText(line2Ref.current, HEADLINE_LINES[1], 100, () => {
          if (subtitleRef.current) {
            subtitleRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
            subtitleRef.current.style.opacity = '1'
            subtitleRef.current.style.transform = 'translateY(0)'
          }
          setTimeout(() => {
            if (ctaRef.current) {
              ctaRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
              ctaRef.current.style.opacity = '1'
              ctaRef.current.style.transform = 'translateY(0)'
            }
          }, 300)
        })
        cleanups.push(c3)
      })
      cleanups.push(c2)
    })
    cleanups.push(c1)

    return () => cleanups.forEach((c) => c?.())
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ background: 'var(--bg-void)' }}
    >
      {/* Canvas background */}
      <HeroCanvas />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(255,102,0,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="font-mono text-xs md:text-sm tracking-widest"
          style={{ color: 'var(--accent)', minHeight: '1.2em', display: 'block' }}
          aria-label={EYEBROW}
        />

        {/* H1 */}
        <h1 className="flex flex-col items-center gap-1">
          <span
            ref={line1Ref}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-500 tracking-tight leading-none"
            style={{ color: 'var(--text-primary)', minHeight: '1.1em', display: 'block' }}
          />
          <span
            ref={line2Ref}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-500 tracking-tight leading-none"
            style={{ color: 'var(--accent)', minHeight: '1.1em', display: 'block' }}
          />
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xl text-base md:text-lg leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            opacity: 0,
            transform: 'translateY(16px)',
          }}
        >
          Desenvolvemos software, automações e IA aplicada para empresas que precisam de mais do
          que uma landing page.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'var(--accent)',
              color: 'var(--text-inverse)',
            }}
          >
            Ver o que fazemos
          </a>
          <a
            href={buildDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full font-display font-medium text-sm border transition-all duration-200 hover:border-accent hover:text-accent active:scale-95"
            style={{
              border: '1px solid var(--line-bright)',
              color: 'var(--text-primary)',
            }}
          >
            Falar com Gustavo ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-dim)' }}>
            scroll
          </span>
          <div
            className="w-px h-12"
            style={{
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
