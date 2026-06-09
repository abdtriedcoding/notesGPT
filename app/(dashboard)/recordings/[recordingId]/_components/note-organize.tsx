'use client'

import { toast } from 'sonner'
import { useState, type KeyboardEvent } from 'react'
import { useMutation } from 'convex/react'
import { Tag, X } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Doc, type Id } from '@/convex/_generated/dataModel'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

// Tag controls for the recording detail page. Edits persist immediately via
// Convex. (Folders are intentionally deferred to a future sidebar-style UI.)
export function NoteOrganize({ note }: { note: Doc<'notes'> }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-soft sm:p-5">
      <TagEditor noteId={note._id} tags={note.tags ?? []} />
    </div>
  )
}

function TagEditor({ noteId, tags }: { noteId: Id<'notes'>; tags: string[] }) {
  const updateTags = useMutation(api.organize.updateNoteTags)
  const [draft, setDraft] = useState('')

  const commit = (next: string[]) => {
    const promise = updateTags({ id: noteId, tags: next })
    promise.catch(() => toast.error('Failed to update tags'))
  }

  const addTag = () => {
    const value = draft.trim()
    if (value.length === 0) return
    if (tags.some((t) => t.toLowerCase() === value.toLowerCase())) {
      setDraft('')
      return
    }
    commit([...tags, value])
    setDraft('')
  }

  const removeTag = (tag: string) => {
    commit(tags.filter((t) => t !== tag))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && draft.length === 0) {
      const last = tags[tags.length - 1]
      if (last) removeTag(last)
    }
  }

  return (
    <div className="min-w-0 space-y-2">
      <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <Tag className="h-3.5 w-3.5" />
        Tags
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? 'Add a tag…' : 'Add…'}
          className="h-7 w-28 border-dashed bg-transparent px-2 text-sm shadow-none focus-visible:ring-1"
        />
      </div>
    </div>
  )
}
