import { Skeleton } from "../ui/skeleton";

export default function ExploreSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-85 h-10 rounded-full" />
        <Skeleton className="w-90 h-10 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="rounded-full w-33 h-11" />
        <Skeleton className="rounded-full w-33 h-11" />
        <Skeleton className="rounded-full w-33 h-11" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-4/5 h-13" />
        <Skeleton className="w-1/5 h-13" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <Skeleton className="aspect-14/9" />
        <Skeleton className="aspect-14/9" />
        <Skeleton className="aspect-14/9" />
        <Skeleton className="aspect-14/9" />
        <Skeleton className="aspect-14/9" />
        <Skeleton className="aspect-14/9" />
      </div>
    </div>
  );
}
