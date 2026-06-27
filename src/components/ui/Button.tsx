'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useMagneticButton } from '@/hooks/useMagneticButton'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      magnetic = true,
      className,
      children,
      as: Tag = 'button',
      href,
      target,
      rel,
      ...props
    },
    _ref
  ) => {
    const magRef = useMagneticButton<HTMLButtonElement>()

    const base =
      'relative inline-flex items-center justify-center gap-2 font-display font-medium rounded-full transition-all duration-300 select-none overflow-hidden group'

    const variants = {
      primary:
        'bg-accent text-text-inverse hover:bg-accent-warm active:scale-95',
      outline:
        'border border-line-bright text-text-primary hover:border-accent hover:text-accent active:scale-95',
      ghost:
        'text-text-secondary hover:text-accent active:scale-95',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    const combined = cn(base, variants[variant], sizes[size], className)

    if (Tag === 'a' && href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={combined}
          ref={magnetic ? (magRef as unknown as React.Ref<HTMLAnchorElement>) : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={magnetic ? magRef : _ref}
        className={combined}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
