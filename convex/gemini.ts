;('use node')

import { v } from 'convex/values'
import { internal } from './_generated/api'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { internalAction, internalMutation } from './_generated/server'

interface TranscriptSummary {
  title: string
  summary: string
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export const chat = internalAction({
  args: {
    noteId: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, transcript } = args

    const prompt = `The following is a transcript of a voice message. Extract a title, summary from it and answer in JSON so that i can parse later, This is format: {"title": "string", "summary": "string"} Dont add extra information like starting with "json" just return in this {"title": "string", "summary": "string"} specified format. Use this example as refrence and give me output in exact that responce, const text = '{ "title": "Name and Current Status", "summary": "The speaker introduces themselves with their name and mentions that they\'re currently running, leaving the details about who they\'re running from or for unspecified." }'.
    Here is the transcript ${transcript}`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    const data: TranscriptSummary = JSON.parse(text)
    const { summary, title } = data
    await ctx.runMutation(internal.gemini.saveSummary, {
      noteId,
      summary,
      title,
    })
  },
})

export const saveSummary = internalMutation({
  args: {
    noteId: v.id('notes'),
    summary: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const { noteId, summary, title } = args
    await ctx.db.patch(noteId, {
      summary,
      title,
    })
  },
})
