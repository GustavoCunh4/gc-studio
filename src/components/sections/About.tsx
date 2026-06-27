const VALUES = [
  {
    icon: '🤝',
    title: 'Parceria real',
    description:
      'Não somos fornecedores que entregam e somem. Trabalhamos lado a lado com o cliente, do diagnóstico à produção — e além.',
  },
  {
    icon: '📈',
    title: 'Resultado, não tecnologia',
    description:
      'Tecnologia é meio, não fim. Cada decisão técnica é justificada pelo impacto que gera no seu negócio.',
  },
  {
    icon: '💬',
    title: 'Clareza em tudo',
    description:
      'Sem jargão, sem surpresa de prazo, sem escopo oculto. Você sabe exatamente o que está sendo construído e por quê.',
  },
]

const NUMBERS = [
  { value: '100%', label: 'dos projetos com acompanhamento semanal' },
  { value: '24h', label: 'tempo máximo de resposta' },
  { value: '4+', label: 'anos construindo sistemas em produção' },
]

export default function About() {
  return (
    <section
      id="about"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section label */}
        <div className="reveal mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Sobre a GC Studio
          </p>
          <h2
            className="font-display font-500 tracking-tight leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--text-primary)' }}
          >
            Nascemos para falar a língua do seu negócio — não da tecnologia.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: story + numbers */}
          <div className="reveal flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                A GC Studio nasceu de uma observação simples: muitas empresas têm problemas reais
                que a tecnologia poderia resolver, mas não encontram parceiros que os entendam sem
                precisar falar em código.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                A maioria dos projetos falha não por falta de tecnologia — falha porque quem desenvolve
                não entende o negócio, e quem tem o negócio não consegue explicar o que precisa.
                Existimos para fechar essa lacuna.
              </p>
            </div>

            {/* Numbers */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--line)' }}
            >
              {NUMBERS.map((n, i) => (
                <div
                  key={n.label}
                  className="flex flex-col gap-1.5 p-6"
                  style={{
                    borderRight: i < NUMBERS.length - 1 ? '1px solid var(--line)' : 'none',
                    borderBottom: '0',
                    background: 'var(--bg-void)',
                  }}
                >
                  <span
                    className="font-display font-500 tracking-tight"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--accent)' }}
                  >
                    {n.value}
                  </span>
                  <span className="text-xs leading-snug" style={{ color: 'var(--text-dim)' }}>
                    {n.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border self-start"
              style={{ border: '1px solid var(--line)', background: 'var(--bg-elevated)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
                Disponível para novos projetos
              </span>
            </div>
          </div>

          {/* Right: values */}
          <div className="reveal flex flex-col gap-6" style={{ transitionDelay: '120ms' }}>
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-dim)' }}
            >
              Como trabalhamos
            </p>

            <div className="flex flex-col gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ background: 'var(--bg-void)', border: '1px solid var(--line)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line-bright)' }}
                  >
                    {v.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className="font-display font-500 text-base"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="self-start px-7 py-3.5 rounded-full font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
            >
              Falar com a equipe →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
