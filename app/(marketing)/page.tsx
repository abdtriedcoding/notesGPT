import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Twitter } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { Button, buttonVariants } from '@/components/ui/button'
import MarketingBentoGrid from './_component/marketing-bentogrid'
import { HeroHighlightSection } from './_component/hero-highlight-section'

export default function MarketingPage() {
  return (
    <section className="flex flex-col items-center justify-center space-y-6 py-12 text-center lg:py-28">
      <Link
        href="https://twitter.com/abdtriedcoding"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'animate-fade-up opacity-0'
        )}
        style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
        target="_blank"
      >
        Introducing on <Twitter className="ml-2 h-4 w-4" />
      </Link>
      <h1
        className="max-w-[52rem] animate-fade-up text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
      >
        <Balancer>
          AI-Powered{' '}
          <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
            Voice Notes{' '}
          </span>
          Management
        </Balancer>
      </h1>
      <p
        className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
        style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
      >
        <Balancer>
          NotesGPT seamlessly converts your voice notes into organized summaries
          and clear action items using AI.
        </Balancer>
      </p>
      <Button
        asChild
        size={'lg'}
        className="animate-fade-up rounded-lg opacity-0"
        style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
      >
        <Link href={'/recordings'}>Get Started</Link>
      </Button>
      <div
        className="flex w-full animate-fade-up items-center justify-center pt-10 opacity-0"
        style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
      >
        <div className="relative h-[600px] w-[500px]">
          <Image
            src="/mobile.png"
            fill
            className="rounded-lg border border-gray-300 object-contain p-2 dark:border-gray-500"
            alt="mobile"
            priority
            fetchPriority="high"
            loading="eager"
            draggable={'false'}
          />
        </div>
        <div className="relative hidden h-[500px] w-[1200px] md:block">
          <Image
            src="/desktop.png"
            fill
            className="rounded-lg border border-gray-300 object-contain p-2 dark:border-gray-500"
            alt="Desktop"
            priority
            fetchPriority="high"
            loading="eager"
            draggable={'false'}
          />
        </div>
      </div>
      <MarketingBentoGrid />
      <HeroHighlightSection />
    </section>
  )
}
