'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ActionForm({ id }: { id: Id<'notes'> }) {
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createActionItem = useMutation(api.notes.createActionItem)

  const handleCreateAction = async () => {
    const action = input.trim()
    if (!action) {
      toast.error('Please enter an action item first')
      return
    }

    setIsSubmitting(true)
    try {
      await createActionItem({ noteId: id, action })
      setInput('')
      toast.success('Action item added')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add action item'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      action={handleCreateAction}
      className="flex w-full items-center gap-2"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Add an action item for this note…"
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting} className="shrink-0">
        <Plus className="mr-1.5 h-4 w-4" />
        {isSubmitting ? 'Adding…' : 'Add'}
      </Button>
    </form>
  )
}
