'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/lenis'

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
  const stickyRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    registerGSAP()

    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // ScrollTrigger reads position via the GSAP ticker, which Lenis drives.
      // This ensures progress updates correctly with smooth scroll active.
      const trigger = ScrollTrigger.create({
        trigger: section,
        pin: section,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${STEPS.length * window.innerHeight}`,
        onUpdate: (self) => {
          setActiveStep(
            Math.min(Math.floor(self.progress * STEPS.length), STEPS.length - 1)
          )
        },
      })

      return () => trigger.kill()
    })

    return () => mm.revert()
  }, [])

  const scrollToStep = (index: number) => {
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      setActiveStep(index)
      return
    }

    const trigger = ScrollTrigger.getAll().find(
      (t) => t.vars.trigger === sectionRef.current
    )
    if (!trigger) {
      setActiveStep(index)
      return
    }

    const start = trigger.start as number
    const end = trigger.end as number
    const target = start + (index / STEPS.length) * (end - start)

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 })
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div
        ref={stickyRef}
        className="section-pad lg:p-0 lg:h-screen lg:flex lg:items-center"
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="container-shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.65fr)] lg:gap-20">

          {/* Left: steps list */}
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
                    onClick={() => scrollToStep(index)}
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

                    {/* Mobile: description inline */}
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

          {/* Right: detail card (desktop only) */}
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
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
