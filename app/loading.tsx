import { Loader } from 'lucide-react'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader className="w5 h-5 animate-spin" />
    </div>
  )
}
