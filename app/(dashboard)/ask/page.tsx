'use client'

import { ChatPanel } from '@/components/chat-panel'
import { PageHeader } from '@/components/page-header'

export default function AskPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-8 sm:px-6">
      <PageHeader
        eyebrow="Ask"
        title="Ask your notes"
        subtitle="Ask a question and get an answer drawn from across all your recordings."
        className="mb-8"
      />

      <div className="h-[32rem] rounded-xl border bg-card p-4 shadow-soft sm:p-5">
        <ChatPanel
          placeholder="Ask anything about your notes…"
          emptyHint="Ask anything — “What did I decide about the budget?”, “Summarize my meetings this week.” Answers cite the notes they came from."
        />
      </div>
    </div>
  )
}
