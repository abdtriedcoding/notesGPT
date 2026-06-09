'use client'

import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Mic, Square, Upload } from 'lucide-react'
import { formatTime, getCurrentFormattedDate } from '@/lib/utils'

import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {
  NOTE_TEMPLATES,
  TEMPLATE_OPTIONS,
  type NoteTemplate,
} from '@/convex/constants'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type RecordState = 'idle' | 'recording' | 'uploading'

const STATE_LABEL: Record<RecordState, string> = {
  idle: 'Record a voice note',
  recording: 'Listening…',
  uploading: 'Processing your note…',
}

export default function RecordPage() {
  const router = useRouter()
  const [state, setState] = useState<RecordState>('idle')
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [template, setTemplate] = useState<NoteTemplate>('default')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const generateUploadUrl = useMutation(api.notes.generateUploadUrl)
  const createNote = useMutation(api.notes.createNote)

  useEffect(() => {
    if (state !== 'recording') return
    const interval = setInterval(
      () => setTotalSeconds((prev) => prev + 1),
      1000
    )
    return () => clearInterval(interval)
  }, [state])

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const audioChunks: Blob[] = []

      recorder.ondataavailable = (e) => audioChunks.push(e.data)

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        setState('uploading')
        try {
          const mimeType = recorder.mimeType || 'audio/webm'
          const audioBlob = new Blob(audioChunks, { type: mimeType })
          const postUrl = await generateUploadUrl()
          const result = await fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': mimeType },
            body: audioBlob,
          })
          if (!result.ok) {
            throw new Error('Upload failed. Please try again.')
          }
          const { storageId } = await result.json()
          const noteId = await createNote({ storageId, template })
          router.push(`/recordings/${noteId}`)
        } catch (error) {
          setState('idle')
          setTotalSeconds(0)
          toast.error(
            error instanceof Error
              ? error.message
              : 'Something went wrong saving your note.'
          )
        }
      }

      mediaRecorderRef.current = recorder
      setTotalSeconds(0)
      setState('recording')
      recorder.start()
    } catch {
      toast.error(
        'Microphone access was blocked. Enable it in your browser settings and try again.'
      )
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
  }

  // Upload an existing audio or video file instead of recording live. Reuses
  // the same storage-upload → createNote path as a recording.
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-selecting the same file later
    if (!file) return

    setState('uploading')
    try {
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      })
      if (!result.ok) {
        throw new Error('Upload failed. Please try again.')
      }
      const { storageId } = await result.json()
      const noteId = await createNote({ storageId, template })
      router.push(`/recordings/${noteId}`)
    } catch (error) {
      setState('idle')
      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong uploading your file.'
      )
    }
  }

  const handleClick = () => {
    if (state === 'idle') void startRecording()
    else if (state === 'recording') stopRecording()
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-12">
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
        {STATE_LABEL[state]}
      </h1>
      <p className="mt-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {getCurrentFormattedDate()}
      </p>

      {state === 'idle' && (
        <div className="mt-8 w-full max-w-xs space-y-1.5">
          <label className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Summary style
          </label>
          <Select
            value={template}
            onValueChange={(v) => setTemplate(v as NoteTemplate)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NOTE_TEMPLATES.map((t) => (
                <SelectItem key={t} value={t}>
                  {TEMPLATE_OPTIONS[t].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {TEMPLATE_OPTIONS[template].description}
          </p>
        </div>
      )}

      <div className="py-16">
        <div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center sm:h-[316px] sm:w-[316px]">
          <div
            className={`recording-box absolute h-full w-full rounded-full opacity-90 ${
              state === 'recording' ? 'record-animation' : ''
            }`}
          />
          <div className="absolute flex h-[88%] w-[88%] items-center justify-center rounded-full bg-background">
            <span className="font-sans text-5xl font-semibold tabular-nums sm:text-6xl">
              {formatTime(Math.floor(totalSeconds / 60))}:
              {formatTime(totalSeconds % 60)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={state === 'uploading'}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 sm:h-24 sm:w-24"
        aria-label={state === 'recording' ? 'Stop recording' : 'Start recording'}
      >
        {state === 'idle' && <Mic className="h-8 w-8" />}
        {state === 'recording' && (
          <Square className="h-7 w-7 fill-current" />
        )}
        {state === 'uploading' && <Loader2 className="h-8 w-8 animate-spin" />}
      </button>

      <p className="mt-6 text-sm text-muted-foreground">
        {state === 'idle' && 'Tap the mic and start speaking'}
        {state === 'recording' && 'Tap again to stop and transcribe'}
        {state === 'uploading' && 'Hang tight, this only takes a moment'}
      </p>

      {state === 'idle' && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-soft transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Upload className="h-4 w-4" />
            Upload an audio or video file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
