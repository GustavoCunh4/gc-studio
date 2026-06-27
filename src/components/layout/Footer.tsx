import { buildDirectWhatsAppLink } from '@/lib/whatsapp'

const LINKS = {
  navegacao: [
    { label: 'Serviços', href: '#services' },
    { label: 'Como funciona', href: '#how-it-works' },
    { label: 'Projetos', href: '#cases' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: '#contact' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luizgustavocunha-dev/' },
    { label: 'GitHub', href: 'https://github.com/GustavoCunh4' },
    { label: 'WhatsApp', href: buildDirectWhatsAppLink() },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-display font-600 text-lg">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-700"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-warm))',
                  color: 'var(--text-inverse)',
                }}
              >
                GC
              </span>
              <span style={{ color: 'var(--text-primary)' }}>Studio</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Transformamos operações em sistemas inteligentes. Software, automação e IA aplicada
              para empresas que precisam de mais do que uma landing page.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#22c55e' }}
              />
              <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                {process.env.NEXT_PUBLIC_AVAILABLE === 'false'
                  ? 'Agenda cheia no momento'
                  : 'Disponível para novos projetos'}
              </span>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'var(--text-dim)' }}
            >
              Navegação
            </h3>
            <ul className="flex flex-col gap-3">
              {LINKS.navegacao.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-accent"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'var(--text-dim)' }}
            >
              Contato
            </h3>
            <ul className="flex flex-col gap-3">
              {LINKS.social.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-accent"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            © {year} GC Studio. Salvador, BA — Brasil.
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            Feito com Next.js + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
