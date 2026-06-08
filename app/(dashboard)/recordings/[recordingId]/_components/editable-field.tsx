'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { Check, Pencil, X } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface EditableFieldProps {
  noteId: Id<'notes'>
  field: 'title' | 'summary' | 'transcription'
  value: string
  multiline?: boolean
  placeholder?: string
  // Classes applied to the read-mode text (lets the title look like a heading
  // and the body look like prose).
  className?: string
}

export function EditableField({
  noteId,
  field,
  value,
  multiline = false,
  placeholder = 'Nothing here yet.',
  className,
}: EditableFieldProps) {
  const updateNoteFields = useMutation(api.notes.updateNoteFields)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [isSaving, setIsSaving] = useState(false)

  const startEditing = () => {
    setDraft(value)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (field === 'title' && draft.trim().length === 0) {
      toast.error('Title can’t be empty')
      return
    }
    setIsSaving(true)
    try {
      await updateNoteFields({ id: noteId, [field]: draft })
      toast.success('Saved')
      setIsEditing(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isSaving}
            autoFocus
            rows={8}
            className="text-[15px] leading-relaxed"
          />
        ) : (
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isSaving}
            autoFocus
            className="text-lg font-medium"
          />
        )}
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            <Check className="mr-1.5 h-4 w-4" />
            {isSaving ? 'Saving…' : 'Save'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(false)}
            disabled={isSaving}
          >
            <X className="mr-1.5 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  const hasValue = value.trim().length > 0
  const Tag = multiline ? 'div' : 'h1'

  return (
    <div className="group/edit relative flex items-start gap-2">
      <Tag
        className={cn(
          'min-w-0 flex-1 whitespace-pre-wrap',
          !hasValue && 'text-muted-foreground',
          className
        )}
      >
        {hasValue ? value : placeholder}
      </Tag>
      <Button
        size="icon"
        variant="ghost"
        onClick={startEditing}
        aria-label={`Edit ${field}`}
        className="h-7 w-7 shrink-0 text-muted-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover/edit:opacity-100"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
