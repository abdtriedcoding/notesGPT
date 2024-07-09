import { toast } from 'sonner'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ActionForm({ id }: { id: Id<'notes'> }) {
  const [input, setInput] = useState('')
  const createActionItem = useMutation(api.notes.createActionItem)

  const handleCreateAction = () => {
    if (!input.trim()) {
      return toast.error('Input is empty')
    }

    const promise = createActionItem({
      noteId: id,
      action: input.trim(),
    })
    toast.promise(promise, {
      loading: 'Creating action item...',
      success: 'Action item created',
      error: 'Failed to create action item',
    })
    setInput('')
  }

  return (
    <form
      action={handleCreateAction}
      className="flex w-full items-center space-x-2"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Add action for this note..."
      />
      <Button type="submit">Add Action</Button>
    </form>
  )
}
