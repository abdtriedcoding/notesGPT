export const NOTE_STATUS = {
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed',
} as const

export type NoteStatus = (typeof NOTE_STATUS)[keyof typeof NOTE_STATUS]

// AssemblyAI
// Fallback language when detection is unavailable. The pipeline auto-detects.
export const TRANSCRIPTION_LANGUAGE = 'en'

// Groq
export const SUMMARY_MODEL = 'llama-3.3-70b-versatile'

// Cap on how many action items the model may return, to bound output size.
export const MAX_ACTION_ITEMS = 10

// Every prompt must return the same JSON shape so the parser is uniform.
const JSON_CONTRACT =
  'Respond ONLY with JSON in this exact shape: {"title": "string", "summary": "string", "actionItems": ["string"]}. Each action item is a short imperative phrase; use an empty array if there are none.'

export const SUMMARY_SYSTEM_PROMPT = `You are given a transcript of a voice message. Extract a short title, a concise summary, and any concrete action items (tasks, to-dos, follow-ups) mentioned. ${JSON_CONTRACT}`

// Summary styles the user can pick. Each reshapes the summary framing but keeps
// the same JSON contract (title + summary + actionItems).
export const NOTE_TEMPLATES = [
  'default',
  'meeting',
  'lecture',
  'journal',
  'email',
  'blog',
] as const

export type NoteTemplate = (typeof NOTE_TEMPLATES)[number]

// User-facing labels + descriptions for the template picker.
export const TEMPLATE_OPTIONS: Record<
  NoteTemplate,
  { label: string; description: string }
> = {
  default: { label: 'General note', description: 'A clean, neutral summary.' },
  meeting: {
    label: 'Meeting notes',
    description: 'Decisions, discussion points, and next steps.',
  },
  lecture: {
    label: 'Lecture notes',
    description: 'Key concepts and takeaways, study-friendly.',
  },
  journal: {
    label: 'Journal entry',
    description: 'A reflective, first-person recap.',
  },
  email: { label: 'Email draft', description: 'A ready-to-send email body.' },
  blog: { label: 'Blog outline', description: 'A structured post outline.' },
}

export const SUMMARY_PROMPTS: Record<NoteTemplate, string> = {
  default: SUMMARY_SYSTEM_PROMPT,
  meeting: `You are given a transcript of a meeting. Produce a short title; a summary written as meeting notes covering decisions made, key discussion points, and agreed next steps; and the concrete action items. ${JSON_CONTRACT}`,
  lecture: `You are given a transcript of a lecture or talk. Produce a short title; a study-friendly summary of the key concepts, definitions, and takeaways; and any action items such as readings or assignments. ${JSON_CONTRACT}`,
  journal: `You are given a transcript of a spoken journal entry. Produce a short title; a reflective first-person recap that preserves the speaker's voice; and any action items they mentioned. ${JSON_CONTRACT}`,
  email: `You are given a transcript dictating an email. Produce a short title (the subject line); a summary field containing a polished, ready-to-send email body; and any action items implied. ${JSON_CONTRACT}`,
  blog: `You are given a transcript of spoken ideas for a blog post. Produce a short title; a summary field containing a structured post outline with headings and bullet points; and any action items such as research to do. ${JSON_CONTRACT}`,
}

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
