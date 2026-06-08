'use node'

import { v } from 'convex/values'
import { AssemblyAI } from 'assemblyai'
import { internal } from './_generated/api'
import { requireEnv } from './env'
import { TRANSCRIPTION_LANGUAGE } from './constants'
import { internalAction } from './_generated/server'

export const doTranscribe = internalAction({
  args: {
    fileUrl: v.string(),
    noteId: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { fileUrl, noteId } = args

    try {
      const client = new AssemblyAI({ apiKey: requireEnv('ASSEMBLY_API_KEY') })

      const response = await client.transcripts.transcribe({
        audio_url: fileUrl,
        language_code: TRANSCRIPTION_LANGUAGE,
      })

      if (response.status === 'error' || !response.text) {
        throw new Error(
          response.error ?? 'Transcription returned no spoken audio'
        )
      }

      await ctx.runMutation(internal.internalMutations.saveTranscript, {
        noteId,
        transcript: response.text,
      })
    } catch (error) {
      console.error('Transcription failed:', error)
      await ctx.runMutation(internal.internalMutations.markNoteFailed, {
        noteId,
      })
    }
  },
})
