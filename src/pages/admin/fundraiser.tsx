import Main from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminFundraisers } from "@/hooks/admin/use-admin-fundraisers";
import { useAdminUserActions } from "@/hooks/admin/use-admin-users";
import { formatDate, parseISO } from "date-fns";
import { CheckCircle, Loader2, MoreHorizontalIcon, Trash2 } from "lucide-react";

export default function FundraiserManagePage() {
  const { data: fundraisers } = useAdminFundraisers();
  const { updateRole } = useAdminUserActions();

  const handleActions = async (id: number, action: "approved" | "rejected") => {
    const data = {
      requestId: id,
      status: action,
    };

    await updateRole.mutateAsync(data);
  };

  return (
    <>
      <Main className="flex flex-col gap-6 px-20">
        {/* <DashboardSkeleton /> */}

        {updateRole.isPending && (
          <div className="min-h-screen z-10 bg-black/10">
            <Loader2 className="animate-spin" />
          </div>
        )}

        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Fundraiser</h2>
            <p className="text-muted-foreground">Here&apos;s a list of fundraiser</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundraisers?.map((fundraiser) => (
              <TableRow key={fundraiser.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2.5">
                    <Avatar>
                      <AvatarImage
                        src={fundraiser.user.image || undefined}
                        alt={fundraiser.user.name || undefined}
                      />
                      <AvatarFallback className="rounded-lg bg-amber-100">
                        {fundraiser.user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    {fundraiser.user.name}
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(parseISO(fundraiser.createdAt), "MMMM dd yyyy HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {fundraiser.status === "pending" ? (
                    <Badge className="gap-1.5 border-amber-600/40 bg-amber-600/10 text-amber-500 shadow-none hover:bg-amber-600/10 dark:bg-amber-600/20">
                      <div className="size-1.5 rounded-full bg-amber-500" />{" "}
                      {fundraiser.status}
                    </Badge>
                  ) : (
                    <Badge>{fundraiser.status}</Badge>
                  )}
                </TableCell>
                {fundraiser.status !== "approved" && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleActions(fundraiser.id, "approved")}
                        >
                          <CheckCircle />
                          Approved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Main>
    </>
  );
}
