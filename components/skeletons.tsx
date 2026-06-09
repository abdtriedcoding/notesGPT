import { Skeleton } from '@/components/ui/skeleton'

// Recording detail page (transcript / summary / action items)
export function ActionItemSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="flex flex-col space-y-2.5 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  )
}

// Recordings list table (rows only — the search bar renders immediately)
export function RecordingsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex items-center gap-4 border-b px-4 py-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="ml-auto h-4 w-20" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b px-4 py-4 last:border-0"
        >
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="ml-auto h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      ))}
    </div>
  )
}

// Action items list (the cards only — the search bar renders immediately)
export function ActionItemsListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[68px] w-full rounded-xl" />
      ))}
    </div>
  )
}
