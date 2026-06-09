'use client'

import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { Loader2, AlertCircle, ListTodo, RotateCw } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { type Doc, type Id } from '@/convex/_generated/dataModel'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChatPanel } from '@/components/chat-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmptyState } from '@/components/empty-state'
import NoteCard from '@/app/(dashboard)/recordings/[recordingId]/_components/note-card'
import ActionForm from '@/app/(dashboard)/recordings/[recordingId]/_components/action-form'
import { EditableField } from '@/app/(dashboard)/recordings/[recordingId]/_components/editable-field'

interface NoteTabsProps {
  note: Doc<'notes'>
  actionItems: Doc<'actionItems'>[]
  readOnly?: boolean
}

function ProcessingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card/50 py-16 text-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function FailedState({
  noteId,
  readOnly,
}: {
  noteId: Id<'notes'>
  readOnly: boolean
}) {
  const reprocessNote = useMutation(api.notes.reprocessNote)

  const handleRetry = () => {
    const promise = reprocessNote({ id: noteId })
    toast.promise(promise, {
      loading: 'Restarting processing…',
      success: 'Processing restarted',
      error: 'Failed to restart processing',
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 py-16 text-center">
      <AlertCircle className="h-6 w-6 text-destructive" />
      <p className="text-sm font-medium text-destructive">
        We couldn&apos;t process this recording
      </p>
      <p className="max-w-xs text-xs text-muted-foreground">
        The audio may have been too quiet or empty. Try recording again in a
        quiet space.
      </p>
      {!readOnly && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleRetry}
          className="mt-3"
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Retry processing
        </Button>
      )}
    </div>
  )
}

export default function NoteTabs({
  note,
  actionItems,
  readOnly = false,
}: NoteTabsProps) {
  const isProcessing = note.status === 'processing'
  const isFailed = note.status === 'failed'

  const renderContent = (
    field: 'transcription' | 'summary',
    content: string | undefined,
    processingLabel: string
  ) => {
    if (isFailed) return <FailedState noteId={note._id} readOnly={readOnly} />
    if (isProcessing) return <ProcessingState label={processingLabel} />
    return (
      <div className="rounded-xl border bg-card p-5 shadow-soft sm:p-6">
        {readOnly ? (
          <div className="whitespace-pre-wrap text-left text-[15px] leading-relaxed text-foreground/90">
            {content && content.length > 0 ? content : 'Nothing here yet.'}
          </div>
        ) : (
          <EditableField
            noteId={note._id}
            field={field}
            value={content ?? ''}
            multiline
            className="text-left text-[15px] leading-relaxed text-foreground/90"
          />
        )}
      </div>
    )
  }

  return (
    <Tabs defaultValue="transcript" className="w-full">
      <TabsList
        className={cn(
          'grid h-11 w-full border',
          readOnly ? 'grid-cols-3' : 'grid-cols-4'
        )}
      >
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="actionItem">Action Items</TabsTrigger>
        {!readOnly && <TabsTrigger value="ask">Ask</TabsTrigger>}
      </TabsList>

      <TabsContent value="transcript" className="mt-6">
        {renderContent(
          'transcription',
          note.transcription,
          'Transcribing your audio…'
        )}
      </TabsContent>

      <TabsContent value="summary" className="mt-6">
        {renderContent('summary', note.summary, 'Generating your summary…')}
      </TabsContent>

      <TabsContent value="actionItem" className="mt-6 space-y-4">
        {!readOnly && <ActionForm id={note._id} />}
        {actionItems.length > 0 ? (
          actionItems.map((item) => (
            <NoteCard
              key={item._id}
              {...item}
              title={note.title}
              preview={readOnly}
            />
          ))
        ) : (
          <EmptyState
            icon={ListTodo}
            title="No action items yet"
            description={
              readOnly
                ? 'This note has no action items.'
                : 'Add tasks from this note above, or let the summary inspire them.'
            }
          />
        )}
      </TabsContent>

      {!readOnly && (
        <TabsContent value="ask" className="mt-6">
          <div className="h-[28rem] rounded-xl border bg-card p-4 shadow-soft sm:p-5">
            <ChatPanel
              noteId={note._id}
              placeholder="Ask about this recording…"
              emptyHint="Ask anything about this recording — what was decided, who said what, key points."
            />
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}
