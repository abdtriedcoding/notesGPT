import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="font-display text-3xl">404</h1>
      <Link href="/" className={buttonVariants({ size: 'lg' })}>
        Go back home
      </Link>
    </div>
  )
}
