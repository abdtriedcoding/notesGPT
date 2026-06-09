'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mic, Search, ListTodo } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type api } from '@/convex/_generated/api'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { type Preloaded, usePreloadedQuery } from 'convex/react'
import NoteCard from '../recordings/[recordingId]/_components/note-card'

export default function ActionItemsWrapper(props: {
  preloadedActionItems: Preloaded<typeof api.notes.getActionItems>
}) {
  const [search, setSearch] = useState('')
  const userActionItems = usePreloadedQuery(props.preloadedActionItems)

  const actionItems = userActionItems.filter(
    (e) =>
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        eyebrow="Tasks"
        title="Action items"
        subtitle={`${userActionItems.length} ${
          userActionItems.length === 1 ? 'task' : 'tasks'
        } across your notes`}
        className="mb-8"
      />

      {userActionItems.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="No action items yet"
          description="Action items are pulled from your voice notes. Record one to get started."
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
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search action items…"
              className="pl-9"
            />
          </div>
          {actionItems.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No action items match “{search}”.
            </p>
          ) : (
            <div className="space-y-3">
              {actionItems.map((item) => (
                <NoteCard key={item._id} {...item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
