import Link from 'next/link'
import { Logo } from '@/components/logo'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Turn your voice into clean summaries and clear action items —
            automatically.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/recordings" className="transition-colors hover:text-foreground">
              Recordings
            </Link>
            <Link href="/record" className="transition-colors hover:text-foreground">
              Record
            </Link>
            <a
              href="https://github.com/abdtriedcoding/notesGPT"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            © 2026 NotesGPT · Open source
          </p>
        </div>
      </div>
    </footer>
  )
}
