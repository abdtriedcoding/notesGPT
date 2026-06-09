import Link from 'next/link'
import { Mic, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { RecordingsTableSkeleton } from '@/components/skeletons'

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Your recordings"
        subtitle="Every voice note, transcribed and summarized."
        action={
          <Button asChild>
            <Link href="/record">
              <Mic className="mr-1.5 h-4 w-4" />
              New recording
            </Link>
          </Button>
        }
        className="mb-8"
      />
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notes…" className="pl-9" disabled />
        </div>
        <RecordingsTableSkeleton />
      </div>
    </div>
  )
}
