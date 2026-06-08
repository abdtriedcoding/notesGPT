'use client'

import { Download, FileDown, Printer } from 'lucide-react'
import { type Doc } from '@/convex/_generated/dataModel'

import { downloadNoteMarkdown } from '@/lib/export'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Export options for a note: download as Markdown, or print / save as PDF via
// the browser's print dialog (a print stylesheet renders a clean page).
export function ExportMenu({
  note,
  actionItems,
}: {
  note: Doc<'notes'>
  actionItems: Doc<'actionItems'>[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => downloadNoteMarkdown(note, actionItems)}>
          <FileDown className="mr-2 h-4 w-4" />
          Download Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print / Save as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
