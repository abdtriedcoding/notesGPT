'use client'

import Link from 'next/link'
import { useQuery } from 'convex/react'
import { notFound, useParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'

import NoteTabs from '@/components/note-tabs'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { ActionItemSkeleton } from '@/components/skeletons'
import ShareNoteModal from '@/components/share-note-modal'
import { AudioPlayer } from './_components/audio-player'
import { EditableField } from './_components/editable-field'

export default function RecordingIdPage() {
  const params = useParams()
  const recordingId = params.recordingId as Id<'notes'>

  const noteWithActionItems = useQuery(api.notes.getNoteById, {
    id: recordingId,
  })

  if (noteWithActionItems === undefined) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link href="/recordings">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to recordings
          </Link>
        </Button>
        <ActionItemSkeleton />
      </div>
    )
  }

  if (noteWithActionItems === null) {
    notFound()
  }

  const { note, actionItems } = noteWithActionItems
  const status = note.status ?? 'ready'

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link href="/recordings">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to recordings
        </Link>
      </Button>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <p className="eyebrow">Recording</p>
          <EditableField
            noteId={note._id}
            field="title"
            value={note.title ?? ''}
            placeholder="Untitled note"
            className="text-3xl font-medium tracking-tight sm:text-4xl"
          />
          <StatusBadge status={status} />
        </div>
        <ShareNoteModal noteId={note._id} />
      </div>

      {note.audioFileUrl && (
        <div className="mb-8">
          <AudioPlayer src={note.audioFileUrl} />
        </div>
      )}

      <NoteTabs note={note} actionItems={actionItems} />
    </div>
  )
}
