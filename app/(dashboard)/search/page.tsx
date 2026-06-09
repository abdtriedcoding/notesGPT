'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { FileText, Search as SearchIcon } from 'lucide-react'
import { api } from '@/convex/_generated/api'

import { formatDate } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { StatusBadge } from '@/components/status-badge'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')

  // Debounce so we don't fire a search query on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250)
    return () => clearTimeout(t)
  }, [query])

  const results = useQuery(
    api.notes.searchNotes,
    debounced.length > 0 ? { query: debounced } : 'skip'
  )

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        eyebrow="Find"
        title="Search"
        subtitle="Search across the titles, summaries, and transcripts of your notes."
        className="mb-8"
      />

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your notes…"
          className="pl-9"
          autoFocus
        />
      </div>

      <div className="mt-6">
        {debounced.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title="Search your notes"
            description="Start typing to find a recording by anything that was said in it."
          />
        ) : results === undefined ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Searching…
          </p>
        ) : results.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No notes match “{debounced}”.
          </p>
        ) : (
          <div className="space-y-3">
            {results.map((note) => (
              <Link
                key={note._id}
                href={`/recordings/${note._id}`}
                className="group block rounded-xl border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-accent text-primary">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-display text-[15px] font-medium">
                        {note.title ?? 'Untitled note'}
                      </p>
                      {note.summary && (
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {note.summary}
                        </p>
                      )}
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                        {formatDate(note._creationTime)}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={note.status ?? 'ready'} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
