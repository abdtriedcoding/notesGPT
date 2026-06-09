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

// Builds the full-text search blob for a note from its text fields. Kept in
// one place so every write path (transcript, summary, manual edit) produces a
// consistent index value.
export function buildSearchBlob(fields: {
  title?: string
  summary?: string
  transcription?: string
}): string {
  return [fields.title, fields.summary, fields.transcription]
    .filter((part): part is string => Boolean(part && part.trim().length > 0))
    .join('\n')
}

// "Ask your notes" — chat over transcripts.
// How many notes to retrieve as context for an all-notes question.
export const ASK_RETRIEVAL_LIMIT = 6
// Cap per-transcript characters stuffed into the prompt, to bound token use.
export const ASK_TRANSCRIPT_CHAR_LIMIT = 6000

export const ASK_SYSTEM_PROMPT =
  'You are a helpful assistant answering questions about the user\'s own voice notes. Answer ONLY using the provided note context. If the answer is not in the context, say you could not find it in their notes. Be concise. When you use a specific note, mention its title.'
