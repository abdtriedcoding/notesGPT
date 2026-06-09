import { v } from 'convex/values'
import { internal } from './_generated/api'
import {
  ASK_RETRIEVAL_LIMIT,
  ASK_TRANSCRIPT_CHAR_LIMIT,
} from './constants'
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from './_generated/server'

// Returns the existing thread for the given scope, creating it if needed.
// noteId set = a thread scoped to one note; noteId absent = the user's single
// all-notes thread.
export const getOrCreateThread = mutation({
  args: {
    noteId: v.optional(v.id('notes')),
  },
  handler: async (ctx, { noteId }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }
    const userId = identity.subject

    if (noteId) {
      const note = await ctx.db.get(noteId)
      if (!note || note.userId !== userId) {
        throw new Error('Not your note')
      }
      const existing = await ctx.db
        .query('chatThreads')
        .withIndex('by_noteId', (q) => q.eq('noteId', noteId))
        .filter((q) => q.eq(q.field('userId'), userId))
        .first()
      if (existing) return existing._id
      return await ctx.db.insert('chatThreads', { userId, noteId })
    }

    // All-notes thread: the one thread for this user with no noteId.
    const threads = await ctx.db
      .query('chatThreads')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .collect()
    const allNotes = threads.find((t) => t.noteId === undefined)
    if (allNotes) return allNotes._id
    return await ctx.db.insert('chatThreads', { userId })
  },
})

export const listMessages = query({
  args: {
    threadId: v.id('chatThreads'),
  },
  handler: async (ctx, { threadId }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }
    const thread = await ctx.db.get(threadId)
    if (!thread || thread.userId !== identity.subject) {
      return []
    }
    return await ctx.db
      .query('chatMessages')
      .withIndex('by_threadId', (q) => q.eq('threadId', threadId))
      .order('asc')
      .collect()
  },
})

// Records the user's message and schedules the assistant's reply (a Node
// action, since it calls Groq).
export const ask = mutation({
  args: {
    threadId: v.id('chatThreads'),
    message: v.string(),
  },
  handler: async (ctx, { threadId, message }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }
    const userId = identity.subject
    const thread = await ctx.db.get(threadId)
    if (!thread || thread.userId !== userId) {
      throw new Error('Not your thread')
    }
    const trimmed = message.trim()
    if (trimmed.length === 0) {
      throw new Error('Message is empty')
    }

    await ctx.db.insert('chatMessages', {
      threadId,
      userId,
      role: 'user',
      content: trimmed,
    })

    await ctx.scheduler.runAfter(0, internal.chatAnswer.answer, {
      threadId,
      message: trimmed,
    })
  },
})

// Internal: gathers the note transcripts that should ground the answer. For a
// note-scoped thread that's just the one note; for the all-notes thread it's a
// full-text retrieval over the question.
export const getThreadContext = internalQuery({
  args: {
    threadId: v.id('chatThreads'),
    query: v.string(),
  },
  handler: async (ctx, { threadId, query: question }) => {
    const thread = await ctx.db.get(threadId)
    if (!thread) return null
    const userId = thread.userId
    const scoped = thread.noteId !== undefined

    let notes
    if (thread.noteId) {
      const note = await ctx.db.get(thread.noteId)
      notes = note ? [note] : []
    } else {
      const trimmed = question.trim()
      notes =
        trimmed.length > 0
          ? await ctx.db
              .query('notes')
              .withSearchIndex('search_blob', (q) =>
                q.search('searchBlob', trimmed).eq('userId', userId)
              )
              .take(ASK_RETRIEVAL_LIMIT)
          : []
    }

    const context = notes
      .filter((n) => n.transcription && n.transcription.trim().length > 0)
      .map((n) => ({
        noteId: n._id,
        title: n.title ?? 'Untitled note',
        text: (n.transcription ?? '').slice(0, ASK_TRANSCRIPT_CHAR_LIMIT),
      }))

    return { userId, scoped, context }
  },
})

export const saveAnswer = internalMutation({
  args: {
    threadId: v.id('chatThreads'),
    userId: v.string(),
    content: v.string(),
    citedNoteIds: v.array(v.id('notes')),
  },
  handler: async (ctx, { threadId, userId, content, citedNoteIds }) => {
    await ctx.db.insert('chatMessages', {
      threadId,
      userId,
      role: 'assistant',
      content,
      citedNoteIds,
    })
  },
})
