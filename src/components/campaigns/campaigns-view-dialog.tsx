import { useCampaignStore } from "@/stores/use-campaign-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Calendar, CalendarClock, DollarSign, Package, Users } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

export default function CampaignsViewDialog() {
  const { open, currentRow: campaign, setOpen, setCurrentRow } = useCampaignStore();
  console.log(campaign);

  if (!campaign) return;

  const isOpen = open !== null && open === "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600/10 text-green-600";
      case "completed":
        return "bg-blue-600/10 text-blue-600";
      case "draft":
        return "bg-gray-600/10 text-gray-600";
      case "paused":
        return "bg-amber-600/10 text-amber-600";
      default:
        return "bg-gray-600/10 text-gray-600";
    }
  };

  const progress = Number(campaign.currentAmount / campaign.targetAmount) * 100;
  const avgDonation = Math.round(Number(campaign.currentAmount / campaign.totalDonors));

  const startedDate = new Date(campaign.createdAt);
  const formattedDate: string = startedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const targetDate = new Date(campaign.deadline);
  const today = new Date();
  const diffInMs = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Campaign Details</DialogTitle>
          <DialogDescription>Information about campaign details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex gap-4">
            <img
              src={
                typeof campaign.image === "string"
                  ? campaign.image
                  : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={campaign.title}
              className="aspect-square size-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-foreground">{campaign.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <p className="text-sm">{campaign.category.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 " />
                    <p className="text-sm">Started on {formattedDate}</p>
                  </div>
                </div>
                <Badge className={cn(getStatusColor(campaign.status), "border-none")}>
                  {campaign.status === "active" && (
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400 mr-1"
                      aria-hidden="true"
                    />
                  )}
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-lime-500 font-semibold">
                {formatCurrency(campaign.currentAmount)}
              </span>
              <div className="text-muted-foreground">
                of{" "}
                <span className="font-semibold">{formatCurrency(campaign.targetAmount)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-2 text-lime-500" />
              <p className="text-2xl font-bold text-foreground">{campaign.totalDonors}</p>
              <p className="text-sm text-muted-foreground">Donors</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <DollarSign className="h-5 w-5 mx-auto mb-2 text-lime-500" />
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(BigInt(avgDonation))}
              </p>
              <p className="text-sm text-muted-foreground">Avg. Donation</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <CalendarClock className="h-5 w-5 mx-auto mb-2 text-lime-500" />
              <p className="text-2xl font-bold text-foreground">{daysLeft}</p>
              <p className="text-sm text-muted-foreground">Days Left</p>
            </div>
          </div>

          {campaign.description && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Description</h4>
              <p className="text-muted-foreground">{campaign.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
