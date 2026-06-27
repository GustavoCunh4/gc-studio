import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  className?: string
  accent?: boolean
}

export default function Tag({ children, className, accent = false }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-mono rounded-full border',
        accent
          ? 'border-line-accent text-accent bg-[rgba(255,102,0,0.08)]'
          : 'border-line text-text-secondary',
        className
      )}
    >
      {children}
    </span>
  )
}
