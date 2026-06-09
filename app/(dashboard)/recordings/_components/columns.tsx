'use client'

import { ArrowUpDown } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import { type Id } from '@/convex/_generated/dataModel'
import { StatusBadge, type NoteStatus } from '@/components/status-badge'
import { DataTableRowActions } from './data-table-row-actions'

interface Note {
  _creationTime: number
  _id: Id<'notes'>
  audioFileId: string
  audioFileUrl: string
  summary?: string
  title?: string
  transcription?: string
  status?: NoteStatus
  userId: string
}

function SortableHeader({
  column,
  title,
}: {
  column: Column<Note, unknown>
  title: string
}) {
  return (
    <Button
      variant="ghost"
      className="-ml-3 h-8 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown className="ml-2 h-3 w-3" />
    </Button>
  )
}

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.original.title
      return (
        <span className="block max-w-[420px] truncate font-display text-[15px] font-medium tracking-tight">
          {title ?? <span className="text-muted-foreground">Processing…</span>}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const status = row.original.status ?? 'ready'
      return <StatusBadge status={status} />
    },
  },
  {
    accessorKey: '_creationTime',
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {formatDate(row.getValue('_creationTime'))}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions id={row.original._id} />,
  },
]
