import { getAuthToken } from '@/lib/utils'
import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { NotesWrapper } from './_components/notes-wrapper'

export default async function RecordingPage() {
  const token = await getAuthToken()
  const preloadedNotes = await preloadQuery(
    api.notes.getUserNotes,
    {},
    { token }
  )

  return <NotesWrapper preloadedNotes={preloadedNotes} />
}
