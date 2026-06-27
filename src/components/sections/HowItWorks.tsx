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
    description: 'Desenhamos a arquitetura e você aprova. Sem jargão - só o que faz sentido para o negócio.',
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    description: 'Ciclos curtos de 1 a 2 semanas. Você vê progresso toda semana - não só na entrega final.',
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
  const [isPinned, setIsPinned] = useState(false)

  const scrollToStep = (index: number, button?: HTMLButtonElement) => {
    setActiveStep(index)

    const section = sectionRef.current
    if (!section) return

    const shouldPin = window.matchMedia('(min-width: 1024px)').matches

    if (!shouldPin) {
      button?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 0)
    const progress = STEPS.length > 1 ? index / (STEPS.length - 1) : 0
    const targetTop = section.offsetTop + scrollableDistance * progress

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const applyLayout = () => {
      const shouldPin = window.matchMedia('(min-width: 1024px)').matches
      setIsPinned(shouldPin)
      section.style.height = shouldPin ? `${STEPS.length * 82 + 92}vh` : 'auto'
    }

    const onScroll = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return

      const rect = section.getBoundingClientRect()
      const available = rect.height - window.innerHeight
      const progress = available > 0 ? Math.max(0, Math.min(1, -rect.top / available)) : 0
      setActiveStep(Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1))
    }

    applyLayout()
    onScroll()
    window.addEventListener('resize', applyLayout)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      section.style.height = 'auto'
      window.removeEventListener('resize', applyLayout)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={isPinned ? '' : 'section-pad'}
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center" style={{ background: 'var(--bg-surface)' }}>
        <div className="container-shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.65fr)] lg:gap-20">
          <div className="flex flex-col gap-9 lg:gap-12">
            <div className="reveal">
              <p className="section-kicker mb-4">Como funciona</p>
              <h2
                className="section-title max-w-xl"
                style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.1rem)' }}
              >
                Do problema ao sistema em produção.
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {STEPS.map((step, index) => {
                const selected = activeStep === index

                return (
                  <button
                    key={step.number}
                    type="button"
                    className="interactive-lift rounded-2xl border p-4 text-left"
                    style={{
                      background: selected ? 'var(--bg-elevated)' : 'transparent',
                      borderColor: selected ? 'var(--line-accent)' : 'transparent',
                    }}
                    onClick={(event) => scrollToStep(index, event.currentTarget)}
                  >
                    <span className="flex items-center gap-5">
                      <span
                        className="w-8 shrink-0 font-mono text-xs transition-colors duration-300"
                        style={{ color: selected ? 'var(--accent)' : 'var(--text-dim)' }}
                      >
                        {step.number}
                      </span>
                      <span
                        className="font-display font-500 transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                          color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                        }}
                      >
                        {step.title}
                      </span>
                      <span
                        className="ml-auto h-2 w-2 shrink-0 rounded-full transition-all duration-300"
                        style={{
                          background: selected ? 'var(--accent)' : 'var(--line-bright)',
                          transform: selected ? 'scale(1)' : 'scale(0.65)',
                        }}
                      />
                    </span>

                    <span
                      className="mt-3 block pl-[3.25rem] text-sm leading-relaxed lg:hidden"
                      style={{ color: selected ? 'var(--text-secondary)' : 'var(--text-dim)' }}
                    >
                      {step.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="hidden items-center lg:flex">
            <div
              key={activeStep}
              className="surface-card w-full rounded-2xl p-9"
              style={{
                background: 'var(--bg-void)',
                animation: 'fadeSlideUp 0.38s var(--ease-out) forwards',
              }}
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                  Etapa {STEPS[activeStep].number}
                </span>
                <h3
                  className="font-display font-500 tracking-tight leading-tight"
                  style={{ fontSize: 'clamp(1.55rem, 2.5vw, 2.35rem)', color: 'var(--text-primary)' }}
                >
                  {STEPS[activeStep].title}
                </h3>
              </div>

              <p className="mt-7 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {STEPS[activeStep].description}
              </p>

              <div className="mt-10 flex gap-2">
                {STEPS.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: activeStep === index ? 30 : 10,
                      background: activeStep === index ? 'var(--accent)' : 'var(--line-bright)',
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
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
