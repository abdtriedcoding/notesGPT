import { type Doc } from '@/convex/_generated/dataModel'
import { formatDate } from '@/lib/utils'

// Renders a note (plus its action items) as a self-contained Markdown document.
// Mirrors the shape shown in the app: title, metadata, summary, transcript,
// action items. Used by the export menu and reused as the file body.
export function noteToMarkdown(
  note: Doc<'notes'>,
  actionItems: Doc<'actionItems'>[]
): string {
  const lines: string[] = []

  lines.push(`# ${note.title ?? 'Untitled note'}`)
  lines.push('')

  const meta: string[] = [formatDate(note._creationTime)]
  if (note.language) meta.push(`Language: ${note.language}`)
  if (note.tags && note.tags.length > 0) {
    meta.push(`Tags: ${note.tags.map((t) => `#${t}`).join(' ')}`)
  }
  lines.push(`_${meta.join(' · ')}_`)
  lines.push('')

  if (note.summary && note.summary.trim().length > 0) {
    lines.push('## Summary')
    lines.push('')
    lines.push(note.summary.trim())
    lines.push('')
  }

  const transcriptBody = transcriptToMarkdown(note)
  if (transcriptBody) {
    lines.push('## Transcript')
    lines.push('')
    lines.push(transcriptBody)
    lines.push('')
  }

  if (actionItems.length > 0) {
    lines.push('## Action items')
    lines.push('')
    for (const item of actionItems) {
      lines.push(`- [ ] ${item.action}`)
    }
    lines.push('')
  }

  return lines.join('\n').trim() + '\n'
}

// Prefers the diarized, speaker-labeled transcript when available; otherwise
// falls back to the plain transcription. Returns '' when there's nothing.
function transcriptToMarkdown(note: Doc<'notes'>): string {
  if (note.utterances && note.utterances.length > 0) {
    return note.utterances
      .map((u) => `**${u.speaker}:** ${u.text}`)
      .join('\n\n')
  }
  return note.transcription?.trim() ?? ''
}

// Turns a title into a safe, lowercase filename slug.
function slugify(title: string | undefined): string {
  const base = (title ?? 'note')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base.length > 0 ? base : 'note'
}

// Triggers a client-side download of the note as a .md file.
export function downloadNoteMarkdown(
  note: Doc<'notes'>,
  actionItems: Doc<'actionItems'>[]
): void {
  const markdown = noteToMarkdown(note, actionItems)
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${slugify(note.title)}.md`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
