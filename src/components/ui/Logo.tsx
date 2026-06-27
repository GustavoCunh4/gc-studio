import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  className?: string
  wordmark?: boolean
}

export default function Logo({ size = 36, className, wordmark = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/gc-logo.svg"
        alt="GC Studio logotipo"
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
      />
      {wordmark && (
        <span
          className="font-display font-500 tracking-tight leading-none"
          style={{ fontSize: size * 0.55, color: 'var(--text-primary)' }}
        >
          Studio
        </span>
      )}
    </span>
  )
}
