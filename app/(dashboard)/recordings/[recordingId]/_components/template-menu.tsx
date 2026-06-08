'use client'

import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { Wand2 } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'
import {
  NOTE_TEMPLATES,
  TEMPLATE_OPTIONS,
  type NoteTemplate,
} from '@/convex/constants'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Lets the user re-summarize a note in a different style. Changing the value
// patches the template and re-runs the pipeline.
export function TemplateMenu({
  noteId,
  current,
}: {
  noteId: Id<'notes'>
  current: NoteTemplate
}) {
  const reprocess = useMutation(api.notes.reprocessNote)

  const onChange = (value: string) => {
    const template = value as NoteTemplate
    if (template === current) return
    const promise = reprocess({ id: noteId, template })
    toast.promise(promise, {
      loading: `Re-summarizing as ${TEMPLATE_OPTIONS[template].label}…`,
      success: 'Re-summarizing your note…',
      error: 'Failed to re-summarize',
    })
  }

  return (
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-[190px] gap-2 text-sm">
        <Wand2 className="h-4 w-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {NOTE_TEMPLATES.map((t) => (
          <SelectItem key={t} value={t}>
            {TEMPLATE_OPTIONS[t].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
