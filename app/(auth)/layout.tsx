import { Logo } from '@/components/logo'
import { AuroraBackground } from '@/components/aurora-background'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <AuroraBackground />
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo />
        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
          Turn your voice into summaries and action items in seconds.
        </p>
      </div>
      {children}
    </div>
  )
}
