import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  className?: string
}

/**
 * Decorative, brand-tinted aurora blobs rendered behind content.
 * Purely presentational (no props mutated during render) so it stays
 * compatible with the React Compiler.
 */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-aurora" />
      <div className="absolute -top-20 right-[10%] h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-3xl animate-aurora [animation-delay:-6s]" />
      <div className="absolute top-40 left-[5%] h-[24rem] w-[24rem] rounded-full bg-indigo-400/10 blur-3xl animate-aurora [animation-delay:-12s]" />
    </div>
  )
}
