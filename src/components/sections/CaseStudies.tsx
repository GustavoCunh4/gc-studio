import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Tag from '@/components/ui/Tag'
import { CASES } from '@/data/caseStudies'

function ProjectPreviewCard({ project }: { project: (typeof CASES)[number] }) {
  return (
    <article className="surface-card interactive-lift reveal-scale flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="p-6 md:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker mb-3">{project.client}</p>
            <h3 className="font-display text-xl font-500 leading-tight md:text-2xl" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
          </div>
          <CheckCircle2 size={22} className="shrink-0" aria-hidden="true" style={{ color: 'var(--accent)' }} />
        </div>

        <div className="grid gap-4">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
              Antes
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.problem}
            </p>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,102,0,0.07)', border: '1px solid var(--line-accent)' }}
          >
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Depois
            </p>
            <p className="text-sm font-500 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {project.result}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t p-6 md:p-7" style={{ borderColor: 'var(--line)' }}>
        {project.stack.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
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
        <div className="reveal mb-12 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker mb-4">Projetos</p>
            <h2 className="section-title mb-5">Exemplos do que isso vira na prática.</h2>
            <p className="section-copy">
              Na home, o importante é entender o impacto. Os detalhes completos ficam em uma página própria.
            </p>
          </div>
          <Link href="/projetos" className="btn-secondary self-start lg:self-end">
            Ver projetos completos
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CASES.slice(0, 2).map((project) => (
            <ProjectPreviewCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
