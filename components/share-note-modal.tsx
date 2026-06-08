'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { Check, Copy, Loader2, Share2 } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'
import { Input } from '@/components/ui/input'
import { useOrigin } from '@/hooks/use-origin'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ShareNoteModalProps {
  noteId: Id<'notes'>
  children?: React.ReactNode
}

export default function ShareNoteModal({
  noteId,
  children,
}: ShareNoteModalProps) {
  const origin = useOrigin()
  const createShareLink = useMutation(api.notes.createShareLink)
  const [shareId, setShareId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const url = shareId ? `${origin}/share/${shareId}` : ''

  // Generate (or fetch the existing) opaque share token when the dialog opens.
  const onOpenChange = async (open: boolean) => {
    if (open && !shareId) {
      try {
        const id = await createShareLink({ id: noteId })
        setShareId(id)
      } catch {
        toast.error('Failed to create share link')
      }
    }
  }

  const onCopy = async () => {
    if (!url) return
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm">
            <Share2 className="mr-1.5 h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this note</DialogTitle>
          <DialogDescription>
            Anyone with this link can view the transcript, summary, and action
            items.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            value={url}
            readOnly
            placeholder="Generating link…"
            className="truncate"
          />
          <Button
            onClick={onCopy}
            disabled={copied || !url}
            className="shrink-0"
          >
            {!url ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
