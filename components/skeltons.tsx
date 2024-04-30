import { Skeleton } from "@/components/ui/skeleton";

export function TableSkelton() {
  return (
    <>
      <div className="flex flex-col pb-8 items-center space-y-2">
        <Skeleton className="w-[200px] h-[30px]" />
        <Skeleton className="w-[200px] h-[20px]" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-8 w-[250px] lg:w-[350px]" />
        <Skeleton className="ml-auto hidden h-8 lg:flex w-[70px]" />
      </div>
      <div className="space-y-4 mt-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </>
  );
}

export function CardSkelton() {
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <Skeleton className="rounded-lg border h-9 w-full" />
      <Skeleton className="rounded-lg border h-9 w-full" />
      <Skeleton className="rounded-lg border h-9 w-full" />
      <Skeleton className="rounded-lg border h-9 w-full" />
    </div>
  );
}
