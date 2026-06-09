'use client'

import { forwardRef, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

import { cn, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface AudioPlayerProps {
  src: string
  className?: string
}

// Styled wrapper around a native <audio> element. Forwards the underlying
// element ref so callers (e.g. transcript click-to-seek in a later phase) can
// drive playback position.
export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  function AudioPlayer({ src, className }, externalRef) {
    const internalRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const setRefs = (el: HTMLAudioElement | null) => {
      internalRef.current = el
      if (typeof externalRef === 'function') externalRef(el)
      else if (externalRef) externalRef.current = el
    }

    const togglePlay = () => {
      const audio = internalRef.current
      if (!audio) return
      if (audio.paused) void audio.play()
      else audio.pause()
    }

    const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = internalRef.current
      if (!audio) return
      const next = Number(e.target.value)
      audio.currentTime = next
      setCurrentTime(next)
    }

    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border bg-card p-3 shadow-soft',
          className
        )}
      >
        <Button
          type="button"
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="h-10 w-10 shrink-0 rounded-full"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 translate-x-px" />
          )}
        </Button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="any"
            value={currentTime}
            onChange={onSeek}
            aria-label="Seek"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="shrink-0 font-sans text-xs tabular-nums text-muted-foreground">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>
        </div>

        <audio
          ref={setRefs}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    )
  }
)
