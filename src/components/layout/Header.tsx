'use client'

import { type MouseEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import NavLine from '@/components/ui/NavLine'

const NAV_LINKS = [
  { label: 'Serviços', href: '/#services' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contato', href: '/#contact' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    const selector = href.startsWith('/#') ? href.slice(1) : href
    setMenuOpen(false)
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      event.preventDefault()
      scrollTo(href)
      return
    }

    setMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-100 transition-all duration-500"
      style={{
        backdropFilter: scrolled || menuOpen ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px) saturate(180%)' : 'none',
        background: scrolled || menuOpen ? 'rgba(6,6,8,0.9)' : 'transparent',
        borderBottom: scrolled || menuOpen ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="container-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={(event) => {
            setMenuOpen(false)
            if (pathname === '/') {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="group flex items-center gap-2.5"
          aria-label="GC Studio - início"
        >
          <Image
            src="/GC-Laranja-Transparente.png"
            alt="GC Studio"
            width={32}
            height={32}
            priority
            className="block h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-base font-500 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            GC Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="group relative pb-1 text-sm transition-colors duration-200 hover:text-text-primary"
              style={{ color: 'var(--text-dim)' }}
            >
              {link.label}
              <NavLine />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            onClick={(event) => handleNavClick(event, '/#contact')}
            className="btn-primary hidden min-h-0 px-5 py-2.5 md:inline-flex"
          >
            Diagnóstico gratuito
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 hover:border-accent hover:text-accent md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{ borderColor: 'var(--line-bright)', color: 'var(--text-primary)' }}
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{
          maxHeight: menuOpen ? '420px' : '0px',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(6,6,8,0.98)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav className="container-shell flex flex-col gap-2 py-5" aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="rounded-xl px-2 py-3 font-display text-base transition-colors duration-200 hover:text-accent"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(event) => handleNavClick(event, '/#contact')}
            className="btn-primary mt-3"
          >
            Diagnóstico gratuito
          </Link>
        </nav>
      </div>
    </header>
  )
}
