'use node'

import { v } from 'convex/values'
import Groq from 'groq-sdk'
import { internal } from './_generated/api'
import { type Id } from './_generated/dataModel'
import { requireEnv } from './env'
import { ASK_SYSTEM_PROMPT, SUMMARY_MODEL } from './constants'
import { internalAction } from './_generated/server'

// Generates the assistant reply for a thread: pulls grounding transcripts,
// asks Groq, and saves the answer. Runs in Node because it calls the Groq SDK.
export const answer = internalAction({
  args: {
    threadId: v.id('chatThreads'),
    message: v.string(),
  },
  handler: async (ctx, { threadId, message }) => {
    const data = await ctx.runQuery(internal.chat.getThreadContext, {
      threadId,
      query: message,
    })
    if (!data) return

    let content: string
    let citedNoteIds: Id<'notes'>[] = []

    try {
      if (data.context.length === 0) {
        content = data.scoped
          ? "This note doesn't have a transcript yet, so I can't answer questions about it."
          : "I couldn't find anything in your notes that answers that."
      } else {
        const contextText = data.context
          .map((c, i) => `Note ${i + 1} — "${c.title}":\n${c.text}`)
          .join('\n\n---\n\n')

        const groq = new Groq({ apiKey: requireEnv('GROQ_API_KEY') })
        const completion = await groq.chat.completions.create({
          model: SUMMARY_MODEL,
          messages: [
            { role: 'system', content: ASK_SYSTEM_PROMPT },
            {
              role: 'user',
              content: `Note context:\n${contextText}\n\nQuestion: ${message}`,
            },
          ],
        })

        content =
          completion.choices[0]?.message?.content?.trim() ||
          "I couldn't generate an answer."
        // Only surface citations for all-notes answers; a note-scoped thread
        // is already about a single, known note.
        if (!data.scoped) {
          citedNoteIds = data.context.map((c) => c.noteId)
        }
      }

      await ctx.runMutation(internal.chat.saveAnswer, {
        threadId,
        userId: data.userId,
        content,
        citedNoteIds,
      })
    } catch (error) {
      console.error('Ask failed:', error)
      await ctx.runMutation(internal.chat.saveAnswer, {
        threadId,
        userId: data.userId,
        content: 'Something went wrong answering that. Please try again.',
        citedNoteIds: [],
      })
    }
  },
})
