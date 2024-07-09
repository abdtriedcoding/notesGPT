import { getAuthToken } from '@/lib/utils'
import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import ActionItemsWrapper from './action-items-wrapper'

export default async function ActionItemsPage() {
  const token = await getAuthToken()
  const preloadedActionItems = await preloadQuery(
    api.notes.getActionItems,
    {},
    { token }
  )

  return <ActionItemsWrapper preloadedActionItems={preloadedActionItems} />
}
