'use node'

import { v } from 'convex/values'
import { AssemblyAI } from 'assemblyai'
import { internal } from './_generated/api'
import { internalAction } from './_generated/server'

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

    const responce = await client.transcripts.transcribe({
      audio_url: fileUrl,
      language_code: 'en',
    })

    if (responce.status === 'error') {
      console.error('AssemblyAI transcription error:', responce.error)
    }

    const transcript = responce.text || 'error'
    await ctx.runMutation(internal.internalMutations.saveTranscript, {
      noteId,
      transcript,
    })
  },
})
