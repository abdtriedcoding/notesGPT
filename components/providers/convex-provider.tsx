'use client'

import { type ReactNode } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
if (!convexUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_CONVEX_URL. Add it to your .env.local file.'
  )
}

const convex = new ConvexReactClient(convexUrl)

export const ConvexProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
