;('use node')

import { v } from 'convex/values'
import { AssemblyAI } from 'assemblyai'
import { internal } from './_generated/api'
import { internalAction, internalMutation } from './_generated/server'

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY!,
})

export const doTranscribe = internalAction({
  args: {
    fileUrl: v.string(),
    noteId: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { fileUrl, noteId } = args
    const data = {
      audio_url: fileUrl,
    }

    const responce = await client.transcripts.transcribe(data)
    const transcript = responce.text || 'error'
    await ctx.runMutation(internal.assembly.saveTranscript, {
      noteId,
      transcript,
    })
  },
})

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

    await ctx.scheduler.runAfter(0, internal.gemini.chat, {
      noteId,
      transcript,
    })
  },
})
