import { buildSearchBlob } from './constants'
import { internalMutation } from './_generated/server'

// One-shot maintenance: populate searchBlob for notes created before full-text
// search existed, so they become findable by /search and Ask-your-notes.
// Run once with: npx convex run backfill:backfillSearchBlob
export const backfillSearchBlob = internalMutation({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query('notes').collect()
    let updated = 0
    for (const note of notes) {
      const blob = buildSearchBlob({
        title: note.title,
        summary: note.summary,
        transcription: note.transcription,
      })
      if (blob !== (note.searchBlob ?? '')) {
        await ctx.db.patch(note._id, { searchBlob: blob })
        updated++
      }
    }
    return { scanned: notes.length, updated }
  },
})
