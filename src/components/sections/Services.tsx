import { ArrowRight, Bot, Gauge, Map, Workflow } from 'lucide-react'

const SERVICES = [
  {
    number: '01',
    title: 'Sistemas sob medida',
    description:
      'Construímos exatamente o que o seu negócio precisa - sem sobras, sem adaptações. Painéis de gestão, portais de clientes, sistemas de pedidos, controle de operação. Se você consegue descrever o problema, a gente constrói a solução.',
    highlight: 'Para quem tem um processo que não cabe em nenhum software do mercado.',
    icon: Gauge,
  },
  {
    number: '02',
    title: 'Automação de processos',
    description:
      'Mapeamos tudo que sua equipe faz de forma repetitiva e automatizamos. Relatórios que montam sozinhos, notificações automáticas, integração entre sistemas, fluxos de aprovação. Sua equipe para de perder tempo e começa a focar no que importa.',
    highlight: 'Para quem paga funcionários para fazer trabalho que um computador poderia fazer.',
    icon: Workflow,
  },
  {
    number: '03',
    title: 'Inteligência Artificial aplicada',
    description:
      'IA que resolve problemas reais do seu negócio - atendimento automático com contexto, análise de documentos e contratos, previsão de demanda, extração de dados de PDFs e imagens. Sem hype, com resultado mensurável.',
    highlight: 'Para quem quer usar IA de verdade, não só falar que usa.',
    icon: Bot,
  },
  {
    number: '04',
    title: 'Consultoria e diagnóstico',
    description:
      'Não sabe por onde começar ou precisa de direção antes de investir? Fazemos um mapeamento completo da sua operação, identificamos os gargalos e entregamos um plano claro de como a tecnologia pode te ajudar - sem compromisso de contratar.',
    highlight: 'Para quem quer entender o problema antes de gastar dinheiro na solução.',
    icon: Map,
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="ambient-band section-pad"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container-shell">
        <div className="reveal mb-14 grid gap-6 md:mb-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(260px,0.45fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker mb-4">Serviços</p>
            <h2 className="section-title mb-5">O que fazemos - e o que você ganha com isso.</h2>
            <p className="section-copy">
              Cada serviço é entregue com foco em resultado de negócio, não em tecnologia pela tecnologia.
            </p>
          </div>
          <p className="hidden text-sm leading-relaxed lg:block" style={{ color: 'var(--text-dim)' }}>
            Diagnóstico primeiro, código depois. O objetivo é reduzir desperdício operacional e criar sistemas que a equipe realmente usa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.number}
                className="surface-card interactive-lift reveal-scale group flex min-h-[390px] flex-col overflow-hidden rounded-2xl"
                style={{ transitionDelay: `${index * 75}ms`, background: 'var(--bg-void)' }}
              >
                <div className="flex flex-1 flex-col gap-6 p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-accent"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--line-bright)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-xs font-500"
                      style={{
                        background: 'rgba(255,102,0,0.1)',
                        color: 'var(--accent)',
                        border: '1px solid var(--line-accent)',
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3
                      className="font-display font-500 leading-snug"
                      style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)', color: 'var(--text-primary)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.72 }}>
                      {service.description}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-auto px-7 py-5 md:px-8"
                  style={{ background: 'rgba(255,102,0,0.045)', borderTop: '1px solid var(--line-accent)' }}
                >
                  <p className="text-xs leading-relaxed font-mono" style={{ color: 'var(--accent)', opacity: 0.9 }}>
                    {service.highlight}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="reveal mt-12 flex flex-col items-center gap-4 text-center md:mt-14">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Não sabe qual serviço se encaixa no seu caso? A conversa é gratuita.
          </p>
          <a href="#contact" className="btn-primary">
            Diagnóstico gratuito
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
