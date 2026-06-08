'use client'

import Link from 'next/link'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'

import { Logo } from '@/components/logo'
import NoteTabs from '@/components/note-tabs'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { EmptyState } from '@/components/empty-state'
import { ActionItemSkeleton } from '@/components/skeletons'
import { FileQuestion } from 'lucide-react'

export default function SharePage() {
  const params = useParams()
  const noteId = params.noteId as Id<'notes'>

  const noteWithActionItems = useQuery(api.notes.getSharedNote, {
    id: noteId,
  })

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/60 px-4 backdrop-blur-xl sm:px-6">
        <Logo />
        <Button asChild size="sm">
          <Link href="/">Create your own →</Link>
        </Button>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        {noteWithActionItems === undefined ? (
          <ActionItemSkeleton />
        ) : noteWithActionItems === null ? (
          <EmptyState
            icon={FileQuestion}
            title="This note isn’t available"
            description="The link may be broken or the note was deleted."
            action={
              <Button asChild>
                <Link href="/">Go to NotesGPT</Link>
              </Button>
            }
            className="mt-10"
          />
        ) : (
          <>
            <div className="mb-8 space-y-3">
              <p className="eyebrow">Shared via NotesGPT</p>
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {noteWithActionItems.note.title ?? 'Untitled note'}
              </h1>
              <StatusBadge status={noteWithActionItems.note.status ?? 'ready'} />
            </div>
            <NoteTabs
              note={noteWithActionItems.note}
              actionItems={noteWithActionItems.actionItems}
              readOnly
            />
          </>
        )}
      </main>
    </div>
  )
}
