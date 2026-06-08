'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuroraBackground } from '@/components/aurora-background'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <AuroraBackground />
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        An unexpected error occurred. You can try again, and if it keeps
        happening, refresh the page.
      </p>
      <Button size="lg" onClick={() => reset()} className="mt-6">
        Try again
      </Button>
    </div>
  )
}
