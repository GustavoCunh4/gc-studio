const TIMELINE = [
  {
    year: '2020',
    role: 'Início em desenvolvimento',
    desc: 'Primeiros projetos freelance, foco em frontend e aprendizado de stack full stack.',
  },
  {
    year: '2022',
    role: 'Backend e arquitetura',
    desc: 'Projetos com Node.js, PostgreSQL e APIs complexas. Primeiro sistema em produção real.',
  },
  {
    year: '2023',
    role: 'IA e automação',
    desc: 'Integração com LLMs, automação de processos com n8n, primeiros chatbots em produção.',
  },
  {
    year: '2024',
    role: 'GC Studio',
    desc: 'Criação da empresa para atender PMEs com software, automação e IA de forma integrada.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: foto placeholder + links */}
          <div className="flex flex-col gap-6">
            {/* Photo */}
            <div
              className="rounded-2xl aspect-square max-w-sm flex items-center justify-center border"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--line)',
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-display font-700"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-warm))',
                    color: 'var(--text-inverse)',
                  }}
                >
                  GC
                </div>
                <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                  Gustavo Cunha
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com/gustavocc' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/gustavocunha' },
                { label: 'WhatsApp', href: 'https://wa.me/5571999999999' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-display border transition-all duration-200 hover:border-accent hover:text-accent"
                  style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)' }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full self-start"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-500">Disponível para projetos</span>
            </div>
          </div>

          {/* Right: text + timeline */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
                // Fundador
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-500 tracking-tight mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Gustavo Cunha
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Full Stack Developer de Salvador, BA. Passei por qualidade, backend e produtos antes
                  de focar em resolver problemas reais de negócio com código.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Trabalho com empresas que precisam de mais do que um dev que &ldquo;faz site&rdquo;.
                  Precisam de alguém que entende o problema antes de abrir o editor.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Especialidade: transformar processos manuais caóticos em sistemas que rodam
                  sozinhos enquanto você foca no que importa para o negócio.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-0 mt-4">
              <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--text-dim)' }}>
                Trajetória
              </p>
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-6 group">
                  {/* Linha vertical */}
                  <div className="flex flex-col items-center gap-0 flex-shrink-0">
                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                      style={{ background: i === TIMELINE.length - 1 ? 'var(--accent)' : 'var(--line-bright)' }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 mt-2 mb-2" style={{ background: 'var(--line)', minHeight: '40px' }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8 flex flex-col gap-1">
                    <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                      {item.year}
                    </span>
                    <p className="font-display font-500 text-sm" style={{ color: 'var(--text-primary)' }}>
                      {item.role}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
