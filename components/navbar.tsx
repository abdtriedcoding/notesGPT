"use client";

import Link from "next/link";
import { navItems } from "@/constants";
import { StickyNote } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky inset-x-0 top-0 z-10 px-4 flex h-16 items-center gap-10 border-b bg-background/60 backdrop-blur-xl transition-all">
      <Logo />
      {pathname !== "/" && (
        <div className="hidden items-center gap-6 md:flex">
          {navItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
        <ThemeToggle />
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <StickyNote className="w-7 h-7" />
      <span className="inline-block text-xl font-bold">NotesGPT</span>
    </Link>
  );
}

function UserNav() {
  return (
    <Link href="/">
      <Button className="rounded-lg">Sign In</Button>
    </Link>
  );
}
