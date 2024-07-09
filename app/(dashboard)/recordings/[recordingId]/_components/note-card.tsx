import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Checkbox } from '@/components/ui/checkbox'
import { type Id } from '@/convex/_generated/dataModel'
import { Card, CardContent } from '@/components/ui/card'

interface ActionItemProps {
  _id: Id<'actionItems'>
  _creationTime: number
  userId: string
  noteId: Id<'notes'>
  action: string
  title?: string
  preview?: boolean
}

export default function NoteCard({
  _creationTime,
  action,
  title,
  _id,
  preview,
}: ActionItemProps) {
  const removeActionItem = useMutation(api.notes.removeActionItem)

  const handleremoveActionItem = () => {
    const promise = removeActionItem({
      id: _id,
    })
    toast.promise(promise, {
      loading: 'Deleting action item...',
      success: 'Action item completed',
      error: ' Failed to delete action item',
    })
  }

  return (
    <Card>
      <CardContent className="space-y-2 text-start">
        <div className="flex items-center space-x-4">
          {!preview && <Checkbox onClick={handleremoveActionItem} />}
          <p className="text-start text-sm text-muted-foreground">{action}</p>
        </div>
        <p className="text-sm font-medium leading-none">
          From: {title ?? 'No Title'}
        </p>
        <p className="text-end text-sm font-normal leading-none text-zinc-300">
          {formatDate(_creationTime)}
        </p>
      </CardContent>
    </Card>
  )
}
