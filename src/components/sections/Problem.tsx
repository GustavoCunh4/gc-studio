'use client'

import { useEffect, useRef } from 'react'
import { clamp } from '@/lib/utils'

const LINES = [
  { text: 'Planilhas manuais.', accent: true },
  { text: 'Relatórios montados à mão.', accent: true },
  { text: 'Processos sem rastreamento.', accent: true },
  { text: '', accent: false },
  { text: 'Não é falta de esforço.', accent: false },
  { text: 'É falta do sistema certo.', accent: false },
]

function splitToChars(text: string, accent: boolean) {
  return text.split('').map((ch, i) => (
    <span
      key={i}
      className="tw-char"
      style={{ color: accent ? 'var(--accent)' : 'var(--text-primary)' }}
      aria-hidden="true"
    >
      {ch}
    </span>
  ))
}

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      linesRef.current?.querySelectorAll<HTMLSpanElement>('.tw-char').forEach((s) => {
        s.classList.add('is-visible')
      })
      return
    }

    const section = sectionRef.current
    const container = linesRef.current
    if (!section || !container) return

    const allChars = Array.from(container.querySelectorAll<HTMLSpanElement>('.tw-char'))
    const total = allChars.length

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = clamp((-rect.top + window.innerHeight * 0.3) / (rect.height * 0.65), 0, 1)
      const revealed = Math.round(progress * total)
      allChars.forEach((span, idx) => {
        idx < revealed ? span.classList.add('is-visible') : span.classList.remove('is-visible')
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-40 md:py-56"
      style={{ background: 'var(--bg-void)' }}
      aria-label="O problema que resolvemos"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div ref={linesRef} className="flex flex-col" style={{ gap: 'clamp(12px, 2.5vw, 24px)' }}>
          {LINES.map((line, i) =>
            line.text ? (
              <p
                key={i}
                className="font-display font-500 leading-none"
                style={{
                  fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
                  letterSpacing: '-0.02em',
                }}
                aria-label={line.text}
              >
                {splitToChars(line.text, line.accent)}
              </p>
            ) : (
              <div key={i} style={{ height: 'clamp(16px, 2vw, 32px)' }} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
