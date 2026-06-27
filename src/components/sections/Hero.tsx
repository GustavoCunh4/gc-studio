'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ;[headlineRef, subRef, ctaRef].forEach((r) => {
        if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none' }
      })
      return
    }

    const els = [headlineRef.current, subRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + i * 180)
    })
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
      style={{ background: 'var(--bg-void)' }}
    >
      <HeroCanvas />

      {/* Glow central */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 50% 65%, rgba(255,102,0,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-500 tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Seu negócio no piloto automático,{' '}
          <span style={{ color: 'var(--accent)' }}>do jeito certo.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{
            color: 'var(--text-secondary)',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Desenvolvemos sistemas, automações e inteligência artificial para empresas que querem crescer
          sem depender de processos manuais, planilhas e retrabalho.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-3"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3.5 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
          >
            Diagnóstico gratuito
          </a>
          <a
            href="#cases"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#cases')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3.5 rounded-full font-display text-sm border transition-all duration-200 hover:border-accent hover:text-accent"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--line-bright)' }}
          >
            Ver projetos →
          </a>
        </div>

        {/* Trust micro-line */}
        <p
          className="text-xs font-mono"
          style={{ color: 'var(--text-dim)', opacity: 0, animation: 'none' }}
          ref={(el) => {
            if (el) setTimeout(() => { el.style.transition = 'opacity 1s ease'; el.style.opacity = '1' }, 1200)
          }}
        >
          Sem compromisso. Sem jargão técnico. Só uma conversa.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
