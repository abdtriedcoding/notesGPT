import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader className="h-5 w-5" />
    </div>
  )
}
