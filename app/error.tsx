"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="font-display text-3xl">Something went wrong!</h1>
      <Button variant={"outline"} size={"lg"} onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
