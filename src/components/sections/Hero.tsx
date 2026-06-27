'use client'

import dynamic from 'next/dynamic'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const HEADLINE_PREFIX = 'Seu negócio no piloto automático, '
const HEADLINE_ACCENT = 'do jeito certo.'
const HEADLINE = `${HEADLINE_PREFIX}${HEADLINE_ACCENT}`

function TypewriterText({
  text,
  offset,
  typedCount,
  color,
}: {
  text: string
  offset: number
  typedCount: number
  color?: string
}) {
  return (
    <>
      {Array.from(text).map((char, index) => {
        const visible = typedCount > offset + index

        return (
          <span
            key={`${char}-${index}`}
            className="typewriter-char"
            style={{ color, opacity: visible ? 1 : 0 }}
            aria-hidden="true"
          >
            {char}
          </span>
        )
      })}
    </>
  )
}

function TypewriterHeadline() {
  const [typedCount, setTypedCount] = useState(0)

  useEffect(() => {
    const total = HEADLINE.length

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = requestAnimationFrame(() => setTypedCount(total))
      return () => cancelAnimationFrame(frame)
    }

    let index = 0
    let interval = 0
    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1
        setTypedCount(Math.min(index, total))

        if (index >= total) {
          window.clearInterval(interval)
        }
      }, 42)
    }, 260)

    return () => {
      window.clearTimeout(startDelay)
      window.clearInterval(interval)
    }
  }, [])

  return (
    <h1
      className="font-display font-500 tracking-tight"
      aria-label={HEADLINE}
      style={{
        fontSize: 'clamp(2.65rem, 7vw, 5.6rem)',
        lineHeight: 0.98,
        color: 'var(--text-primary)',
      }}
    >
      <TypewriterText text={HEADLINE_PREFIX} offset={0} typedCount={typedCount} />
      <TypewriterText
        text={HEADLINE_ACCENT}
        offset={HEADLINE_PREFIX.length}
        typedCount={typedCount}
        color="var(--accent)"
      />
      <span
        className="typewriter-caret"
        aria-hidden="true"
        style={{ opacity: typedCount < HEADLINE.length ? 1 : 0 }}
      />
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
