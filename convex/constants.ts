export const NOTE_STATUS = {
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed',
} as const

export type NoteStatus = (typeof NOTE_STATUS)[keyof typeof NOTE_STATUS]

// AssemblyAI
export const TRANSCRIPTION_LANGUAGE = 'en'

// Groq
export const SUMMARY_MODEL = 'llama-3.3-70b-versatile'

// Cap on how many action items the model may return, to bound output size.
export const MAX_ACTION_ITEMS = 10

export const SUMMARY_SYSTEM_PROMPT =
  'You are given a transcript of a voice message. Extract a short title, a concise summary, and any concrete action items (tasks, to-dos, follow-ups) mentioned. Each action item must be a short imperative phrase. If there are no clear tasks, return an empty array. Respond ONLY with JSON in this exact shape: {"title": "string", "summary": "string", "actionItems": ["string"]}'
