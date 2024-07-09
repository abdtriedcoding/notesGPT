import { StickyNote } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="flex h-16 items-center justify-between border-t px-4">
      <div className="flex items-center space-x-2">
        <StickyNote className="h-7 w-7" />
        <p className="text-center text-sm leading-loose">
          Built by{' '}
          <a
            href="https://twitter.com/abdtriedcoding"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @abdtriedcoding
          </a>
        </p>
      </div>
      <p className="text-center text-sm leading-loose">
        Open source for{' '}
        <a
          href="https://github.com/abdtriedcoding/notesGPT"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          everyone
        </a>
      </p>
    </footer>
  )
}
