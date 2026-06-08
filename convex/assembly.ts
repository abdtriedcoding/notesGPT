'use node'

import { v } from 'convex/values'
import { AssemblyAI } from 'assemblyai'
import { internal } from './_generated/api'
import { requireEnv } from './env'
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

      // Auto-detect the language and label speakers. Both are best-effort:
      // diarization isn't available for every language, so utterances may come
      // back empty — we handle that downstream.
      const response = await client.transcripts.transcribe({
        audio_url: fileUrl,
        language_detection: true,
        speaker_labels: true,
      })

      if (response.status === 'error' || !response.text) {
        throw new Error(
          response.error ?? 'Transcription returned no spoken audio'
        )
      }

      const utterances = (response.utterances ?? []).map((u) => ({
        speaker: u.speaker,
        text: u.text,
        start: u.start,
        end: u.end,
      }))

      await ctx.runMutation(internal.internalMutations.saveTranscript, {
        noteId,
        transcript: response.text,
        utterances: utterances.length > 0 ? utterances : undefined,
        language: response.language_code ?? undefined,
      })
    } catch (error) {
      console.error('Transcription failed:', error)
      await ctx.runMutation(internal.internalMutations.markNoteFailed, {
        noteId,
      })
    }
  },
})
