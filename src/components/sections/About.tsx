import { Handshake, LineChart, MessageSquare } from 'lucide-react'

const VALUES = [
  {
    icon: Handshake,
    title: 'Parceria real',
    description:
      'Não somos fornecedores que entregam e somem. Trabalhamos lado a lado com o cliente, do diagnóstico à produção - e além.',
  },
  {
    icon: LineChart,
    title: 'Resultado, não tecnologia',
    description:
      'Tecnologia é meio, não fim. Cada decisão técnica é justificada pelo impacto que gera no seu negócio.',
  },
  {
    icon: MessageSquare,
    title: 'Clareza em tudo',
    description:
      'Sem jargão, sem surpresa de prazo, sem escopo oculto. Você sabe exatamente o que está sendo construído e por quê.',
  },
]

const NUMBERS = [
  { value: '100%', label: 'dos projetos com acompanhamento semanal' },
  { value: '24h', label: 'tempo máximo de resposta' },
  { value: '4+', label: 'anos construindo sistemas em produção' },
]

export default function About() {
  return (
    <section
      id="about"
      className="ambient-band section-pad"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container-shell">
        <div className="reveal mb-14 max-w-2xl md:mb-16">
          <p className="section-kicker mb-4">Sobre a GC Studio</p>
          <h2 className="section-title">Nascemos para falar a língua do seu negócio - não da tecnologia.</h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:gap-20">
          <div className="reveal flex flex-col gap-9">
            <div className="flex flex-col gap-5">
              <p className="section-copy">
                A GC Studio nasceu de uma observação simples: muitas empresas têm problemas reais
                que a tecnologia poderia resolver, mas não encontram parceiros que os entendam sem
                precisar falar em código.
              </p>
              <p className="section-copy">
                A maioria dos projetos falha não por falta de tecnologia - falha porque quem desenvolve
                não entende o negócio, e quem tem o negócio não consegue explicar o que precisa.
                Existimos para fechar essa lacuna.
              </p>
            </div>

            <div className="grid grid-cols-1 overflow-hidden rounded-2xl border sm:grid-cols-3" style={{ borderColor: 'var(--line)' }}>
              {NUMBERS.map((item, index) => (
                <div
                  key={item.label}
                  className="flex min-h-[140px] flex-col justify-between gap-3 p-6"
                  style={{
                    borderRight: index < NUMBERS.length - 1 ? '1px solid var(--line)' : 'none',
                    borderBottom: index < NUMBERS.length - 1 ? '1px solid var(--line)' : 'none',
                    background: 'var(--bg-void)',
                  }}
                >
                  <span className="font-display font-500 tracking-tight" style={{ fontSize: 'clamp(1.85rem, 3vw, 2.45rem)', color: 'var(--accent)' }}>
                    {item.value}
                  </span>
                  <span className="text-xs leading-snug" style={{ color: 'var(--text-dim)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-3 self-start rounded-full border px-5 py-3"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-elevated)' }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                Disponível para novos projetos
              </span>
            </div>
          </div>

          <div className="reveal flex flex-col gap-5" style={{ transitionDelay: '120ms' }}>
            <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-dim)' }}>
              Como trabalhamos
            </p>

            <div className="flex flex-col gap-4">
              {VALUES.map((value) => {
                const Icon = value.icon

                return (
                  <article key={value.title} className="surface-card interactive-lift flex gap-5 rounded-2xl p-5 md:p-6">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line-bright)', color: 'var(--accent)' }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-base font-500" style={{ color: 'var(--text-primary)' }}>
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {value.description}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            <a href="#contact" className="btn-primary self-start">
              Falar com a equipe
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
