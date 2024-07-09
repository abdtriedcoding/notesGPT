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
  }).index('by_userId', ['userId']),
  actionItems: defineTable({
    noteId: v.id('notes'),
    userId: v.string(),
    action: v.string(),
  })
    .index('by_noteId', ['noteId'])
    .index('by_userId', ['userId']),
})
