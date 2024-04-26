import { v } from "convex/values";
import { mutation } from "./_generated/server";

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

    return noteId;
  },
});
