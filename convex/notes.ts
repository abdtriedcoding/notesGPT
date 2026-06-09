import { v } from 'convex/values'
import { internal } from './_generated/api'
import { NOTE_STATUS } from './constants'
import { mutation, query } from './_generated/server'

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl()
})

export const createNote = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, { storageId }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject

    const fileUrl = await ctx.storage.getUrl(storageId)
    if (!fileUrl) {
      throw new Error('Could not resolve the uploaded audio file URL')
    }

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
      status: NOTE_STATUS.PROCESSING,
    })

    await ctx.scheduler.runAfter(0, internal.assembly.doTranscribe, {
      fileUrl,
      noteId,
    })

    return noteId
  },
})

export const getUserNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject

    const notes = await ctx.db
      .query('notes')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .order('desc')
      .collect()

    return notes
  },
})

// Private query: returns a note only to its owner. Returns null (rather than
// throwing) for a missing note or a note owned by someone else, so the UI can
// render a clean "not found" state.
export const getNoteById = query({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }

    const note = await ctx.db.get(id)
    if (!note || note.userId !== identity.subject) {
      return null
    }

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', note._id))
      .order('desc')
      .collect()

    return { note, actionItems }
  },
})

// Public query for the shareable note page. Intentionally unauthenticated, but
// keyed by an opaque, unguessable shareId (not the raw note id) so notes can't
// be enumerated. Returns null if the token doesn't resolve.
export const getSharedNote = query({
  args: {
    shareId: v.string(),
  },
  handler: async (ctx, { shareId }) => {
    const note = await ctx.db
      .query('notes')
      .withIndex('by_shareId', (q) => q.eq('shareId', shareId))
      .unique()
    if (!note) {
      return null
    }

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', note._id))
      .order('desc')
      .collect()

    return { note, actionItems }
  },
})

// Generates (or returns the existing) opaque share token for a note. Only the
// owner can create a link. Returns the shareId for building the public URL.
export const createShareLink = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, { id }) => {
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

    if (note.shareId) {
      return note.shareId
    }

    const shareId = crypto.randomUUID()
    await ctx.db.patch(id, { shareId })
    return shareId
  },
})

// Re-runs the transcription → summarization pipeline for a note (e.g. after a
// failure). Clears AI-generated action items first so they aren't duplicated;
// manual items are preserved.
export const reprocessNote = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, { id }) => {
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
    if (!note.audioFileUrl) {
      throw new Error('This note has no audio to reprocess')
    }

    const existing = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', id))
      .collect()
    await Promise.all(
      existing
        .filter((item) => item.source === 'ai')
        .map((item) => ctx.db.delete(item._id))
    )

    await ctx.db.patch(id, { status: NOTE_STATUS.PROCESSING })

    await ctx.scheduler.runAfter(0, internal.assembly.doTranscribe, {
      fileUrl: note.audioFileUrl,
      noteId: id,
    })
  },
})

export const removeNote = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { id } = args
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const note = await ctx.db.get(id)

    if (!note) {
      throw new Error('Note not found')
    }

    const userId = identity.subject

    if (note.userId !== userId) {
      throw new Error('Not your note')
    }

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', id))
      .collect()

    await Promise.all(actionItems.map((item) => ctx.db.delete(item._id)))

    const promise = await ctx.db.delete(id)

    return promise
  },
})

export const createActionItem = mutation({
  args: {
    noteId: v.id('notes'),
    action: v.string(),
  },
  handler: async (ctx, { noteId, action }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject

    const note = await ctx.db.get(noteId)
    if (!note) {
      throw new Error('Not found')
    }

    if (note.userId !== userId) {
      throw new Error('Unauthorized')
    }

    const promise = await ctx.db.insert('actionItems', {
      userId,
      noteId,
      action,
      source: 'manual',
    })
    return promise
  },
})

export const getActionItems = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .order('desc')
      .collect()

    // Batch-fetch the parent notes once instead of one query per action item.
    const noteIds = [...new Set(actionItems.map((item) => item.noteId))]
    const notes = await Promise.all(noteIds.map((id) => ctx.db.get(id)))
    const titleByNoteId = new Map(
      notes.filter((note) => note !== null).map((note) => [note!._id, note!.title])
    )

    return actionItems
      .filter((item) => titleByNoteId.has(item.noteId))
      .map((item) => ({ ...item, title: titleByNoteId.get(item.noteId) }))
  },
})

export const removeActionItem = mutation({
  args: {
    id: v.id('actionItems'),
  },
  handler: async (ctx, args) => {
    const { id } = args
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }

    const actionItem = await ctx.db.get(id)

    if (!actionItem) {
      throw new Error('Action Item not found')
    }

    const userId = identity.subject

    if (actionItem.userId !== userId) {
      throw new Error('Not your action item')
    }

    const promise = await ctx.db.delete(id)
    return promise
  },
})
