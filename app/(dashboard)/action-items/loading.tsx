import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/page-header'
import { ActionItemsListSkeleton } from '@/components/skeletons'

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Action items"
        subtitle={
          <span className="flex h-6 items-center">
            <Skeleton className="h-4 w-44" />
          </span>
        }
        className="mb-6"
      />
      <div className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search action items…"
            className="pl-9"
            disabled
          />
        </div>
        <ActionItemsListSkeleton />
      </div>
    </div>
  )
}
