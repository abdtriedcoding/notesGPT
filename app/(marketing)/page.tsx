import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Balancer from 'react-wrap-balancer'
import { ArrowRight, Mic, Sparkles, ListChecks, FileText } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import MarketingBentoGrid from './_component/marketing-bentogrid'
import { HeroHighlightSection } from './_component/hero-highlight-section'

export default function MarketingPage() {
  return (
    <section className="flex flex-col items-center">
      {/* Hero */}
      <div className="relative w-full overflow-hidden">
        {/* Texture + warm spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        />

        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-16 text-center sm:pt-24 lg:pb-24">
          <span
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border bg-card/70 px-3.5 py-1.5 opacity-0 shadow-soft backdrop-blur"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              AI voice notes
            </span>
          </span>

          <h1
            className="mt-7 max-w-4xl animate-fade-up text-balance text-5xl font-medium leading-[1.05] tracking-tight opacity-0 sm:text-6xl md:text-7xl"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <Balancer>
              Speak your mind.{' '}
              <span className="italic text-primary">We&apos;ll handle</span> the
              notes.
            </Balancer>
          </h1>

          <p
            className="mt-6 max-w-[40rem] animate-fade-up text-lg leading-relaxed text-muted-foreground opacity-0 sm:text-xl"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <Balancer>
              NotesGPT transcribes your voice, distills a clean summary, and
              pulls out the action items — automatically. Built for students,
              teachers, and anyone with ideas on the go.
            </Balancer>
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col items-center gap-3 opacity-0 sm:flex-row"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/recordings">
                <Mic className="mr-2 h-4 w-4" />
                Start recording
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto"
            >
              <Link href="#features">
                See how it works
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <p
            className="mt-5 animate-fade-up font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground opacity-0"
            style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}
          >
            Free forever · No credit card · Open source
          </p>

          {/* Framed product screenshot — terminal chrome */}
          <div
            className="mt-16 w-full max-w-5xl animate-fade-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <div className="relative mx-auto overflow-hidden rounded-xl border bg-card shadow-soft-lg">
              <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-destructive/50" />
                <span className="h-3 w-3 rounded-full bg-warning/60" />
                <span className="h-3 w-3 rounded-full bg-success/50" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  notesgpt — dashboard
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/app-preview-light.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-top dark:hidden"
                  alt="NotesGPT recording view — transcript, summary and action items"
                  priority
                />
                <Image
                  src="/app-preview-dark.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="hidden object-cover object-top dark:block"
                  alt="NotesGPT recording view — transcript, summary and action items"
                  priority
                />
              </div>
            </div>
            {/* glow under the frame */}
            <div
              aria-hidden
              className="pointer-events-none mx-auto -mt-6 h-12 w-3/4 rounded-full bg-primary/20 blur-3xl"
            />
          </div>

          {/* Three-step strip */}
          <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border text-left sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.step}
                className="flex flex-col gap-3 bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <step.icon className="h-5 w-5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="w-full scroll-mt-20">
        <MarketingBentoGrid />
      </div>

      <HeroHighlightSection />

      {/* Final CTA */}
      <div className="w-full px-4 py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center shadow-soft-lg">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
          />
          <Sparkles className="mx-auto h-7 w-7 text-primary" />
          <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
            <Balancer>
              Your next idea deserves{' '}
              <span className="italic text-primary">better notes.</span>
            </Balancer>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            <Balancer>
              Stop scribbling notes you&apos;ll never read again. Speak once and
              let NotesGPT do the rest.
            </Balancer>
          </p>
          <Link
            href="/recordings"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}
          >
            <Mic className="mr-2 h-4 w-4" />
            Get started for free
          </Link>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    step: '01',
    icon: Mic,
    title: 'Record',
    body: 'Tap once and start talking. No setup, no typing — just speak naturally.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Summarize',
    body: 'AI transcribes your audio and distills it into a clean, readable summary.',
  },
  {
    step: '03',
    icon: ListChecks,
    title: 'Act',
    body: 'Every to-do is extracted automatically, ready to check off and track.',
  },
]
