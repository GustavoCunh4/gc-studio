import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Target, Wrench } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientProviders from '@/components/providers/ClientProviders'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Tag from '@/components/ui/Tag'
import { CASES } from '@/data/caseStudies'

export const metadata: Metadata = {
  title: 'Projetos | GC Studio',
  description:
    'Conheça projetos da GC Studio em sistemas sob medida, automações e IA aplicada para empresas.',
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
            Em produção
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
                  <ProductMockup client={project.client} reverse={project.reverse} />
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
