import { Skeleton } from "@/components/ui/skeleton";

export function ActionItemSkelton() {
  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <Skeleton className="w-[300px] mx-auto h-[38px]" />
      <div className="flex flex-col space-y-1">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
