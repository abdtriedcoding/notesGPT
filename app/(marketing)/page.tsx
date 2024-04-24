import Link from "next/link";
import Image from "next/image";
import { Twitter } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { Button, buttonVariants } from "@/components/ui/button";
import MarketingBentoGrid from "./_component/marketing-bentogrid";
import { HeroHighlightSection } from "./_component/hero-highlight-section";

const MarketingPage = () => {
  return (
    <>
      <section className="space-y-6 lg:py-28 flex flex-col items-center text-center justify-center">
        <Link
          href="https://twitter.com/abdtriedcoding"
          className={buttonVariants({ variant: "outline", size: "sm" })}
          target="_blank"
        >
          Introducing on <Twitter className="ml-2 h-4 w-4" />
        </Link>
        <h1 className="max-w-[52rem] text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <Balancer>
            AI-Powered{" "}
            <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
              Voice Notes{" "}
            </span>
            Management
          </Balancer>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          <Balancer>
            NotesGPT seamlessly converts your voice notes into organized
            summaries and clear action items using AI.
          </Balancer>
        </p>
        <Button size={"lg"} className="rounded-lg">
          Get Started
        </Button>
        <div className="pt-10 flex items-center justify-center w-full">
          <div className="relative w-[500px] h-[600px]">
            <Image
              src="/mobile.png"
              fill
              className="object-contain"
              alt="mobile"
            />
          </div>
          <div className="relative h-[500px] w-[1200px] hidden md:block">
            <Image
              src="/desktop.png"
              fill
              className="object-contain"
              alt="Desktop"
            />
          </div>
        </div>
        <MarketingBentoGrid />
        <HeroHighlightSection />
      </section>
    </>
  );
};

export default MarketingPage;
