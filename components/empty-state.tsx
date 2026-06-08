import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed bg-card/50 px-6 py-16 text-center',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dots opacity-40"
      />
      {Icon && (
        <span className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-accent text-primary">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <h3 className="relative font-display text-xl font-semibold tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <div className="relative mt-6 flex items-center gap-3">{action}</div>
      )}
    </div>
  )
}
