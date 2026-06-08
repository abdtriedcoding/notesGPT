import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type NoteStatus = 'processing' | 'ready' | 'failed'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      status: {
        processing:
          'border-warning/20 bg-warning/10 text-warning-foreground [&>span]:bg-warning dark:text-warning',
        ready:
          'border-success/20 bg-success/10 text-success dark:text-success [&>span]:bg-success',
        failed:
          'border-destructive/20 bg-destructive/10 text-destructive [&>span]:bg-destructive',
      },
    },
    defaultVariants: {
      status: 'ready',
    },
  }
)

const STATUS_LABEL: Record<NoteStatus, string> = {
  processing: 'Processing',
  ready: 'Ready',
  failed: 'Failed',
}

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status: NoteStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'processing' && 'animate-pulse'
        )}
      />
      {STATUS_LABEL[status]}
    </span>
  )
}
