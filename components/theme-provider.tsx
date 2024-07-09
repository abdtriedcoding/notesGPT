'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Provider as BalancerProvider } from 'react-wrap-balancer'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <BalancerProvider>{children}</BalancerProvider>
    </NextThemesProvider>
  )
}
