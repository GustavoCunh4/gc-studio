'use client'

import { useEffect, useRef, useState } from 'react'
import { buildDirectWhatsAppLink } from '@/lib/whatsapp'
import NavLine from '@/components/ui/NavLine'

const NAV_LINKS = [
  { label: 'Serviços', href: '#services' },
  { label: 'Projetos', href: '#cases' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
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

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        background: scrolled ? 'rgba(6,6,8,0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 group"
          aria-label="GC Studio — início"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gc-logo.svg" alt="" width={28} height={28} style={{ objectFit: 'contain' }} aria-hidden="true" />
          <span
            className="font-display font-500 text-base tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Studio
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              className="relative group text-sm font-body pb-1 transition-colors duration-200 hover:text-text-primary"
              style={{ color: 'var(--text-dim)' }}
            >
              {link.label}
              <NavLine />
            </a>
          ))}
        </nav>

        {/* CTA única */}
        <div className="flex items-center gap-3">
          <a
            href={buildDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-display font-medium rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
          >
            Falar agora
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text-primary)',
                  width: i === 1 ? (menuOpen ? '20px' : '14px') : '20px',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'translateY(6px) rotate(45deg)'
                        : i === 2
                        ? 'translateY(-6px) rotate(-45deg)'
                        : 'scaleX(0)'
                      : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{
            background: 'rgba(6,6,8,0.98)',
            borderTop: '1px solid var(--line)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              className="text-base font-display"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3.5 text-sm font-display font-medium rounded-full text-center"
            style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
          >
            Falar agora
          </a>
        </div>
      )}
    </header>
  )
}
