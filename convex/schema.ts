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
    // Concatenated title + summary + transcription, kept in sync on every
    // write, powering full-text search. Optional: old rows are absent until
    // re-processed/edited or backfilled.
    searchBlob: v.optional(v.string()),
  })
    .index('by_userId', ['userId'])
    .index('by_shareId', ['shareId'])
    .searchIndex('search_blob', {
      searchField: 'searchBlob',
      filterFields: ['userId'],
    }),
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
  // A conversation thread for "Ask your notes". noteId set = scoped to one
  // note; noteId absent = the user's single all-notes thread.
  chatThreads: defineTable({
    userId: v.string(),
    noteId: v.optional(v.id('notes')),
    title: v.optional(v.string()),
  })
    .index('by_userId', ['userId'])
    .index('by_noteId', ['noteId']),
  chatMessages: defineTable({
    threadId: v.id('chatThreads'),
    userId: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
    content: v.string(),
    // Notes the assistant drew on (all-notes answers); links back to them.
    citedNoteIds: v.optional(v.array(v.id('notes'))),
  }).index('by_threadId', ['threadId']),
})
