import { Command } from "lucide-react";

export function Logo() {
  return (
    <div className="flex gap-1.5 items-center cursor-default">
      <Command className="size-6.5" />
      <span className="text-base font-bold">Cassiority</span>
    </div>
  );
}
