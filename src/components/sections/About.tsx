const TIMELINE = [
  { year: '2020', desc: 'Primeiros projetos e aprendizado de stack full stack.' },
  { year: '2022', desc: 'Sistemas em produção com Node.js, PostgreSQL e APIs.' },
  { year: '2023', desc: 'Automação com n8n e integração com LLMs.' },
  { year: '2024', desc: 'GC Studio — software, automação e IA para PMEs.' },
]

export default function About() {
  return (
    <section
      id="about"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: foto */}
          <div className="flex flex-col gap-8">
            {/* Photo */}
            <div className="relative">
              <div
                className="rounded-2xl w-full max-w-xs aspect-[3/4] border flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line)' }}
              >
                {/* Placeholder — substitua por: <Image src="/gustavo.jpg" alt="Gustavo Cunha" fill className="object-cover rounded-2xl" /> */}
                <div className="flex flex-col items-center gap-3 opacity-25">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-display font-700 text-xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent-warm))',
                      color: 'var(--text-inverse)',
                    }}
                  >
                    GC
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                    foto aqui
                  </span>
                </div>
              </div>

              {/* Availability badge */}
              <div
                className="absolute -bottom-5 left-6 flex items-center gap-2 px-4 py-2.5 rounded-full border"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--line)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                  Disponível para projetos
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luizgustavocunha-dev/' },
                { label: 'GitHub', href: 'https://github.com/GustavoCunh4' },
                { label: 'WhatsApp', href: 'https://wa.me/5571991156488?text=Ol%C3%A1%20Gustavo%21%20Vi%20seu%20site%20e%20quero%20conversar.' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-mono border transition-all duration-200 hover:border-accent hover:text-accent"
                  style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)' }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right: texto */}
          <div className="flex flex-col gap-10">
            <div>
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: 'var(--accent)' }}
              >
                Fundador
              </p>
              <h2
                className="font-display font-500 tracking-tight leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--text-primary)' }}
              >
                Gustavo Cunha
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Quando você contrata a GC Studio, é comigo que você fala — da primeira reunião até o sistema
                  em produção. Sem repasse para júnior, sem surpresa.
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Entendo do negócio antes de abrir o editor. A maioria do meu trabalho começa em descobrir
                  o que realmente está travando a operação.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-0 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-6 py-5" style={{ borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <span className="font-mono text-xs w-10 flex-shrink-0 mt-0.5" style={{ color: i === TIMELINE.length - 1 ? 'var(--accent)' : 'var(--text-dim)' }}>
                    {item.year}
                  </span>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="self-start px-7 py-3.5 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
            >
              Iniciar projeto →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
