'use client'

import { ArrowUpDown } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import { type Id } from '@/convex/_generated/dataModel'
import { StatusBadge, type NoteStatus } from '@/components/status-badge'
import { DataTableRowActions } from './data-table-row-actions'

export interface NoteRow {
  _creationTime: number
  _id: Id<'notes'>
  audioFileId: string
  audioFileUrl: string
  summary?: string
  title?: string
  transcription?: string
  status?: NoteStatus
  userId: string
  tags?: string[]
}

function SortableHeader({
  column,
  title,
}: {
  column: Column<NoteRow, unknown>
  title: string
}) {
  return (
    <Button
      variant="ghost"
      className="-ml-3 h-8 font-sans text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown className="ml-2 h-3 w-3" />
    </Button>
  )
}

function HeaderLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
      {children}
    </span>
  )
}

export const columns: ColumnDef<NoteRow>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.original.title
      return (
        <span className="block max-w-[420px] truncate font-sans text-[15px] font-medium tracking-tight">
          {title ?? <span className="text-muted-foreground">Processing…</span>}
        </span>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: () => <HeaderLabel>Tags</HeaderLabel>,
    enableSorting: false,
    // Matches if the row carries any of the selected tags (OR semantics).
    filterFn: (row, id, value: string[]) => {
      if (!value || value.length === 0) return true
      const tags = row.getValue<string[] | undefined>(id) ?? []
      return value.some((v) => tags.includes(v))
    },
    cell: ({ row }) => {
      const tags = row.original.tags ?? []
      if (tags.length === 0)
        return <span className="text-muted-foreground">—</span>
      return (
        <div className="flex max-w-[260px] flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-sans text-[10px] uppercase tracking-[0.08em]"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => <HeaderLabel>Status</HeaderLabel>,
    cell: ({ row }) => {
      const status = row.original.status ?? 'ready'
      return <StatusBadge status={status} />
    },
  },
  {
    accessorKey: '_creationTime',
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="font-sans text-xs text-muted-foreground">
        {formatDate(row.getValue('_creationTime'))}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions id={row.original._id} />,
  },
]
