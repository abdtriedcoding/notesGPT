'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { type api } from '@/convex/_generated/api'
import { EmptyState } from '@/components/skeltons'
import { type Preloaded, usePreloadedQuery } from 'convex/react'
import NoteCard from '../recordings/[recordingId]/_components/note-card'

export default function ActionItemsWrapper(props: {
  preloadedActionItems: Preloaded<typeof api.notes.getActionItems>
}) {
  const [search, setSearch] = useState('')
  const userActionItems = usePreloadedQuery(props.preloadedActionItems)

  if (userActionItems.length === 0) return <EmptyState />

  const actionItems = userActionItems.filter(
    (e) =>
      e.action.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      e.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-center text-2xl font-medium">Action Items</h1>
      <h3 className="text-center text-gray-600 dark:text-gray-300">
        {userActionItems?.length ?? 0} tasks
      </h3>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search through action items..."
      />
      {actionItems.length === 0 ? (
        <p className="text-center">No Result Found</p>
      ) : (
        actionItems.map((item) => <NoteCard key={item._id} {...item} />)
      )}
    </div>
  )
}
