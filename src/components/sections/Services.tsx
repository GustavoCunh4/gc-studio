'use client'

import { useEffect, useRef } from 'react'
import Tag from '@/components/ui/Tag'

const SERVICES = [
  {
    number: '01',
    title: 'Software sob medida',
    description: 'Dashboards, CRMs, ERPs e plataformas construídos do zero para o seu processo — não adaptações de template.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    number: '02',
    title: 'Automação de processos',
    description: 'Transformamos fluxos manuais repetitivos em sistemas automáticos. Você para de fazer, o sistema começa a fazer.',
    tech: ['n8n', 'Node.js', 'APIs', 'Webhooks'],
  },
  {
    number: '03',
    title: 'IA aplicada ao negócio',
    description: 'Chatbots, extração de dados e análise documental com LLMs. Inteligência que resolve problemas reais.',
    tech: ['Claude API', 'OpenAI', 'Python', 'RAG'],
  },
  {
    number: '04',
    title: 'Consultoria técnica',
    description: 'Para quem já tem time mas precisa de direção. Mapeamos o problema, desenhamos a arquitetura, orientamos.',
    tech: ['Arquitetura', 'Code Review', 'Roadmap'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    section.style.height = `${SERVICES.length * 90 + 100}vh`

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const maxX = track.scrollWidth - window.innerWidth + 96
      track.style.transform = `translateX(-${progress * maxX}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: 'var(--bg-void)' }}
    >
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: 'var(--bg-void)' }}
      >
        {/* Label */}
        <div className="px-8 md:px-16 mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
            Serviços
          </p>
        </div>

        {/* Track */}
        <div className="overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-5 pl-8 md:pl-16 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.number}
                className="flex-none flex flex-col justify-between rounded-2xl p-8 border"
                style={{
                  width: 'min(80vw, 360px)',
                  height: 'min(60vh, 360px)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--line)',
                }}
              >
                <div className="flex flex-col gap-5">
                  <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                    {s.number}
                  </span>
                  <h3
                    className="font-display text-2xl font-500 leading-snug tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {s.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
                  {s.tech.map((t) => (
                    <Tag key={t} className="text-[11px]">{t}</Tag>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div
              className="flex-none flex flex-col items-start justify-end rounded-2xl p-8 border gap-5"
              style={{
                width: 'min(80vw, 280px)',
                height: 'min(60vh, 360px)',
                border: '1px solid var(--line-accent)',
                background: 'rgba(255,102,0,0.04)',
              }}
            >
              <p
                className="font-display text-xl font-500 leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                Não sabe por qual começar?
              </p>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
              >
                Conversar →
              </a>
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="px-8 md:px-16 mt-8">
          <p className="font-mono text-[11px]" style={{ color: 'var(--text-dim)' }}>
            arraste →
          </p>
        </div>
      </div>
    </section>
  )
}
