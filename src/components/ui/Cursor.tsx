'use client'

import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'hover' | 'click'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onDown = () => setState('click')
    const onUp = () => setState('default')

    const onHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const lbl = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') ?? ''
      setLabel(lbl)
      setState('hover')
    }
    const onHoverOut = () => {
      setLabel('')
      setState('default')
    }

    const interactiveEls = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], [data-cursor-hover]'
    )
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
    }
  }, [])

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{
          width: state === 'click' ? 6 : 8,
          height: state === 'click' ? 6 : 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99998] pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: state === 'hover' ? 56 : state === 'click' ? 28 : 36,
          height: state === 'hover' ? 56 : state === 'click' ? 28 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${state === 'hover' ? 'var(--accent)' : 'rgba(255,102,0,0.4)'}`,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
          mixBlendMode: 'normal',
        }}
      >
        {label && (
          <span
            className="text-[9px] font-mono uppercase tracking-widest text-center leading-tight"
            style={{ color: 'var(--accent)', fontSize: '8px' }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  )
}
