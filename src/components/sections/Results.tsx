import { ArrowRight, Quote } from 'lucide-react'
import Counter from '@/components/ui/Counter'

const STATS = [
  { value: 500, suffix: '+', label: 'horas economizadas' },
  { value: 12, suffix: '', label: 'sistemas em produção' },
  { value: 90, suffix: '%', label: 'retornam para novos projetos' },
  { value: 24, suffix: 'h', label: 'tempo médio de resposta' },
]

const TESTIMONIAL = {
  quote:
    'O sistema foi entregue em 3 semanas e funciona exatamente como precisávamos. Não perdemos mais tempo com planilha e hoje sabemos em tempo real como está o caixa.',
  name: 'Carlos M.',
  role: 'Proprietário - Alpha Clean, Salvador, BA',
}

export default function Results() {
  return (
    <section
      id="results"
      className="section-pad"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container-shell">
        <div className="reveal mb-12 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-4">Resultados</p>
            <h2 className="section-title max-w-2xl">Impacto que aparece na rotina.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            Métricas simples, acompanhadas desde o diagnóstico até a evolução do sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="surface-card reveal-scale rounded-2xl p-6"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] lg:gap-16">
          <blockquote className="surface-card reveal rounded-2xl p-7 md:p-9">
            <Quote size={34} aria-hidden="true" style={{ color: 'var(--accent)' }} />
            <p
              className="mt-6 font-display font-400 leading-relaxed"
              style={{ fontSize: 'clamp(1.125rem, 2vw, 1.55rem)', color: 'var(--text-primary)' }}
            >
              {TESTIMONIAL.quote}
            </p>
            <footer className="mt-7">
              <cite className="not-italic font-display text-sm font-500" style={{ color: 'var(--text-primary)' }}>
                {TESTIMONIAL.name}
              </cite>
              <p className="mt-1 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                {TESTIMONIAL.role}
              </p>
            </footer>
          </blockquote>

          <div className="reveal flex flex-col gap-5" style={{ transitionDelay: '120ms' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Esses resultados vêm de um processo que começa entendendo a operação do cliente - não o código.
              Cada projeto tem como meta um resultado de negócio mensurável.
            </p>
            <a href="#contact" className="btn-secondary self-start">
              Iniciar diagnóstico
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
