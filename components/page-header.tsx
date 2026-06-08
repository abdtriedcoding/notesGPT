import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  eyebrow?: string
  subtitle?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  eyebrow,
  subtitle,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="space-y-2">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <div className="text-muted-foreground">{subtitle}</div>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  )
}
