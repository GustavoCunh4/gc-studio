'use client'

import { useEffect, useRef } from 'react'
import { clamp } from '@/lib/utils'

const LINES = [
  { text: 'Sua equipe gasta horas por semana', accent: false },
  { text: 'em tarefas que um sistema', accent: false },
  { text: 'poderia fazer em segundos.', accent: false },
  { text: '', accent: false },
  { text: 'Planilhas manuais.', accent: true },
  { text: 'Processos sem rastreamento.', accent: true },
  { text: 'Integrações que não conversam.', accent: true },
  { text: 'Relatórios montados à mão.', accent: true },
  { text: '', accent: false },
  { text: 'Isso não é falta de esforço.', accent: false },
  { text: 'É falta do sistema certo.', accent: false },
]

function splitToChars(text: string) {
  return text.split('').map((ch, i) => ({ ch, i }))
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
      const vh = window.innerHeight
      // Progress: 0 when section top hits viewport bottom, 1 when section bottom leaves top
      const progress = clamp((-rect.top + vh * 0.4) / (rect.height * 0.7), 0, 1)
      const revealed = Math.round(progress * total)

      allChars.forEach((span, idx) => {
        if (idx < revealed) {
          span.classList.add('is-visible')
        } else {
          span.classList.remove('is-visible')
        }
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
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: 'var(--bg-void)' }}
    >
      {/* accent line left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--line-accent), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6">
        <div ref={linesRef} className="flex flex-col gap-3">
          {LINES.map((line, lineIdx) => (
            <p
              key={lineIdx}
              className={`font-display leading-tight ${
                line.accent
                  ? 'text-3xl md:text-5xl font-600'
                  : 'text-2xl md:text-4xl font-400'
              } ${!line.text ? 'h-4' : ''}`}
              style={{ color: line.accent ? 'var(--accent)' : 'var(--text-primary)' }}
              aria-label={line.text}
            >
              {line.text &&
                splitToChars(line.text).map(({ ch, i }) => (
                  <span key={i} className="tw-char" aria-hidden="true">
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
