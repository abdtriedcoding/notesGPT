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
