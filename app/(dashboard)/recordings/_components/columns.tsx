'use client'

import { formatDate } from '@/lib/utils'
import { type ColumnDef } from '@tanstack/react-table'
import { type Id } from '@/convex/_generated/dataModel'
import { DataTableRowActions } from './data-table-row-actions'
import { DataTableColumnHeader } from './data-table-column-header'

interface Note {
  _creationTime: number
  _id: Id<'notes'>
  audioFileId: string
  audioFileUrl: string
  summary?: string
  title?: string
  transcription?: string
  userId: string
}

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('title')}
        </span>
      )
    },
  },
  {
    accessorKey: '_creationTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {formatDate(row.getValue('_creationTime'))}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { _id } = row.original
      return <DataTableRowActions id={_id} />
    },
  },
]
