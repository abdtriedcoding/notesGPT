import { StickyNote } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex h-16 px-4 items-center justify-between border-t">
      <div className="flex space-x-2 items-center">
        <StickyNote className="w-7 h-7" />
        <p className="text-center text-sm leading-loose">
          Built by{" "}
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
        Open source for{" "}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          everyone
        </a>
      </p>
    </footer>
  );
}
