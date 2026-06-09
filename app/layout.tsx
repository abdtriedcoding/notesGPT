import './globals.css'
import { Toaster } from 'sonner'
import { type Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { ConvexProvider } from '@/components/providers/convex-provider'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const fontSans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

// Editorial serif for display headings — high-contrast, with italics for accents.
const fontDisplay = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

// Monospace for eyebrows, captions and terminal-style UI.
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'NotesGPT',
    template: `%s — NotesGPT`,
  },
  metadataBase: new URL('https://notessgpt.vercel.app'),
  description:
    'NotesGPT seamlessly converts your voice notes into organized summaries and clear action items using AI.',
  keywords: [
    'Voice Note Conversion',
    'AI Note Making',
    'Automated Summaries',
    'Task Management',
    'Project Management',
    'Voice to Text',
  ],
  authors: [
    {
      name: 'abdtriedcoding',
      url: 'https://abdullahsidd.vercel.app',
    },
  ],
  creator: 'abdtriedcoding',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://notessgpt.vercel.app',
    title: 'NotesGPT',
    description:
      'NotesGPT seamlessly converts your voice notes into organized summaries and clear action items using AI.',
    siteName: 'NotesGPT',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'NotesGPT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NotesGPT',
    description:
      'NotesGPT seamlessly converts your voice notes into organized summaries and clear action items using AI.',
    images: ['/thumbnail.png'],
    creator: '@abdtriedcoding',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexProvider>
      <html
        lang="en"
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      >
        <body className="font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen w-full">
              <Toaster theme="system" richColors />
              {children}
              <Analytics />
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ConvexProvider>
  )
}
