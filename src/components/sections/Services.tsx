'use client'

import { useEffect, useRef } from 'react'
import Tag from '@/components/ui/Tag'

const SERVICES = [
  {
    number: '01',
    title: 'Software sob medida',
    description:
      'Sistemas web completos desenhados para o seu negócio — não adaptações de templates.',
    items: [
      'Dashboards e painéis analíticos',
      'CRMs e ERPs customizados',
      'Marketplaces e plataformas',
      'Integrações entre sistemas',
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    number: '02',
    title: 'Automação de processos',
    description:
      'Transformamos fluxos manuais repetitivos em sistemas automáticos — sem contratar mais pessoas.',
    items: [
      'Integração de APIs e webhooks',
      'Jobs agendados e pipelines',
      'Notificações e relatórios automáticos',
      'Sincronização entre plataformas',
    ],
    tech: ['n8n', 'Node.js', 'Zapier', 'Cron'],
  },
  {
    number: '03',
    title: 'IA aplicada ao negócio',
    description:
      'Inteligência artificial que resolve problemas reais — não experimentos genéricos.',
    items: [
      'Chatbots treinados no seu conteúdo',
      'Processamento de documentos',
      'Análise e extração de dados',
      'Integração com Claude, GPT-4, Gemini',
    ],
    tech: ['Claude API', 'OpenAI', 'LangChain', 'Python'],
  },
  {
    number: '04',
    title: 'Consultoria técnica',
    description:
      'Para quem já tem time mas precisa de direção. Mapeamos, arquitetamos, orientamos.',
    items: [
      'Diagnóstico de processos e gargalos',
      'Arquitetura de sistemas',
      'Code review e boas práticas',
      'Planejamento de roadmap técnico',
    ],
    tech: ['TypeScript', 'AWS', 'Docker', 'Prisma'],
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

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const maxTranslate = track.scrollWidth - window.innerWidth + 48
      track.style.transform = `translateX(-${progress * maxTranslate}px)`
    }

    // Section height = viewport height * number of cards to create scroll space
    section.style.height = `${SERVICES.length * 100}vh`

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ background: 'var(--bg-void)' }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
        style={{ background: 'var(--bg-void)' }}
      >
        {/* Header */}
        <div className="px-6 md:px-12 mb-10">
          <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            // O que fazemos
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-500 tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Serviços
          </h2>
        </div>

        {/* Cards track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6 md:pl-12 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.number}
                className="flex-none w-[min(85vw,420px)] rounded-2xl p-8 flex flex-col gap-6 border"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Number + title */}
                <div className="flex flex-col gap-3">
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: 'var(--accent)' }}
                  >
                    {s.number}
                  </span>
                  <h3
                    className="font-display text-2xl font-500 tracking-tight leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {s.description}
                  </p>
                </div>

                {/* Items */}
                <ul className="flex flex-col gap-2 flex-1">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
                  {s.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ))}

            {/* Final CTA card */}
            <div
              className="flex-none w-[min(85vw,280px)] rounded-2xl p-8 flex flex-col items-start justify-center gap-4 border"
              style={{ border: '1px solid var(--line-accent)', background: 'rgba(255,102,0,0.04)' }}
            >
              <p
                className="font-display text-xl font-500 leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Não sabe por qual começar?
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Me conta o problema. A gente descobre juntos o que faz sentido.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-2 px-6 py-3 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
              >
                Falar sobre o projeto
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="px-6 md:px-12 mt-8">
          <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            ← role para ver todos os serviços
          </p>
        </div>
      </div>
    </section>
  )
}
