import { Balancer } from "react-wrap-balancer";
import { BentoGridTemplate } from "./bentogrid";

export default function MarketingBentoGrid() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <Balancer>The new</Balancer>
          </h1>

          <h1 className="relative bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
            <Balancer>Golden Standard</Balancer>
          </h1>

          <p className="mt-4 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
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
  );
}
