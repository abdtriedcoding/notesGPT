'use client'

import Link from 'next/link'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Mic } from 'lucide-react'
import { type api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { type Preloaded, usePreloadedQuery } from 'convex/react'

export function NotesWrapper(props: {
  preloadedNotes: Preloaded<typeof api.notes.getUserNotes>
}) {
  const userNotes = usePreloadedQuery(props.preloadedNotes)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Library"
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
      {userNotes.length === 0 ? (
        <EmptyState
          icon={Mic}
          title="No recordings yet"
          description="Record your first voice note and watch it turn into a clean summary with action items."
          action={
            <Button asChild size="lg">
              <Link href="/record">
                <Mic className="mr-1.5 h-4 w-4" />
                Record a voice note
              </Link>
            </Button>
          }
          className="mt-6"
        />
      ) : (
        <DataTable data={userNotes} columns={columns} />
      )}
    </div>
  )
}
