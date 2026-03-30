import { Skeleton } from "./ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div className="flex flex-col justify-between gap-2 w-full">
          <Skeleton className="h-6 w-1/8" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <Skeleton className="h-8 w-1/10" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
      <div className="flex flex-row justify-between gap-4">
        <Skeleton className="h-8 w-1/5" />
        <Skeleton className="h-8 w-1/10" />
      </div>
      <Skeleton className="h-70" />
      <div className="flex flex-row justify-between gap-4">
        <Skeleton className="h-8 w-1/7" />
        <div className="flex flex-row gap-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-30" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
    </div>
  );
}
