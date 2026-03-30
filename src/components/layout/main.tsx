import { cn } from "@/lib/utils";

export default function Main({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <div className={cn("px-4 py-4", className)} {...props} />;
}
