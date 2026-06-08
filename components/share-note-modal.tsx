'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'
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
  noteId: string
  children?: React.ReactNode
}

export default function ShareNoteModal({
  noteId,
  children,
}: ShareNoteModalProps) {
  const origin = useOrigin()
  const [copied, setCopied] = useState(false)

  const url = `${origin}/share/${noteId}`

  const onCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Dialog>
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
          <Input value={url} readOnly className="truncate" />
          <Button onClick={onCopy} disabled={copied} className="shrink-0">
            {copied ? (
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
