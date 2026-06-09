'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis, Pencil, Share2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'
import { DeleteModal } from '@/components/delete-modal'
import ShareNoteModal from '@/components/share-note-modal'

export function DataTableRowActions({ id }: { id: Id<'notes'> }) {
  const router = useRouter()
  const removeNote = useMutation(api.notes.removeNote)

  const handleRemoveNote = () => {
    const promise = removeNote({ id })
    toast.promise(promise, {
      loading: 'Deleting note…',
      success: 'Note deleted',
      error: 'Failed to delete note',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[170px]">
        <DropdownMenuItem onClick={() => router.push(`/recordings/${id}`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Open
        </DropdownMenuItem>
        <ShareNoteModal noteId={id}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
        </ShareNoteModal>
        <DropdownMenuSeparator />
        <DeleteModal onConfirm={handleRemoveNote}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DeleteModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
