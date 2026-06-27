const TECH_ROW_1 = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis',
  'Docker', 'AWS', 'Vercel', 'TailwindCSS', 'GSAP', 'Three.js',
]

const TECH_ROW_2 = [
  'Claude API', 'OpenAI', 'n8n', 'Zapier', 'Stripe', 'Prisma',
  'Git', 'GitHub', 'Linux', 'Python', 'REST', 'GraphQL',
]

function TechItem({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border flex-shrink-0 text-sm font-mono"
      style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: 'var(--accent)', opacity: 0.6 }}
      />
      {name}
    </span>
  )
}

export default function TechStack() {
  return (
    <section
      id="tech"
      className="py-20 overflow-hidden"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
      aria-label="Tecnologias utilizadas"
    >
      <div className="mb-12 px-6">
        <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          Stack
        </p>
        <h2
          className="font-display text-2xl md:text-3xl font-500 tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Tecnologias que usamos.
        </h2>
      </div>

      {/* Row 1 — esquerda */}
      <div className="overflow-hidden mb-4" aria-hidden="true">
        <div className="marquee-left flex gap-4 w-max">
          {[...TECH_ROW_1, ...TECH_ROW_1].map((t, i) => (
            <TechItem key={`r1-${i}`} name={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — direita */}
      <div className="overflow-hidden" aria-hidden="true">
        <div className="marquee-right flex gap-4 w-max">
          {[...TECH_ROW_2, ...TECH_ROW_2].map((t, i) => (
            <TechItem key={`r2-${i}`} name={t} />
          ))}
        </div>
      </div>

      {/* Screenreader list */}
      <ul className="sr-only">
        {[...TECH_ROW_1, ...TECH_ROW_2].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  )
}
