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

export const SUMMARY_SYSTEM_PROMPT =
  'You are given a transcript of a voice message. Extract a short title and a concise summary. Respond ONLY with JSON in this exact shape: {"title": "string", "summary": "string"}'
