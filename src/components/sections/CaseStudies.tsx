import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Tag from '@/components/ui/Tag'
import { type CaseStudy } from '@/types'

const CASES: CaseStudy[] = [
  {
    id: 'alpha-clean',
    client: 'Alpha Clean',
    title: 'Sistema de Gestão para Lava-Rápido',
    problem:
      'Agendamentos via WhatsApp sem controle, caixa anotado em papel, impossível saber a receita do dia sem somar tudo à mão.',
    solution:
      'Sistema web completo com agendamento online, PDV para registro de serviços, controle de caixa e dashboard de relatórios diários.',
    result:
      '40% menos tempo no atendimento. 100% dos agendamentos rastreados. Dono sabe o faturamento do dia em tempo real.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    image: '/cases/alpha-clean.jpg',
    reverse: false,
  },
  {
    id: 'relatorio-auto',
    client: 'Empresa de Logística',
    title: 'Automação de Relatórios Semanais',
    problem:
      'Equipe gastava 4 horas toda segunda-feira compilando dados de 3 sistemas diferentes em uma planilha para o gestor.',
    solution:
      'Pipeline automático que coleta dados das APIs dos sistemas, consolida e envia o relatório por email toda segunda às 07h.',
    result:
      '4 horas economizadas toda semana. Relatório mais preciso, sem erros manuais. Equipe focada em trabalho que importa.',
    stack: ['Node.js', 'n8n', 'PostgreSQL', 'Resend', 'AWS Lambda'],
    image: '/cases/logistica.jpg',
    reverse: true,
  },
]

interface CaseCardProps {
  case_: CaseStudy
}

function ProductMockup({ client, reverse }: { client: string; reverse?: boolean }) {
  const bars = reverse ? ['74%', '46%', '88%'] : ['62%', '84%', '38%']

  return (
    <div
      className="surface-card interactive-lift rounded-2xl p-4 md:p-5"
      style={{ background: 'var(--bg-elevated)' }}
      aria-label={`Prévia visual do projeto ${client}`}
    >
      <div className="rounded-xl border p-4" style={{ borderColor: 'var(--line)', background: 'var(--bg-void)' }}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-dim)' }}>
              Dashboard
            </p>
            <p className="mt-1 font-display text-sm font-500" style={{ color: 'var(--text-primary)' }}>
              {client}
            </p>
          </div>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px]"
            style={{ color: 'var(--accent)', background: 'rgba(255,102,0,0.1)', border: '1px solid var(--line-accent)' }}
          >
            Live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {['Hoje', 'Semana', 'Mês'].map((label, index) => (
            <div key={label} className="rounded-lg border p-3" style={{ borderColor: 'var(--line)', background: 'rgba(255,255,255,0.025)' }}>
              <p className="font-mono text-[10px]" style={{ color: 'var(--text-dim)' }}>
                {label}
              </p>
              <p className="mt-2 font-display text-lg font-500" style={{ color: index === 1 ? 'var(--accent)' : 'var(--text-primary)' }}>
                {index === 0 ? '18' : index === 1 ? '+40%' : '97%'}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {bars.map((width, index) => (
            <div key={width} className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--bg-elevated)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width,
                    background: index === 1 ? 'var(--accent)' : 'var(--line-bright)',
                  }}
                />
              </div>
              <CheckCircle2 size={14} aria-hidden="true" style={{ color: index === 1 ? 'var(--accent)' : 'var(--text-dim)' }} />
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-[1fr_0.7fr] gap-3">
          <div className="h-24 rounded-lg border" style={{ borderColor: 'var(--line)', background: 'linear-gradient(135deg, rgba(255,102,0,0.16), rgba(255,255,255,0.03))' }} />
          <div className="flex flex-col gap-3">
            <div className="h-10 rounded-lg" style={{ background: 'rgba(255,255,255,0.045)' }} />
            <div className="h-10 rounded-lg" style={{ background: 'rgba(255,102,0,0.09)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function CaseCard({ case_: c }: CaseCardProps) {
  return (
    <article className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 ${c.reverse ? 'lg:[direction:rtl]' : ''}`}>
      <div style={{ direction: 'ltr' }}>
        <ProductMockup client={c.client} reverse={c.reverse} />
      </div>

      <div className="flex flex-col gap-6" style={{ direction: 'ltr' }}>
        <div className="flex flex-col gap-2">
          <span className="section-kicker">{c.client}</span>
          <h3 className="font-display text-2xl font-500 leading-tight tracking-tight md:text-3xl" style={{ color: 'var(--text-primary)' }}>
            {c.title}
          </h3>
        </div>

        <div className="grid gap-4">
          {[
            ['Problema', c.problem],
            ['Solução', c.solution],
          ].map(([label, text]) => (
            <div key={label}>
              <p className="mb-1 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                {label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {text}
              </p>
            </div>
          ))}

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,102,0,0.07)', border: '1px solid var(--line-accent)' }}>
            <p className="mb-1 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Resultado
            </p>
            <p className="text-sm font-500 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {c.result}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {c.stack.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  return (
    <section
      id="cases"
      className="section-pad-tight"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container-shell">
        <div className="reveal mb-14 max-w-2xl md:mb-16">
          <p className="section-kicker mb-4">Projetos</p>
          <h2 className="section-title">O que já construímos.</h2>
        </div>

        <div className="flex flex-col gap-20 md:gap-24">
          {CASES.map((c) => (
            <CaseCard key={c.id} case_={c} />
          ))}
        </div>

        <div className="reveal mt-16 flex flex-col items-center gap-5 text-center md:mt-20">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Tem um projeto em mente? A primeira conversa é gratuita.
          </p>
          <a href="#contact" className="btn-secondary">
            Iniciar conversa
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
