'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { ArrowUp, FileText, Loader2, Sparkles } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Id } from '@/convex/_generated/dataModel'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ChatPanelProps {
  // Omit for the all-notes thread; pass a note id to scope the chat to one note.
  noteId?: Id<'notes'>
  placeholder?: string
  emptyHint?: string
}

export function ChatPanel({
  noteId,
  placeholder = 'Ask a question…',
  emptyHint = 'Ask anything about your notes.',
}: ChatPanelProps) {
  const getOrCreateThread = useMutation(api.chat.getOrCreateThread)
  const ask = useMutation(api.chat.ask)

  const [threadId, setThreadId] = useState<Id<'chatThreads'> | null>(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Resolve (or create) the thread for this scope once.
  useEffect(() => {
    let active = true
    getOrCreateThread({ noteId })
      .then((id) => {
        if (active) setThreadId(id)
      })
      .catch(() => toast.error('Could not start the chat'))
    return () => {
      active = false
    }
  }, [getOrCreateThread, noteId])

  const messages = useQuery(
    api.chat.listMessages,
    threadId ? { threadId } : 'skip'
  )

  const lastIsUser =
    messages && messages.length > 0
      ? messages[messages.length - 1]?.role === 'user'
      : false

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.length, lastIsUser])

  const handleSend = async () => {
    const message = input.trim()
    if (!message || !threadId || sending) return
    setSending(true)
    setInput('')
    try {
      await ask({ threadId, message })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send')
      setInput(message)
    } finally {
      setSending(false)
    }
  }

  const loading = messages === undefined || threadId === null

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-accent text-primary">
              <Sparkles className="h-6 w-6" />
            </span>
            <p className="max-w-xs text-sm text-muted-foreground">{emptyHint}</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m._id}
              className={cn(
                'flex',
                m.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] space-y-2 rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed',
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'border bg-card'
                )}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                {m.citedNoteIds && m.citedNoteIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.citedNoteIds.map((id, i) => (
                      <Link
                        key={id}
                        href={`/recordings/${id}`}
                        className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-0.5 font-sans text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <FileText className="h-3 w-3" />
                        Source {i + 1}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {lastIsUser && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border bg-card px-4 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        action={handleSend}
        className="mt-4 flex items-center gap-2 border-t pt-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={loading || sending || input.trim().length === 0}
          className="shrink-0 rounded-full"
          aria-label="Send"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
