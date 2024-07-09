'use client'

import Link from 'next/link'
import UserNav from './user-nav'
import { navItems } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader, StickyNote } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClerkLoaded, ClerkLoading, SignInButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <>
      {!pathname.startsWith('/share') && (
        <nav className="sticky inset-x-0 top-0 z-30 flex h-16 items-center gap-10 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
          <Logo />
          {pathname !== '/' && (
            <div className="hidden items-center gap-6 md:flex">
              {navItems?.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          )}
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <UserNav />
            ) : (
              <>
                <ClerkLoading>
                  <Loader className="w5 h-5 animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignInButton
                    fallbackRedirectUrl={'/recordings'}
                    signUpFallbackRedirectUrl={'/recordings'}
                    mode="modal"
                  >
                    <Button className="rounded-lg">Sign In</Button>
                  </SignInButton>
                </ClerkLoaded>
              </>
            )}
            <ThemeToggle />
          </div>
        </nav>
      )}
    </>
  )
}

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <StickyNote className="h-7 w-7" />
      <span className="inline-block text-xl font-bold">NotesGPT</span>
    </Link>
  )
}

function NavItem({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
    >
      {title}
    </Link>
  )
}
