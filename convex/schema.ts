import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    audioFileId: v.string(),
    audioFileUrl: v.string(),
    title: v.optional(v.string()),
    transcription: v.optional(v.string()),
    summary: v.optional(v.string()),
    // Optional for migration safety: existing rows have no status and are
    // treated as 'ready' by the UI.
    status: v.optional(
      v.union(
        v.literal('processing'),
        v.literal('ready'),
        v.literal('failed')
      )
    ),
  }).index('by_userId', ['userId']),
  actionItems: defineTable({
    noteId: v.id('notes'),
    userId: v.string(),
    action: v.string(),
  })
    .index('by_noteId', ['noteId'])
    .index('by_userId', ['userId']),
})
