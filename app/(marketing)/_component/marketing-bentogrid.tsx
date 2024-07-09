import { Balancer } from 'react-wrap-balancer'
import { BentoGridTemplate } from './bentogrid'

export default function MarketingBentoGrid() {
  return (
    <div className="sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h1
            className="font-urban animate-fade-up text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            <Balancer>The new</Balancer>
          </h1>

          <h1
            className="font-urban relative animate-fade-up bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            <Balancer>Golden Standard</Balancer>
          </h1>

          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            <Balancer>
              NotesGPT seamlessly converts your voice notes into organized
              summaries and clear action items using AI.
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
