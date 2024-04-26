("use node");

import { v } from "convex/values";
import { AssemblyAI } from "assemblyai";
import { internal } from "./_generated/api";
import { internalAction, internalMutation } from "./_generated/server";

const client = new AssemblyAI({
  apiKey: "5b411bbe58dc4b19bc3cb3ed366b9296",
});

export const doTranscribe = internalAction({
  args: {
    fileUrl: v.string(),
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const data = {
      audio_url: args.fileUrl,
    };

    const responce = await client.transcripts.transcribe(data);
    const transcript = responce.text || "error";
    await ctx.runMutation(internal.assembly.saveTranscript, {
      noteId: args.noteId,
      transcript,
    });
  },
});

export const saveTranscript = internalMutation({
  args: {
    noteId: v.id("notes"),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, transcript } = args;

    await ctx.db.patch(noteId, {
      transcription: transcript,
    });
  },
});
