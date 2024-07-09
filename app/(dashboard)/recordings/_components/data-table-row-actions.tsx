'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'
import { DeleteModel } from '@/components/delete-model'
import { ShareChatModel } from '@/components/sharechat-model'

export function DataTableRowActions({ id }: { id: Id<'notes'> }) {
  const router = useRouter()
  const removeNote = useMutation(api.notes.removeNote)

  const handelRemoveNote = () => {
    const promise = removeNote({
      id,
    })
    toast.promise(promise, {
      loading: 'Deleting Note...',
      success: 'Note Deleted',
      error: ' Failed to delete note.',
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
      <DropdownMenuContent align="end" className="w-[160px]">
        <Button
          onClick={() => router.push(`/recordings/${id}`)}
          variant={'outline'}
          className="w-full justify-start border-none px-2 py-1 text-start text-sm"
        >
          Edit
        </Button>
        <ShareChatModel id={id}>
          <Button
            variant={'outline'}
            className="w-full justify-start border-none px-2 py-1 text-start text-sm"
          >
            Share
          </Button>
        </ShareChatModel>
        <DeleteModel onConfirm={handelRemoveNote}>
          <Button
            variant={'outline'}
            className="w-full justify-start border-none px-2 py-1 text-start text-sm text-red-500 hover:text-red-600"
          >
            Delete
          </Button>
        </DeleteModel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
