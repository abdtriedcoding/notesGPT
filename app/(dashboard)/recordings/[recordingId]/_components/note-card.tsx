'use client'

import { toast } from 'sonner'
import { Sparkles } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Badge } from '@/components/ui/badge'
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
  source?: 'ai' | 'manual'
  preview?: boolean
}

export default function NoteCard({
  _creationTime,
  action,
  title,
  _id,
  source,
  preview,
}: ActionItemProps) {
  const removeActionItem = useMutation(api.notes.removeActionItem)

  const handleRemoveActionItem = () => {
    const promise = removeActionItem({ id: _id })
    toast.promise(promise, {
      loading: 'Completing action item…',
      success: 'Action item completed',
      error: 'Failed to complete action item',
    })
  }

  return (
    <Card className="group rounded-xl border shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft-lg">
      <CardContent className="flex items-start gap-3 p-4">
        {!preview && (
          <Checkbox onClick={handleRemoveActionItem} className="mt-0.5" />
        )}
        <div className="min-w-0 flex-1 space-y-1.5 text-start">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[15px] font-medium leading-snug">{action}</p>
            {source === 'ai' && (
              <Badge
                variant="secondary"
                className="shrink-0 gap-1 font-mono text-[10px] uppercase tracking-[0.1em]"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                AI
              </Badge>
            )}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
            {title ? `${title} · ` : ''}
            {formatDate(_creationTime)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
