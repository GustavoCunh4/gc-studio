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

function CaseCard({ case_: c }: CaseCardProps) {
  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        c.reverse ? 'lg:[direction:rtl]' : ''
      }`}
    >
      {/* Visual placeholder */}
      <div
        className="rounded-2xl aspect-4/3 flex items-center justify-center border"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--line)',
          direction: 'ltr',
        }}
      >
        <div className="flex flex-col items-center gap-3 opacity-30">
          <div
            className="w-16 h-16 rounded-xl"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-warm))' }}
          />
          <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            {c.client}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6" style={{ direction: 'ltr' }}>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
            {c.client}
          </span>
          <h3
            className="font-display text-2xl md:text-3xl font-500 tracking-tight leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {c.title}
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-dim)' }}>
              Problema
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {c.problem}
            </p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-dim)' }}>
              Solução
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {c.solution}
            </p>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,102,0,0.06)', border: '1px solid var(--line-accent)' }}
          >
            <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
              Resultado
            </p>
            <p className="text-sm leading-relaxed font-500" style={{ color: 'var(--text-primary)' }}>
              {c.result}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {c.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
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
      className="py-24 md:py-32"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            // Projetos
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-500 tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            O que já construímos.
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          {CASES.map((c) => (
            <CaseCard key={c.id} case_={c} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Tem um projeto em mente? A primeira conversa é gratuita.
          </p>
          <a
            href="#contact"
            className="inline-flex px-8 py-4 rounded-full font-display font-medium text-sm border transition-all duration-200 hover:border-accent hover:text-accent active:scale-95"
            style={{ border: '1px solid var(--line-bright)', color: 'var(--text-primary)' }}
          >
            Iniciar conversa
          </a>
        </div>
      </div>
    </section>
  )
}
