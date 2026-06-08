import Link from 'next/link'
import { AudioLines } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-lg bg-brand-gradient text-white shadow-soft',
        'h-8 w-8',
        className
      )}
    >
      <AudioLines className="h-[18px] w-[18px]" strokeWidth={2.5} />
    </span>
  )
}

interface LogoProps {
  className?: string
  href?: string
  showWordmark?: boolean
}

export function Logo({ className, href = '/', showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2.5', className)}
      aria-label="NotesGPT home"
    >
      <LogoMark />
      {showWordmark && (
        <span className="font-display text-xl font-semibold tracking-tight">
          NotesGPT
        </span>
      )}
    </Link>
  )
}
