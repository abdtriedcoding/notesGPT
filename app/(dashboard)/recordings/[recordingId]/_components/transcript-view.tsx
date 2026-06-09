'use client'

import { type RefObject } from 'react'
import { cn, formatDuration } from '@/lib/utils'

export interface Utterance {
  speaker: string
  text: string
  start: number // milliseconds
  end: number // milliseconds
}

// Stable-ish color per speaker letter so "Speaker A" reads consistently.
const SPEAKER_COLORS = [
  'bg-primary/10 text-primary',
  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
]

function speakerColor(speaker: string): string {
  const code = speaker.charCodeAt(0) || 0
  return (
    SPEAKER_COLORS[code % SPEAKER_COLORS.length] ?? 'bg-primary/10 text-primary'
  )
}

interface TranscriptViewProps {
  utterances: Utterance[]
  // When provided, clicking a line seeks the audio to that moment.
  audioRef?: RefObject<HTMLAudioElement | null>
}

export function TranscriptView({ utterances, audioRef }: TranscriptViewProps) {
  const seekTo = (startMs: number) => {
    const audio = audioRef?.current
    if (!audio) return
    audio.currentTime = startMs / 1000
    void audio.play()
  }

  return (
    <div className="space-y-4">
      {utterances.map((u, i) => {
        const clickable = Boolean(audioRef)
        return (
          <div
            key={i}
            className={cn(
              'flex gap-3 rounded-lg p-2 -mx-2 transition-colors',
              clickable && 'cursor-pointer hover:bg-muted/60'
            )}
            onClick={clickable ? () => seekTo(u.start) : undefined}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={
              clickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      seekTo(u.start)
                    }
                  }
                : undefined
            }
          >
            <div className="flex w-16 shrink-0 flex-col items-start gap-1">
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide',
                  speakerColor(u.speaker)
                )}
              >
                {u.speaker}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                {formatDuration(u.start / 1000)}
              </span>
            </div>
            <p className="flex-1 text-[15px] leading-relaxed text-foreground/90">
              {u.text}
            </p>
          </div>
        )
      })}
    </div>
  )
}
