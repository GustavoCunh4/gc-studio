import { Boxes, Brain, ClipboardList, Clock3, Link2Off, Search } from 'lucide-react'

const PAINS = [
  {
    icon: ClipboardList,
    title: 'Planilhas que não escalam',
    description:
      'Conforme o negócio cresce, as planilhas ficam maiores, mais lentas e mais propensas a erros. O que era prático vira um risco.',
  },
  {
    icon: Clock3,
    title: 'Tempo jogado fora em tarefas manuais',
    description:
      'Sua equipe gasta horas gerando relatórios, copiando dados entre sistemas e respondendo sempre as mesmas perguntas.',
  },
  {
    icon: Search,
    title: 'Sem visibilidade do que acontece',
    description:
      'Você só descobre um problema quando já virou crise. Não há painel, não há dado, não há alerta - só o feeling.',
  },
  {
    icon: Link2Off,
    title: 'Sistemas que não se falam',
    description:
      'Seu estoque está num sistema, o financeiro em outro e o atendimento no WhatsApp. Ninguém tem o quadro completo.',
  },
  {
    icon: Boxes,
    title: 'Software genérico que não serve',
    description:
      'Você paga por ferramentas que atendem 80% do que precisa e gasta energia tentando adaptar os outros 20%.',
  },
  {
    icon: Brain,
    title: 'Tudo depende de alguém específico',
    description:
      'Se uma pessoa sai, o processo some com ela. O conhecimento não está documentado, está na cabeça de quem faz.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="section-pad" style={{ background: 'var(--bg-void)' }}>
      <div className="container-shell">
        <div className="reveal mb-14 max-w-2xl md:mb-16">
          <p className="section-kicker mb-4">O problema</p>
          <h2 className="section-title mb-6">
            Crescer com processos manuais tem um teto - e você já deve estar batendo nele.
          </h2>
          <p className="section-copy">
            Não é falta de esforço. É que o negócio cresceu e os processos não acompanharam.
            Abaixo estão os sinais mais comuns de que chegou a hora de mudar isso.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((pain, index) => {
            const Icon = pain.icon

            return (
              <article
                key={pain.title}
                className="surface-card interactive-lift reveal-scale group flex min-h-[260px] flex-col gap-5 rounded-2xl p-6 md:p-7"
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-accent"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--line-bright)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-display text-base font-500 leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {pain.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {pain.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className="reveal mt-10 flex flex-col items-start gap-6 rounded-2xl border p-7 md:mt-12 md:flex-row md:items-center md:p-9"
          style={{
            background: 'linear-gradient(135deg, rgba(255,102,0,0.08) 0%, rgba(255,102,0,0.025) 100%)',
            border: '1px solid var(--line-accent)',
          }}
        >
          <div className="flex-1">
            <p
              className="font-display font-500 leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-primary)' }}
            >
              Se você se reconheceu em algum desses pontos, existe solução.
            </p>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              E ela não precisa ser cara nem demorada.
            </p>
          </div>
          <a href="#services" className="btn-primary shrink-0">
            Ver como resolvemos
          </a>
        </div>
      </div>
    </section>
  )
}
