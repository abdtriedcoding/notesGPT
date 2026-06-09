import { cn } from '@/lib/utils'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-card p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg',
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/50 text-primary">
          {icon}
        </div>
        <div className="mb-1.5 mt-3 font-sans text-lg font-semibold tracking-tight text-foreground">
          {title}
        </div>
        <div className="text-sm font-normal leading-relaxed text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  )
}
