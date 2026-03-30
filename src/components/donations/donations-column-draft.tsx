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
import type { Donation } from "@/schema/donation";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function useDonationsColumnsDraft(
  onView: (donation: Donation) => void,
  onEdit: (donation: Donation) => void,
  onDelete: (donation: Donation) => void
): ColumnDef<Donation>[] {
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
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "donor",
      header: "Donor",
      cell: ({ row }) => <div>{row.getValue("donor")}</div>,
    },
    {
      accessorKey: "campaign",
      header: "Campaign",
      cell: ({ row }) => <div>{row.getValue("campaign")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
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
              row.original.status === "success"
                ? "bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-green-600 border-emerald-600/60"
                : "bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60",
              "shadow-none rounded-full"
            )}
          >
            <div
              className={cn(
                row.original.status === "success"
                  ? "bg-emerald-500"
                  : "bg-amber-500",
                "h-1.5 w-1.5 rounded-full mr-2"
              )}
            />{" "}
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const donation = row.original;

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
              <DropdownMenuItem onClick={() => onView(donation)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(donation)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(donation)}
                variant="destructive"
                className="flex justify-between"
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
