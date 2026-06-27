const SERVICES = [
  {
    number: '01',
    title: 'Sistemas sob medida',
    description:
      'Construímos exatamente o que o seu negócio precisa — sem sobras, sem adaptações. Painéis de gestão, portais de clientes, sistemas de pedidos, controle de operação. Se você consegue descrever o problema, a gente constrói a solução.',
    highlight: 'Para quem tem um processo que não cabe em nenhum software do mercado.',
    icon: '⚙️',
  },
  {
    number: '02',
    title: 'Automação de processos',
    description:
      'Mapeamos tudo que sua equipe faz de forma repetitiva e automatizamos. Relatórios que montam sozinhos, notificações automáticas, integração entre sistemas, fluxos de aprovação. Sua equipe para de perder tempo e começa a focar no que importa.',
    highlight: 'Para quem paga funcionários para fazer trabalho que um computador poderia fazer.',
    icon: '⚡',
  },
  {
    number: '03',
    title: 'Inteligência Artificial aplicada',
    description:
      'IA que resolve problemas reais do seu negócio — atendimento automático com contexto, análise de documentos e contratos, previsão de demanda, extração de dados de PDFs e imagens. Sem hype, com resultado mensurável.',
    highlight: 'Para quem quer usar IA de verdade, não só falar que usa.',
    icon: '🤖',
  },
  {
    number: '04',
    title: 'Consultoria e diagnóstico',
    description:
      'Não sabe por onde começar ou precisa de direção antes de investir? Fazemos um mapeamento completo da sua operação, identificamos os gargalos e entregamos um plano claro de como a tecnologia pode te ajudar — sem compromisso de contratar.',
    highlight: 'Para quem quer entender o problema antes de gastar dinheiro na solução.',
    icon: '🗺️',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16 reveal">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Serviços
          </p>
          <h2
            className="font-display font-500 tracking-tight leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            O que fazemos — e o que você ganha com isso.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Cada serviço é entregue com foco em resultado de negócio, não em tecnologia pela tecnologia.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.number}
              className="reveal flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'var(--bg-void)',
                border: '1px solid var(--line)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Card body */}
              <div className="flex flex-col gap-5 p-8 flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line-bright)' }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className="font-mono text-xs font-500 px-2.5 py-1 rounded-full shrink-0"
                    style={{
                      background: 'rgba(255,102,0,0.1)',
                      color: 'var(--accent)',
                      border: '1px solid var(--line-accent)',
                    }}
                  >
                    {s.number}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    className="font-display font-500 leading-snug tracking-tight"
                    style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.375rem)', color: 'var(--text-primary)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Highlight footer */}
              <div
                className="px-8 py-4 mt-auto"
                style={{
                  background: 'rgba(255,102,0,0.04)',
                  borderTop: '1px solid var(--line-accent)',
                }}
              >
                <p
                  className="text-xs leading-relaxed font-mono"
                  style={{ color: 'var(--accent)', opacity: 0.85 }}
                >
                  ↳ {s.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Não sabe qual serviço se encaixa no seu caso? A conversa é gratuita.
          </p>
          <a
            href="#contact"
            className="inline-flex px-8 py-3.5 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
          >
            Diagnóstico gratuito →
          </a>
        </div>
      </div>
    </section>
  )
}
