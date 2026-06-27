import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, CheckCircle2, DatabaseZap, MailCheck, Target, Wrench } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientProviders from '@/components/providers/ClientProviders'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Tag from '@/components/ui/Tag'
import { CASES } from '@/data/caseStudies'
import { type CaseStudy } from '@/types'

export const metadata: Metadata = {
  title: 'Projetos | GC Corporation',
  description:
    'Conheça projetos da GC Corporation em sistemas sob medida, automações e IA aplicada para empresas.',
}

type DashboardData = CaseStudy['dashboard']

function MetricCard({ metric, featured }: { metric: DashboardData['metrics'][number]; featured: boolean }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{
        borderColor: featured ? 'var(--line-accent)' : 'var(--line)',
        background: featured ? 'rgba(255,102,0,0.08)' : 'rgba(255,255,255,0.025)',
      }}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
        {metric.label}
      </p>
      <p className="mt-2 font-display text-base font-500 sm:text-lg" style={{ color: featured ? 'var(--accent)' : 'var(--text-primary)' }}>
        {metric.value}
      </p>
      <p className="mt-1 text-[10px] leading-snug" style={{ color: 'var(--text-dim)' }}>
        {metric.detail}
      </p>
    </div>
  )
}

function OperationsPanel({ dashboard }: { dashboard: DashboardData }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-lg border p-3" style={{ borderColor: 'var(--line)', background: 'rgba(255,255,255,0.025)' }}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} aria-hidden="true" style={{ color: 'var(--accent)' }} />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
              Ocupação da agenda
            </p>
          </div>
          <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>
            Hoje
          </span>
        </div>

        <div className="space-y-2.5">
          {dashboard.bars.map((bar) => (
            <div key={bar.label} className="grid grid-cols-[30px_1fr_34px] items-center gap-2">
              <span className="font-mono text-[10px]" style={{ color: 'var(--text-dim)' }}>
                {bar.label}
              </span>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg-elevated)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: bar.width, background: bar.tone === 'accent' ? 'var(--accent)' : 'var(--line-bright)' }}
                />
              </div>
              <span className="text-right font-mono text-[10px]" style={{ color: bar.tone === 'accent' ? 'var(--accent)' : 'var(--text-dim)' }}>
                {bar.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-3" style={{ borderColor: 'var(--line)', background: 'linear-gradient(135deg, rgba(255,102,0,0.14), rgba(255,255,255,0.025))' }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
          Serviços do dia
        </p>
        <div className="mt-3 space-y-2">
          {dashboard.activities.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-md px-2.5 py-2" style={{ background: 'rgba(0,0,0,0.18)' }}>
              <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </span>
              <span className="font-mono text-[11px]" style={{ color: 'var(--text-primary)' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AutomationPanel({ dashboard }: { dashboard: DashboardData }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border p-3" style={{ borderColor: 'var(--line)', background: 'rgba(255,255,255,0.025)' }}>
        <div className="mb-3 flex items-center gap-2">
          <DatabaseZap size={15} aria-hidden="true" style={{ color: 'var(--accent)' }} />
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
            Pipeline
          </p>
        </div>

        <div className="space-y-3">
          {dashboard.bars.map((bar, index) => (
            <div key={bar.label} className="relative pl-6">
              {index < dashboard.bars.length - 1 && (
                <span className="absolute left-[7px] top-5 h-[calc(100%+4px)] w-px" style={{ background: 'var(--line)' }} />
              )}
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full" style={{ background: bar.tone === 'accent' ? 'var(--accent)' : 'var(--line-bright)' }} />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{bar.label}</span>
                <span className="font-mono text-[10px]" style={{ color: bar.tone === 'accent' ? 'var(--accent)' : 'var(--text-dim)' }}>{bar.value}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--bg-elevated)' }}>
                <div className="h-full rounded-full" style={{ width: bar.width, background: bar.tone === 'accent' ? 'var(--accent)' : 'var(--line-bright)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-3" style={{ borderColor: 'var(--line)', background: 'linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,102,0,0.1))' }}>
        <div className="mb-3 flex items-center gap-2">
          <MailCheck size={15} aria-hidden="true" style={{ color: 'var(--accent)' }} />
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
            Resumo enviado
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {dashboard.activities.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0" style={{ borderColor: 'var(--line)' }}>
              <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              <span className="font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductMockup({ project }: { project: CaseStudy }) {
  const { client, dashboard } = project

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
              {dashboard.label}
            </p>
            <p className="mt-1 font-display text-sm font-500" style={{ color: 'var(--text-primary)' }}>
              {client}
            </p>
          </div>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px]"
            style={{ color: 'var(--accent)', background: 'rgba(255,102,0,0.1)', border: '1px solid var(--line-accent)' }}
          >
            {dashboard.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {dashboard.metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} featured={index === 1} />
          ))}
        </div>

        {dashboard.variant === 'operations' ? (
          <OperationsPanel dashboard={dashboard} />
        ) : (
          <AutomationPanel dashboard={dashboard} />
        )}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--line-accent)', background: 'rgba(255,102,0,0.08)' }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>
              {dashboard.highlight.label}
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="font-display text-3xl font-500" style={{ color: 'var(--text-primary)' }}>
                {dashboard.highlight.value}
              </p>
              <CheckCircle2 size={16} aria-hidden="true" style={{ color: 'var(--accent)' }} />
            </div>
            <p className="mt-1 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              {dashboard.highlight.detail}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {dashboard.secondary.map((item) => (
              <div key={item.label} className="rounded-lg border p-3" style={{ borderColor: 'var(--line)', background: 'rgba(255,255,255,0.025)' }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-dim)' }}>
                  {item.label}
                </p>
                <p className="mt-2 font-display text-base font-500" style={{ color: 'var(--text-primary)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <ClientProviders>
      <ScrollProgress />
      <Header />
      <main>
        <section
          className="ambient-band relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40"
          style={{ background: 'var(--bg-void)' }}
        >
          <div className="container-shell">
            <div className="max-w-3xl">
              <p className="section-kicker mb-5">Projetos</p>
              <h1
                className="font-display font-500 leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text-primary)' }}
              >
                Projetos que mostram tecnologia resolvendo rotina real.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed md:text-xl" style={{ color: 'var(--text-secondary)' }}>
                Aqui você vê o antes, o que foi construído e o resultado prático. Sem vitrine técnica vazia:
                cada projeto precisa melhorar tempo, controle ou qualidade da operação.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/#contact" className="btn-primary">
                  Quero um diagnóstico
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/#services" className="btn-secondary">
                  Entender serviços
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad-tight" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}>
          <div className="container-shell flex flex-col gap-20">
            {CASES.map((project) => (
              <article
                key={project.id}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 ${project.reverse ? 'lg:[direction:rtl]' : ''}`}
              >
                <div style={{ direction: 'ltr' }}>
                  <ProductMockup project={project} />
                </div>

                <div className="flex flex-col gap-6" style={{ direction: 'ltr' }}>
                  <div>
                    <span className="section-kicker">{project.client}</span>
                    <h2 className="mt-3 font-display text-2xl font-500 leading-tight tracking-tight md:text-4xl" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    <div className="surface-card rounded-2xl p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Target size={17} aria-hidden="true" style={{ color: 'var(--accent)' }} />
                        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                          Problema
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {project.problem}
                      </p>
                    </div>

                    <div className="surface-card rounded-2xl p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Wrench size={17} aria-hidden="true" style={{ color: 'var(--accent)' }} />
                        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                          Solução
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {project.solution}
                      </p>
                    </div>

                    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,102,0,0.08)', border: '1px solid var(--line-accent)' }}>
                      <p className="mb-2 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                        Resultado
                      </p>
                      <p className="text-sm font-500 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {project.result}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad-tight" style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}>
          <div className="container-shell text-center">
            <p className="section-kicker mb-4">Próximo projeto</p>
            <h2 className="section-title mx-auto max-w-2xl">
              Quer transformar um processo da sua empresa em um sistema funcionando?
            </h2>
            <p className="section-copy mx-auto mt-5 max-w-xl">
              A primeira conversa serve para entender sua rotina, identificar gargalos e dizer com clareza o que vale ou não vale construir.
            </p>
            <Link href="/#contact" className="btn-primary mt-8">
              Começar diagnóstico
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </ClientProviders>
  )
}
