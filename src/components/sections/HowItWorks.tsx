'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Você conta o problema. Mapeamos o processo. Identificamos onde o tempo está sendo perdido.',
  },
  {
    number: '02',
    title: 'Solução técnica',
    description: 'Desenhamos a arquitetura e você aprova. Sem jargão — só o que faz sentido para o negócio.',
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    description: 'Ciclos curtos de 1–2 semanas. Você vê progresso toda semana — não só na entrega final.',
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Sistema em produção com documentação. Suporte contínuo para evoluir com o negócio.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    section.style.height = `${STEPS.length * 90 + 100}vh`

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      setActiveStep(Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="sticky top-0 h-screen flex items-center" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div className="flex flex-col gap-12">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                Como funciona
              </p>
              <h2
                className="font-display font-500 tracking-tight leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--text-primary)' }}
              >
                Do problema ao<br />sistema em produção.
              </h2>
            </div>

            {/* Step list */}
            <div className="flex flex-col gap-1">
              {STEPS.map((step, i) => (
                <button
                  key={step.number}
                  className="flex items-center gap-5 py-4 px-4 rounded-xl text-left transition-all duration-300 group"
                  style={{
                    background: activeStep === i ? 'var(--bg-elevated)' : 'transparent',
                  }}
                  onClick={() => setActiveStep(i)}
                >
                  <span
                    className="font-mono text-xs w-6 flex-shrink-0 transition-colors duration-300"
                    style={{ color: activeStep === i ? 'var(--accent)' : 'var(--text-dim)' }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="font-display font-500 transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
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

          {/* Right — detail */}
          <div className="hidden lg:flex items-center">
            <div
              key={activeStep}
              className="w-full rounded-2xl p-10 border flex flex-col gap-8"
              style={{
                background: 'var(--bg-void)',
                border: '1px solid var(--line)',
                animation: 'fadeSlideUp 0.35s ease forwards',
              }}
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                  Etapa {STEPS[activeStep].number}
                </span>
                <h3
                  className="font-display font-500 tracking-tight leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', color: 'var(--text-primary)' }}
                >
                  {STEPS[activeStep].title}
                </h3>
              </div>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {STEPS[activeStep].description}
              </p>

              {/* Progress dots */}
              <div className="flex gap-2 mt-auto">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: activeStep === i ? 24 : 8,
                      background: activeStep === i ? 'var(--accent)' : 'var(--line-bright)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
