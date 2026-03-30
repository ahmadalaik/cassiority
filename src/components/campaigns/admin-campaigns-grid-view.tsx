import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { CalendarClock, Megaphone, MoreVertical, Trash2 } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { useCampaignStore } from "@/stores/use-campaign-store";
import type { Campaign } from "@/schema/campaign";
import { Badge } from "../ui/badge";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

export default function AdminCampaignsGridView({ data }: { data: Campaign[] }) {
  const { onView, onDelete } = useDialogActions(useCampaignStore);

  if (!data || data.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader className="py-10">
          <EmptyMedia variant="icon" className="size-15">
            <Megaphone className="size-9" />
          </EmptyMedia>
          <EmptyTitle>No campaigns</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            You haven&apos;t made any campaigns yet!.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 transition-all duration-300">
      {data.map((campaign) => {
        const status = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);
        const progress = Number(campaign.currentAmount / campaign.targetAmount) * 100;

        const targetDate = new Date(campaign.deadline);
        const today = new Date();
        const diffInMs: number = targetDate.getTime() - today.getTime();

        const daysLeft: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return (
          <Card key={campaign.id} className="w-full pt-0">
            <CardContent className="relative px-0">
              <div className="absolute bg-black/5 w-full h-full rounded-t-xl"></div>
              <img
                src={
                  typeof campaign.image === "string"
                    ? campaign.image
                    : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={campaign.title}
                className="aspect-video w-full object-cover rounded-t-xl"
              />
              <Badge
                className={cn(
                  status === "Active"
                    ? "bg-linear-to-r from-green-500 to-teal-600 text-white uppercase"
                    : "bg-amber-600 text-white border-amber-600/60 uppercase",
                  "absolute top-4 left-4 shadow-none rounded-full px-2.5 py-1",
                )}
              >
                {status === "Active" && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white mr-1" />
                )}{" "}
                {status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="absolute top-4 right-4">
                  <Button variant="secondary" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onView(campaign)}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="flex justify-between"
                    onClick={() => onDelete(campaign)}
                  >
                    Delete <Trash2 />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
              <div className="flex justify-between items-end text-sm pt-2">
                <span className="font-semibold text-lime-500 text-xs">
                  {formatCurrency(campaign.currentAmount)}
                </span>
                <div className="text-muted-foreground">
                  {progress}% of{" "}
                  <span className="font-semibold">
                    {formatCurrency(campaign.targetAmount)}
                  </span>
                </div>
              </div>
              <Progress value={Number(progress)} />
            </CardHeader>
            <CardFooter className="flex items-center gap-2">
              <CalendarClock className="text-muted-foreground" />
              <span className="text-muted-foreground">{daysLeft} days left</span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
