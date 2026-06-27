'use client'

import { useEffect, useRef, useState } from 'react'
import { buildDirectWhatsAppLink } from '@/lib/whatsapp'
import NavLine from '@/components/ui/NavLine'

const NAV_LINKS = [
  { label: 'Serviços', href: '#services' },
  { label: 'Como funciona', href: '#how-it-works' },
  { label: 'Projetos', href: '#cases' },
  { label: 'Sobre', href: '#about' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        background: scrolled ? 'rgba(6,6,8,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2 font-display font-600 text-lg tracking-tight"
          style={{ color: 'var(--text-primary)' }}
          aria-label="GC Studio — voltar ao topo"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-700"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-warm))',
              color: 'var(--text-inverse)',
            }}
          >
            GC
          </span>
          <span>Studio</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="relative group text-sm font-body pb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
              <NavLine />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="hidden md:inline-flex px-5 py-2 text-sm font-display font-medium rounded-full border transition-all duration-200 hover:border-accent hover:text-accent"
            style={{
              border: '1px solid var(--line-bright)',
              color: 'var(--text-primary)',
            }}
          >
            Iniciar projeto
          </a>
          <a
            href={buildDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-5 py-2 text-sm font-display font-medium rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'var(--accent)',
              color: 'var(--text-inverse)',
            }}
          >
            WhatsApp
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(6,6,8,0.97)', borderTop: '1px solid var(--line)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="text-base font-body"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="mt-2 px-5 py-3 text-sm font-display font-medium rounded-full text-center"
            style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
          >
            Iniciar projeto
          </a>
        </div>
      )}
    </header>
  )
}
