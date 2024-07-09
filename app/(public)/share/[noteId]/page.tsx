'use client'

import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { type Doc, type Id } from '@/convex/_generated/dataModel'

import { ActionItemSkelton, EmptyState } from '@/components/skeltons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import NoteCard from '@/app/(dashboard)/recordings/[recordingId]/_components/note-card'

interface NoteWithActionItem {
  note: Doc<'notes'>
  actionItems: Doc<'actionItems'>[]
}

export default function SharePage() {
  const params = useParams()
  const { noteId } = params

  const noteWithActionItems = useQuery(api.notes.getNoteById, {
    id: noteId as Id<'notes'>,
  })

  if (noteWithActionItems === undefined) {
    return <ActionItemSkelton />
  }

  const { note, actionItems }: NoteWithActionItem = noteWithActionItems
  return (
    <Tabs defaultValue="transcript" className="mx-auto max-w-xl text-center">
      <TabsList className="mb-4">
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="actionItem">Action Items</TabsTrigger>
      </TabsList>
      <TabsContent value="transcript">{note?.transcription}</TabsContent>
      <TabsContent value="summary">{note?.summary}</TabsContent>
      <TabsContent className="space-y-4" value="actionItem">
        {actionItems.length > 0 ? (
          actionItems.map((item) => (
            <NoteCard key={item._id} {...item} title={note.title} preview />
          ))
        ) : (
          <EmptyState />
        )}
      </TabsContent>
    </Tabs>
  )
}
