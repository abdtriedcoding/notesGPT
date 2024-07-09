import Link from 'next/link'
import { Button } from './ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function ActionItemSkelton() {
  return (
    <div className="mx-auto max-w-xl space-y-8">
      <Skeleton className="mx-auto h-[38px] w-[300px]" />
      <div className="flex flex-col space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
      <p className="text-2xl">You currently have no action items.</p>
      <Button asChild size={'lg'}>
        <Link href={'/record'}>Record your first voice note</Link>
      </Button>
    </div>
  )
}
