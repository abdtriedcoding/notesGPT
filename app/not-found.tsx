import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuroraBackground } from '@/components/aurora-background'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <AuroraBackground />
      <p className="text-6xl font-bold tracking-tight text-gradient sm:text-7xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/recordings">My recordings</Link>
        </Button>
      </div>
    </div>
  )
}
