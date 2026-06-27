import { ArrowRight, Bot, CheckCircle2, Gauge, Map, Workflow } from 'lucide-react'

const SERVICES = [
  {
    number: '01',
    title: 'Organizar sua operação em um sistema',
    plainTitle: 'Quando planilha, papel e WhatsApp já não dão conta.',
    description:
      'Criamos um sistema próprio para centralizar pedidos, clientes, agenda, estoque, financeiro ou qualquer processo importante da sua empresa.',
    deliverables: ['Painel para acompanhar a operação', 'Cadastro e histórico de clientes', 'Relatórios claros para decisão'],
    result: 'Você para de procurar informação em vários lugares e passa a ter controle em uma tela.',
    icon: Gauge,
  },
  {
    number: '02',
    title: 'Automatizar tarefas repetitivas',
    plainTitle: 'Quando sua equipe perde tempo fazendo sempre a mesma coisa.',
    description:
      'Automatizamos relatórios, avisos, cobranças, atualizações de planilha, envio de mensagens e integrações entre ferramentas.',
    deliverables: ['Fluxos automáticos funcionando sozinhos', 'Integração entre sistemas', 'Alertas e relatórios programados'],
    result: 'Você economiza horas por semana e reduz erros causados por trabalho manual.',
    icon: Workflow,
  },
  {
    number: '03',
    title: 'Usar IA de forma prática',
    plainTitle: 'Quando dá para atender, analisar ou decidir mais rápido.',
    description:
      'Aplicamos IA em tarefas úteis: atendimento com contexto, leitura de documentos, extração de dados, triagem de mensagens e apoio à decisão.',
    deliverables: ['Assistentes treinados para sua rotina', 'Leitura de PDFs, imagens e contratos', 'Respostas e análises com contexto'],
    result: 'Você usa IA para resolver trabalho real, não só para parecer moderno.',
    icon: Bot,
  },
  {
    number: '04',
    title: 'Diagnosticar o melhor caminho',
    plainTitle: 'Quando você sabe que precisa melhorar, mas não sabe por onde começar.',
    description:
      'Mapeamos sua operação, identificamos gargalos e entregamos um plano simples do que deve ser automatizado, criado ou melhorado primeiro.',
    deliverables: ['Mapa dos processos atuais', 'Prioridades por impacto e urgência', 'Plano de ação sem jargão técnico'],
    result: 'Você entende onde investir antes de gastar dinheiro construindo qualquer coisa.',
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
            <h2 className="section-title mb-5">O que fazemos, em linguagem simples.</h2>
            <p className="section-copy">
              A entrega pode ser sistema, automação ou IA. O objetivo é sempre o mesmo:
              economizar tempo, reduzir erro e dar mais controle para sua empresa.
            </p>
          </div>
          <p className="hidden text-sm leading-relaxed lg:block" style={{ color: 'var(--text-dim)' }}>
            Primeiro entendemos a rotina. Depois decidimos o que construir. Você não precisa saber tecnologia para começar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.number}
                className="surface-card interactive-lift reveal-scale group flex min-h-[430px] flex-col overflow-hidden rounded-2xl"
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
                      style={{ fontSize: 'clamp(1.18rem, 1.8vw, 1.45rem)', color: 'var(--text-primary)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm font-500 leading-relaxed" style={{ color: 'var(--accent)' }}>
                      {service.plainTitle}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.72 }}>
                      {service.description}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                      Você recebe
                    </p>
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex gap-2 text-sm leading-snug" style={{ color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" aria-hidden="true" style={{ color: 'var(--accent)' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="mt-auto px-7 py-5 md:px-8"
                  style={{ background: 'rgba(255,102,0,0.045)', borderTop: '1px solid var(--line-accent)' }}
                >
                  <p className="text-xs leading-relaxed font-mono" style={{ color: 'var(--accent)', opacity: 0.95 }}>
                    Resultado: {service.result}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="reveal mt-12 flex flex-col items-center gap-4 text-center md:mt-14">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Não sabe qual caminho faz sentido para sua empresa? A primeira conversa é gratuita.
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
