'use node'

import { v } from 'convex/values'
import Groq from 'groq-sdk'
import { internal } from './_generated/api'
import { internalAction } from './_generated/server'

interface TranscriptSummary {
  title: string
  summary: string
}

export const chat = internalAction({
  args: {
    noteId: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, transcript } = args

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are given a transcript of a voice message. Extract a short title and a concise summary. Respond ONLY with JSON in this exact shape: {"title": "string", "summary": "string"}',
        },
        {
          role: 'user',
          content: `Here is the transcript:\n${transcript}`,
        },
      ],
    })

    const text = completion.choices[0]?.message?.content || '{}'
    const data: TranscriptSummary = JSON.parse(text)
    const { summary, title } = data

    await ctx.runMutation(internal.internalMutations.saveSummary, {
      noteId,
      summary,
      title,
    })
  },
})
