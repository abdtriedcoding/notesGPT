import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const create = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { storageId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const fileUrl = (await ctx.storage.getUrl(storageId))!;

    const noteId = await ctx.db.insert("notes", {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
    });

    await ctx.scheduler.runAfter(0, internal.assembly.doTranscribe, {
      fileUrl,
      noteId,
    });

    return noteId;
  },
});

export const getUserNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return notes;
  },
});

export const getNoteById = query({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const note = await ctx.db.get(id);
    if (!note) {
      throw new Error("Not found");
    }

    if (note.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return note;
  },
});

export const createAction = mutation({
  args: {
    noteId: v.id("notes"),
    action: v.string(),
  },
  handler: async (ctx, { noteId, action }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const note = await ctx.db.get(noteId);
    if (!note) {
      throw new Error("Not found");
    }

    if (note.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const promise = await ctx.db.insert("actionItems", {
      userId,
      noteId,
      action,
    });
    return promise;
  },
});
