import { v } from 'convex/values'
import { internal } from './_generated/api'
import { NOTE_STATUS } from './constants'
import { internalMutation } from './_generated/server'

export const saveTranscript = internalMutation({
  args: {
    noteId: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, transcript } = args

    await ctx.db.patch(noteId, {
      transcription: transcript,
    })

    await ctx.scheduler.runAfter(0, internal.summarize.chat, {
      noteId,
      transcript,
    })
  },
})

export const saveSummary = internalMutation({
  args: {
    noteId: v.id('notes'),
    summary: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, summary, title } = args
    await ctx.db.patch(noteId, {
      summary,
      title,
      status: NOTE_STATUS.READY,
    })
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
