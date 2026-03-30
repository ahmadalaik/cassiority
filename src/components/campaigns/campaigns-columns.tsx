import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Campaign } from "@/schema/campaign";
import { useCampaignStore } from "@/stores/use-campaign-store";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { cn, formatCurrency } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

export function useCampaignsColumns(): ColumnDef<Campaign>[] {
  const { onView, onEdit, onDelete } = useDialogActions(useCampaignStore);
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Campaign",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4 w-64">
            <img
              src={typeof row.original.image === "string" ? row.original.image : ""}
              alt={row.original.title}
              className="w-24 rounded-lg object-cover"
            />
            <div className="flex flex-col w-full">
              <p className="font-medium">{row.getValue("title")}</p>
              <p className="text-muted-foreground">{row.original.category.name}</p>
            </div>
          </div>
        );
      },
      meta: {
        filterVariant: "Campaign",
      },
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => {
        const campaign = row.original;
        const progress = campaign.currentAmount / campaign.targetAmount;
        return (
          <div className="w-80 space-y-1 p-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-primary">
                {formatCurrency(campaign.currentAmount)}
              </span>
              <span className="text-muted-foreground">
                {progress}% of {formatCurrency(campaign.targetAmount)}
              </span>
            </div>
            <Progress value={Number(progress)} className="h-2" />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => <div>{row.getValue("deadline")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value: string = row.getValue("status");
        const status = value.charAt(0).toUpperCase() + value.slice(1);
        return (
          <Badge
            className={cn(
              row.original.status === "active"
                ? "bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-green-600 border-emerald-600/60"
                : "bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60",
              "shadow-none rounded-full",
            )}
          >
            <div
              className={cn(
                row.original.status === "active" ? "bg-emerald-500" : "bg-amber-500",
                "h-1.5 w-1.5 rounded-full mr-2",
              )}
            />{" "}
            {status}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const campaign = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(campaign)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(campaign)}>Edit</DropdownMenuItem>
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
        );
      },
    },
  ];
}
