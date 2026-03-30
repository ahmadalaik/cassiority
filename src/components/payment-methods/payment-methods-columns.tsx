import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Building2, MoreHorizontal, Trash2, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { PaymentMethod } from "@/schema/payment-method";
import { useDialogActions } from "@/hooks/use-dialog-actions";
import { usePaymentMethodStore } from "@/stores/use-payment-method-store";

export function usePaymentMethodsColumns(): ColumnDef<PaymentMethod>[] {
  const { onView, onEdit, onDelete } = useDialogActions(usePaymentMethodStore);

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
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const value: PaymentMethod["type"] = row.getValue("type");
        const formattedType = (value: string) => {
          const separator = value === "e_wallet" ? "-" : " ";
          return value
            .split("_")
            .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
            .join(separator);
        };

        return (
          <div className="flex items-center gap-2">
            {value === "bank" ? (
              <Building2 className="w-4 h-4" />
            ) : (
              <Wallet className="w-4 h-4" />
            )}
            <span>{formattedType(value)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => <div>{row.getValue("provider")}</div>,
    },
    {
      accessorKey: "accountNumber",
      header: "Account Number",
      cell: ({ row }) => (
        <div className="max-w-52 truncate">{row.getValue("accountNumber")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "accountHolderName",
      header: "Account Holder Name",
      cell: ({ row }) => <div>{row.getValue("accountHolderName")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const paymentMethod = row.original;

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
              <DropdownMenuItem onClick={() => onView(paymentMethod)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(paymentMethod)}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="flex justify-between"
                onClick={() => onDelete(paymentMethod)}
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
