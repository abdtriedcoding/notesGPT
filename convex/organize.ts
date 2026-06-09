import { v } from 'convex/values'
import { buildSearchBlob } from './constants'
import { mutation } from './_generated/server'

// Bounds to keep tag arrays small and the note doc well under Convex's limit.
const MAX_TAGS = 20
const MAX_TAG_LENGTH = 40

// Normalizes a raw tag list: trims, drops blanks, caps length, de-dupes
// case-insensitively (keeping first-seen casing), and caps the count.
function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const raw of tags) {
    const tag = raw.trim().slice(0, MAX_TAG_LENGTH)
    if (tag.length === 0) continue
    const key = tag.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    result.push(tag)
    if (result.length >= MAX_TAGS) break
  }
  return result
}

// Replaces a note's tags wholesale. Recomputes searchBlob so tags stay
// findable via full-text search.
export const updateNoteTags = mutation({
  args: {
    id: v.id('notes'),
    tags: v.array(v.string()),
  },
  handler: async (ctx, { id, tags }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const note = await ctx.db.get(id)
    if (!note) {
      throw new Error('Note not found')
    }
    if (note.userId !== identity.subject) {
      throw new Error('Not your note')
    }

    const normalized = normalizeTags(tags)
    await ctx.db.patch(id, {
      tags: normalized,
      searchBlob: buildSearchBlob({
        title: note.title,
        summary: note.summary,
        transcription: note.transcription,
        tags: normalized,
      }),
    })
  },
})
