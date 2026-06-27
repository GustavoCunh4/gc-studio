'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Você conta o problema. Mapeamos o processo. Identificamos onde o tempo e dinheiro estão sendo perdidos — sem promessas vazias.',
    detail: 'Reunião de 1h → documento de escopo → estimativa honesta.',
  },
  {
    number: '02',
    title: 'Solução técnica',
    description:
      'Desenhamos a arquitetura. Você aprova. Sem jargão — só o que faz sentido para o seu negócio.',
    detail: 'Wireframes ou fluxogramas → revisão → contrato claro.',
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    description:
      'Construímos em ciclos curtos de 1–2 semanas. Você vê progresso real toda semana — não só no final.',
    detail: 'Sprints curtos → demo semanal → ajustes contínuos.',
  },
  {
    number: '04',
    title: 'Entrega e suporte',
    description:
      'Sistema em produção com documentação. Suporte contínuo para evoluir conforme o negócio cresce.',
    detail: 'Deploy → treinamento → canal direto de suporte.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const step = Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1)
      setActiveStep(step)
    }

    section.style.height = `${STEPS.length * 100 + 100}vh`
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative"
      style={{ background: 'var(--bg-void)' }}
    >
      <div
        className="sticky top-0 h-screen flex items-center"
        style={{ background: 'var(--bg-void)' }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: static title + step list */}
          <div className="flex flex-col gap-8">
            <div>
              <p
                className="font-mono text-xs tracking-widest mb-3"
                style={{ color: 'var(--accent)' }}
              >
                // Como trabalhamos
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-500 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Do problema ao sistema em produção.
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {STEPS.map((step, i) => (
                <button
                  key={step.number}
                  className="flex items-center gap-4 py-3 px-4 rounded-xl text-left transition-all duration-300"
                  style={{
                    background: activeStep === i ? 'var(--bg-surface)' : 'transparent',
                    border: `1px solid ${activeStep === i ? 'var(--line-accent)' : 'transparent'}`,
                  }}
                  onClick={() => setActiveStep(i)}
                >
                  <span
                    className="font-mono text-xs w-8 flex-shrink-0"
                    style={{ color: activeStep === i ? 'var(--accent)' : 'var(--text-dim)' }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="font-display font-500 text-sm md:text-base transition-colors duration-300"
                    style={{
                      color: activeStep === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {step.title}
                  </span>
                  {activeStep === i && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: active step detail */}
          <div
            key={activeStep}
            className="rounded-2xl p-8 md:p-10 flex flex-col gap-6 border"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-card)',
              animation: 'fadeSlideUp 0.4s ease forwards',
            }}
          >
            <div className="flex flex-col gap-2">
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: 'var(--accent)' }}
              >
                Etapa {STEPS[activeStep].number}
              </span>
              <h3
                className="font-display text-2xl md:text-3xl font-500 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {STEPS[activeStep].title}
              </h3>
            </div>

            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {STEPS[activeStep].description}
            </p>

            <div
              className="pt-4"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                {STEPS[activeStep].detail}
              </p>
            </div>

            {activeStep === STEPS.length - 1 && (
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-2 self-start px-6 py-3 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
              >
                Iniciar diagnóstico →
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
