import { Balancer } from 'react-wrap-balancer'
import { BentoGridTemplate } from './bentogrid'

export default function MarketingBentoGrid() {
  return (
    <div className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <p
            className="eyebrow animate-fade-up opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Features
          </p>
          <h2
            className="mt-4 animate-fade-up text-4xl font-medium tracking-tight opacity-0 sm:text-5xl"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            <Balancer>
              Everything you need to{' '}
              <span className="italic text-primary">stay on top of it</span>
            </Balancer>
          </h2>

          <p
            className="mx-auto mt-5 max-w-[42rem] animate-fade-up text-lg leading-relaxed text-muted-foreground opacity-0 sm:text-xl"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            <Balancer>
              From a quick voice memo to organized summaries and clear action
              items — NotesGPT does the busywork so you don&apos;t have to.
            </Balancer>
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <BentoGridTemplate />
      </div>
    </div>
  )
}
