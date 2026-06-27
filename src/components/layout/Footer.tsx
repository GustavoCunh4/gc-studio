import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { buildDirectWhatsAppLink } from '@/lib/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--line)' }}>
      <div className="container-shell py-12 md:py-16">
        <div
          className="mb-10 flex flex-col items-start justify-between gap-10 border-b pb-10 md:mb-12 md:flex-row md:items-center md:pb-12"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex max-w-sm flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/GC-Laranja-Transparente.png"
                alt="GC Studio"
                width={34}
                height={34}
                className="block h-[34px] w-[34px] object-contain"
              />
              <span className="font-display text-base font-500" style={{ color: 'var(--text-primary)' }}>
                GC Studio
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sistemas, automação e inteligência artificial para empresas que querem crescer com eficiência.
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                Disponível para novos projetos
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-10 sm:w-auto sm:gap-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                Navegação
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  ['Serviços', '#services'],
                  ['Projetos', '#cases'],
                  ['Sobre', '#about'],
                  ['FAQ', '#faq'],
                  ['Contato', '#contact'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm transition-colors duration-200 hover:text-accent" style={{ color: 'var(--text-secondary)' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                Contato
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  ['LinkedIn', 'https://www.linkedin.com/in/luizgustavocunha-dev/'],
                  ['WhatsApp', buildDirectWhatsAppLink()],
                  ['Email', 'mailto:contato@gcstudio.com.br'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-accent"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {label}
                      {!href.startsWith('mailto') && <ExternalLink size={13} aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            © {year} GC Studio - Salvador, BA
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            Feito para durar - e para escalar.
          </p>
        </div>
      </div>
    </footer>
  )
}
