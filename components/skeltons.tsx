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
    <div className="space-y-4 max-w-xl mx-auto items-center flex flex-col">
      <Skeleton className="rounded-lg h-7 w-[200px]" />
      <Skeleton className="rounded-lg h-5 w-[150px]" />
      <Skeleton className="rounded-lg h-9 w-full" />
      <Skeleton className="rounded-lg h-9 w-full" />
      <Skeleton className="rounded-lg h-9 w-full" />
      <Skeleton className="rounded-lg h-9 w-full" />
    </div>
  );
}

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
