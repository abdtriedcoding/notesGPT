'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader, LogOut, Mic, PencilLine, User, VideoIcon } from 'lucide-react'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/clerk-react'

export default function UserNav() {
  const router = useRouter()
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  if (!isLoaded || !isSignedIn) {
    return <Loader className="w5 h-5 animate-spin" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push('/user-profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => router.push('/recordings')}
        >
          <VideoIcon className="mr-2 h-4 w-4" />
          <span>Recordings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => router.push('/record')}
        >
          <Mic className="mr-2 h-4 w-4" />
          <span>Record</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => router.push('/action-items')}
        >
          <PencilLine className="mr-2 h-4 w-4" />
          <span> Action Items</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
