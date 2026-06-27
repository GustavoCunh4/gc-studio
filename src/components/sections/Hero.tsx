'use client'

import dynamic from 'next/dynamic'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const HEADLINE_PREFIX = 'Seu negócio no piloto automático, '
const HEADLINE_ACCENT = 'do jeito certo.'
const HEADLINE = `${HEADLINE_PREFIX}${HEADLINE_ACCENT}`

function TypewriterHeadline() {
  const [typedCount, setTypedCount] = useState(0)
  const typedText = HEADLINE.slice(0, typedCount)
  const typedPrefix = typedText.slice(0, Math.min(typedText.length, HEADLINE_PREFIX.length))
  const typedAccent = typedText.slice(HEADLINE_PREFIX.length)

  useEffect(() => {
    const total = HEADLINE.length
    let hasStarted = false
    let frame = 0
    let interval = 0
    let startDelay = 0

    const startTyping = () => {
      if (hasStarted) return
      hasStarted = true

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        frame = requestAnimationFrame(() => setTypedCount(total))
        return
      }

      let index = 0
      startDelay = window.setTimeout(() => {
        interval = window.setInterval(() => {
          index += 1
          setTypedCount(Math.min(index, total))

          if (index >= total) {
            window.clearInterval(interval)
          }
        }, 42)
      }, 260)
    }

    if (document.documentElement.dataset.introComplete === 'true' || !document.querySelector('.intro-loader')) {
      startTyping()
    } else {
      window.addEventListener('gc:intro-complete', startTyping, { once: true })
    }

    return () => {
      window.removeEventListener('gc:intro-complete', startTyping)
      cancelAnimationFrame(frame)
      window.clearTimeout(startDelay)
      window.clearInterval(interval)
    }
  }, [])

  return (
    <h1
      className="typewriter-headline font-display font-500 tracking-tight"
      aria-label={HEADLINE}
      style={{
        fontSize: 'clamp(2.65rem, 7vw, 5.6rem)',
        lineHeight: 0.98,
        color: 'var(--text-primary)',
      }}
    >
      <span className="typewriter-measure" aria-hidden="true">
        {HEADLINE_PREFIX}
        <span style={{ color: 'var(--accent)' }}>{HEADLINE_ACCENT}</span>
      </span>
      <span className="typewriter-live" aria-hidden="true">
        {typedPrefix}
        {typedAccent && <span style={{ color: 'var(--accent)' }}>{typedAccent}</span>}
        <span
          className="typewriter-caret"
          style={{ opacity: typedCount < HEADLINE.length ? 1 : 0 }}
        />
      </span>
    </h1>
  )
}

export default function Hero() {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="ambient-band relative flex min-h-[92svh] items-center overflow-hidden px-0 pb-16 pt-28 sm:pt-32"
      style={{ background: 'var(--bg-void)' }}
    >
      <HeroCanvas />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-void))' }}
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-mono"
            style={{
              borderColor: 'var(--line-accent)',
              background: 'rgba(255,102,0,0.06)',
              color: 'var(--accent)',
              animation: 'hero-lift 700ms var(--ease-out) both',
            }}
          >
            <Sparkles size={14} aria-hidden="true" />
            Automação, sistemas e IA aplicada
          </div>

          <TypewriterHeadline />

          <p
            className="mt-7 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl"
            style={{
              color: '#c8c2bd',
              animation: 'hero-lift 800ms var(--ease-out) 150ms both',
            }}
          >
            Desenvolvemos sistemas, automações e inteligência artificial para empresas que querem crescer
            sem depender de processos manuais, planilhas e retrabalho.
          </p>

          <div
            className="relative z-10 mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            style={{ animation: 'hero-lift 800ms var(--ease-out) 220ms both' }}
          >
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('#contact')
              }}
              className="btn-primary"
            >
              Diagnóstico gratuito
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#cases"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('#cases')
              }}
              className="btn-secondary"
            >
              Ver projetos
            </a>
          </div>

          <div className="relative z-0 mt-14 grid w-full max-w-2xl grid-cols-1 gap-2 text-left sm:grid-cols-3">
            {['Sem compromisso', 'Sem jargão técnico', 'Plano claro de ação'].map((item) => (
              <div
                key={item}
                className="rounded-full border px-4 py-2 text-center text-xs font-mono"
                style={{ borderColor: 'var(--line)', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.02)' }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <div
          className="h-11 w-px"
          style={{
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
