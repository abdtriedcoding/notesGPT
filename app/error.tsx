'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="font-display text-3xl">Something went wrong!</h1>
      <Button size={'lg'} onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  )
}
