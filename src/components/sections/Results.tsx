import Counter from '@/components/ui/Counter'

const STATS = [
  { value: 500, suffix: '+', label: 'horas economizadas por clientes' },
  { value: 12, suffix: '', label: 'sistemas entregues em produção' },
  { value: 90, suffix: '%', label: 'dos clientes voltam para novos projetos' },
  { value: 24, suffix: 'h', label: 'tempo médio de resposta' },
]

const TESTIMONIALS = [
  {
    quote:
      'O Gustavo entregou o sistema em 3 semanas e ele funciona exatamente como eu precisava. Não perco mais tempo com planilha.',
    name: 'Carlos M.',
    role: 'Dono, Alpha Clean',
  },
  {
    quote:
      'Automatizamos todo o processo de relatório semanal. Antes eram 4 horas toda segunda. Agora é automático.',
    name: 'Ana L.',
    role: 'Gerente de Operações',
  },
]

export default function Results() {
  return (
    <section
      id="results"
      className="py-24 md:py-32"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
          >
            // Resultados
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-500 tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Números que importam.
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 pb-20" style={{ borderBottom: '1px solid var(--line)' }}>
          {STATS.map((s) => (
            <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl p-8 flex flex-col gap-6 border"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p
                className="text-base leading-relaxed italic"
                style={{ color: 'var(--text-secondary)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex flex-col gap-1">
                <cite
                  className="font-display font-500 text-sm not-italic"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t.name}
                </cite>
                <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                  {t.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
