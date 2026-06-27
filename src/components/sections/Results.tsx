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
  role: 'Proprietário — Alpha Clean, Salvador, BA',
}

export default function Results() {
  return (
    <section
      id="results"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Eyebrow */}
        <p
          className="font-mono text-xs tracking-[0.2em] uppercase mb-20"
          style={{ color: 'var(--accent)' }}
        >
          Resultados
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 pb-20 mb-20" style={{ borderBottom: '1px solid var(--line)' }}>
          {STATS.map((s) => (
            <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        {/* Single testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <blockquote className="flex flex-col gap-6">
            <div className="text-4xl" style={{ color: 'var(--accent)', lineHeight: 1 }} aria-hidden="true">
              "
            </div>
            <p
              className="font-display font-400 leading-relaxed"
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              {TESTIMONIAL.quote}
            </p>
            <footer>
              <cite className="not-italic font-display font-500 text-sm" style={{ color: 'var(--text-primary)' }}>
                {TESTIMONIAL.name}
              </cite>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-dim)' }}>
                {TESTIMONIAL.role}
              </p>
            </footer>
          </blockquote>

          {/* CTA */}
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Esses resultados vêm de um processo que começa entendendo a operação do cliente — não o código.
              Cada projeto tem como meta um resultado de negócio mensurável.
            </p>
            <a
              href="#contact"
              className="self-start px-7 py-3.5 rounded-full font-display font-medium text-sm border transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
              style={{ border: '1px solid var(--line-bright)', color: 'var(--text-primary)' }}
            >
              Iniciar diagnóstico →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
