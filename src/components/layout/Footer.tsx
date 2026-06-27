import { buildDirectWhatsAppLink } from '@/lib/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12 pb-12" style={{ borderBottom: '1px solid var(--line)' }}>

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gc-logo.svg" alt="" width={28} height={28} style={{ objectFit: 'contain' }} aria-hidden="true" />
              <span className="font-display font-500 text-base" style={{ color: 'var(--text-primary)' }}>
                Studio
              </span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Software, automação e IA para empresas que precisam digitalizar operações.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                Disponível para novos projetos
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-dim)' }}>
                Navegação
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  ['Serviços', '#services'],
                  ['Projetos', '#cases'],
                  ['Sobre', '#about'],
                  ['Contato', '#contact'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors duration-200 hover:text-accent"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-dim)' }}>
                Redes
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  ['LinkedIn', 'https://www.linkedin.com/in/luizgustavocunha-dev/'],
                  ['GitHub', 'https://github.com/GustavoCunh4'],
                  ['WhatsApp', buildDirectWhatsAppLink()],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors duration-200 hover:text-accent"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            © {year} GC Studio — Salvador, BA
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
            Next.js · TypeScript · Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
