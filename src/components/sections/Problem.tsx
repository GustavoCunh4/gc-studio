const PAINS = [
  {
    icon: '📋',
    title: 'Planilhas que não escalam',
    description:
      'Conforme o negócio cresce, as planilhas ficam maiores, mais lentas e mais propensas a erros. O que era prático vira um risco.',
  },
  {
    icon: '⏳',
    title: 'Tempo jogado fora em tarefas manuais',
    description:
      'Sua equipe gasta horas gerando relatórios, copiando dados entre sistemas e respondendo sempre as mesmas perguntas.',
  },
  {
    icon: '🔍',
    title: 'Sem visibilidade do que acontece',
    description:
      'Você só descobre um problema quando já virou crise. Não há painel, não há dado, não há alerta — só o feeling.',
  },
  {
    icon: '🔗',
    title: 'Sistemas que não se falam',
    description:
      'Seu estoque está num sistema, o financeiro em outro e o atendimento no WhatsApp. Ninguém tem o quadro completo.',
  },
  {
    icon: '📦',
    title: 'Software genérico que não serve',
    description:
      'Você paga por ferramentas que atendem 80% do que precisa e gasta energia tentando adaptar os outros 20%.',
  },
  {
    icon: '🧠',
    title: 'Tudo depende de alguém específico',
    description:
      'Se uma pessoa sai, o processo some com ela. O conhecimento não está documentado, está na cabeça de quem faz.',
  },
]

export default function Problem() {
  return (
    <section
      id="problem"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-void)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Headline */}
        <div className="max-w-2xl mb-16 reveal">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            O problema
          </p>
          <h2
            className="font-display font-500 tracking-tight leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            Crescer com processos manuais tem um teto — e você já deve estar batendo nele.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Não é falta de esforço. É que o negócio cresceu e os processos não acompanharam.
            Abaixo estão os sinais mais comuns de que chegou a hora de mudar isso.
          </p>
        </div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAINS.map((pain, i) => (
            <div
              key={pain.title}
              className="reveal flex flex-col gap-4 p-7 rounded-2xl relative overflow-hidden group"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--line)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Top accent bar — shows on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))',
                  opacity: 0,
                }}
                aria-hidden="true"
              />

              {/* Icon pill */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line-bright)' }}
              >
                {pain.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="font-display font-500 text-base leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {pain.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {pain.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge CTA */}
        <div
          className="reveal mt-12 p-8 md:p-10 rounded-2xl border flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255,102,0,0.06) 0%, rgba(255,102,0,0.02) 100%)',
            border: '1px solid var(--line-accent)',
          }}
        >
          <div className="flex-1">
            <p
              className="font-display font-500 leading-snug mb-2"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-primary)' }}
            >
              Se você se reconheceu em algum desses pontos, existe solução.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              E ela não precisa ser cara nem demorada.
            </p>
          </div>
          <a
            href="#services"
            className="shrink-0 px-6 py-3 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97] whitespace-nowrap"
            style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
          >
            Ver como resolvemos →
          </a>
        </div>
      </div>
    </section>
  )
}
