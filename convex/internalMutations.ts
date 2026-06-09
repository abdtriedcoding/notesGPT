import { v } from 'convex/values'
import { internal } from './_generated/api'
import { NOTE_STATUS, buildSearchBlob } from './constants'
import { internalMutation, internalQuery } from './_generated/server'

export const saveTranscript = internalMutation({
  args: {
    noteId: v.id('notes'),
    transcript: v.string(),
    utterances: v.optional(
      v.array(
        v.object({
          speaker: v.string(),
          text: v.string(),
          start: v.number(),
          end: v.number(),
        })
      )
    ),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { noteId, transcript, utterances, language } = args

    const note = await ctx.db.get(noteId)

    await ctx.db.patch(noteId, {
      transcription: transcript,
      utterances,
      language,
      searchBlob: buildSearchBlob({
        title: note?.title,
        summary: note?.summary,
        transcription: transcript,
        tags: note?.tags,
      }),
    })

    await ctx.scheduler.runAfter(0, internal.summarize.chat, {
      noteId,
      transcript,
    })
  },
})

// Read-only helper for the summarization action (a Node action can't touch the
// db directly) to learn which template/language a note should be summarized as.
export const getNoteMeta = internalQuery({
  args: {
    noteId: v.id('notes'),
  },
  handler: async (ctx, { noteId }) => {
    const note = await ctx.db.get(noteId)
    if (!note) return null
    return { template: note.template, language: note.language }
  },
})

export const saveSummary = internalMutation({
  args: {
    noteId: v.id('notes'),
    summary: v.string(),
    title: v.string(),
    actionItems: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { noteId, summary, title, actionItems } = args

    const note = await ctx.db.get(noteId)
    if (!note) return

    await ctx.db.patch(noteId, {
      summary,
      title,
      status: NOTE_STATUS.READY,
      searchBlob: buildSearchBlob({
        title,
        summary,
        transcription: note.transcription,
        tags: note.tags,
      }),
    })

    // Clear any previously AI-generated items (e.g. on reprocess) so we don't
    // duplicate them. Manually added items are left untouched.
    const existing = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', noteId))
      .collect()
    await Promise.all(
      existing
        .filter((item) => item.source === 'ai')
        .map((item) => ctx.db.delete(item._id))
    )

    await Promise.all(
      actionItems.map((action) =>
        ctx.db.insert('actionItems', {
          noteId,
          userId: note.userId,
          action,
          source: 'ai',
        })
      )
    )
  },
})

export const markNoteFailed = internalMutation({
  args: {
    noteId: v.id('notes'),
  },
  handler: async (ctx, { noteId }) => {
    await ctx.db.patch(noteId, {
      status: NOTE_STATUS.FAILED,
    })
  },
})
