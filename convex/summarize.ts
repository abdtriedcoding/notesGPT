'use node'

import { v } from 'convex/values'
import Groq from 'groq-sdk'
import { internal } from './_generated/api'
import { requireEnv } from './env'
import {
  MAX_ACTION_ITEMS,
  SUMMARY_MODEL,
  SUMMARY_SYSTEM_PROMPT,
} from './constants'
import { internalAction } from './_generated/server'

interface TranscriptSummary {
  title: string
  summary: string
  actionItems: string[]
}

// Defensively coerce the model's actionItems field into a clean string[]:
// guard the type, trim, drop blanks, dedupe, and cap the length.
function parseActionItems(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const cleaned = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
  return [...new Set(cleaned)].slice(0, MAX_ACTION_ITEMS)
}

export const chat = internalAction({
  args: {
    noteId: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, transcript } = args

    try {
      const groq = new Groq({ apiKey: requireEnv('GROQ_API_KEY') })

      const completion = await groq.chat.completions.create({
        model: SUMMARY_MODEL,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
          { role: 'user', content: `Here is the transcript:\n${transcript}` },
        ],
      })

      const raw = completion.choices[0]?.message?.content || '{}'
      const data = JSON.parse(raw) as Partial<TranscriptSummary>

      await ctx.runMutation(internal.internalMutations.saveSummary, {
        noteId,
        title: data.title?.trim() || 'Untitled note',
        summary: data.summary?.trim() || 'No summary available.',
        actionItems: parseActionItems(data.actionItems),
      })
    } catch (error) {
      console.error('Summarization failed:', error)
      await ctx.runMutation(internal.internalMutations.markNoteFailed, {
        noteId,
      })
    }
  },
})
