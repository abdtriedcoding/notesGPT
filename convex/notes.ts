import { v } from 'convex/values'
import { internal } from './_generated/api'
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

    const fileUrl = (await ctx.storage.getUrl(storageId))!

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
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

// Currently not a good solution its just a working prototype query. Need to make seprate query for getting particular note from id and getting share note page. Need to add confirm user identity and other edge cases.
export const getNoteById = query({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { id } = args
    // const identity = await ctx.auth.getUserIdentity()
    // if (!identity) {
    //   throw new Error('Not authenticated')
    // }

    // const userId = identity.subject

    // if (!userId) {
    //   throw new Error('Not authenticated')
    // }

    const note = await ctx.db.get(id)
    if (!note) {
      throw new Error('Not found')
    }

    // if (note.userId !== userId) {
    //   throw new Error('Unauthorized')
    // }

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', note._id))
      .order('desc')
      .collect()

    return { note, actionItems }
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

    let modifiedActionItems = []
    for (let item of actionItems) {
      const note = await ctx.db.get(item.noteId)
      if (!note) continue
      modifiedActionItems.push({
        ...item,
        title: note.title,
      })
    }

    return modifiedActionItems
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
