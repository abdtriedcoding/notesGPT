import { type Doc } from '@/convex/_generated/dataModel'
import { formatDate } from '@/lib/utils'

// A clean, single-page rendering of a note used only when printing (or saving
// as PDF). Hidden on screen; the interactive page is hidden in print. This
// avoids fighting the tabbed UI, which only mounts one panel at a time.
export function PrintableNote({
  note,
  actionItems,
}: {
  note: Doc<'notes'>
  actionItems: Doc<'actionItems'>[]
}) {
  const meta = [formatDate(note._creationTime)]
  if (note.language) meta.push(`Language: ${note.language}`)

  return (
    <article className="hidden text-black print:block">
      <header className="mb-6 border-b border-black/20 pb-4">
        <h1 className="text-2xl font-semibold">
          {note.title ?? 'Untitled note'}
        </h1>
        <p className="mt-1 text-sm text-black/60">{meta.join(' · ')}</p>
        {note.tags && note.tags.length > 0 && (
          <p className="mt-1 text-sm text-black/60">
            {note.tags.map((t) => `#${t}`).join('  ')}
          </p>
        )}
      </header>

      {note.summary && note.summary.trim().length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Summary</h2>
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
            {note.summary}
          </div>
        </section>
      )}

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Transcript</h2>
        {note.utterances && note.utterances.length > 0 ? (
          <div className="space-y-2 text-[15px] leading-relaxed">
            {note.utterances.map((u, i) => (
              <p key={i}>
                <span className="font-semibold">{u.speaker}:</span> {u.text}
              </p>
            ))}
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
            {note.transcription ?? '—'}
          </div>
        )}
      </section>

      {actionItems.length > 0 && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Action items</h2>
          <ul className="list-inside list-disc space-y-1 text-[15px]">
            {actionItems.map((item) => (
              <li key={item._id}>{item.action}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
