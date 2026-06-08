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
    // Opaque, unguessable token for the public /share route. Absent until the
    // owner generates a share link. Existing rows have no shareId.
    shareId: v.optional(v.string()),
  })
    .index('by_userId', ['userId'])
    .index('by_shareId', ['shareId']),
  actionItems: defineTable({
    noteId: v.id('notes'),
    userId: v.string(),
    action: v.string(),
    // Distinguishes AI-extracted items from manually added ones. Optional for
    // migration safety: existing rows are treated as 'manual' by the UI.
    source: v.optional(v.union(v.literal('ai'), v.literal('manual'))),
  })
    .index('by_noteId', ['noteId'])
    .index('by_userId', ['userId']),
})
