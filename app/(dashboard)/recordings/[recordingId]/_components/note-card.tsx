import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Checkbox } from '@/components/ui/checkbox'
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
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!preview && <Checkbox onClick={handleremoveActionItem} />}
            <p>{action}</p>
          </div>
          <p>{formatDate(_creationTime)}</p>
        </div>
        <p className="w-fit truncate pt-2 text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-gray-600 dark:text-gray-300 md:text-xl lg:text-xl">
          From: {title ?? 'No Title'}
        </p>
      </CardContent>
    </Card>
  )
}
