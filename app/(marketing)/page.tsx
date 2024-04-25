import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Twitter } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { Button, buttonVariants } from "@/components/ui/button";
import MarketingBentoGrid from "./_component/marketing-bentogrid";
import { HeroHighlightSection } from "./_component/hero-highlight-section";

const MarketingPage = () => {
  return (
    <>
      <section className="space-y-6 lg:py-28 py-12 flex flex-col items-center text-center justify-center">
        <Link
          href="https://twitter.com/abdtriedcoding"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "animate-fade-up opacity-0"
          )}
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          target="_blank"
        >
          Introducing on <Twitter className="ml-2 h-4 w-4" />
        </Link>
        <h1
          className="max-w-[52rem] text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            AI-Powered{" "}
            <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
              Voice Notes{" "}
            </span>
            Management
          </Balancer>
        </h1>
        <p
          className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 
        animate-fade-up opacity-0"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          <Balancer>
            NotesGPT seamlessly converts your voice notes into organized
            summaries and clear action items using AI.
          </Balancer>
        </p>
        <Button
          asChild
          size={"lg"}
          className="rounded-lg animate-fade-up opacity-0"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link href={"/recordings"}>Get Started</Link>
        </Button>
        <div
          className="pt-10 flex items-center justify-center w-full animate-fade-up opacity-0"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
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
