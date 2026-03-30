import { DataTable } from "@/components/data-table";
import { useDonationsColumnsDraft } from "@/components/donations/donations-column-draft";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Donation } from "@/schema/donation";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function DonationsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Donation | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [dataToDelete, setDataToDelete] = useState<Donation | null>(null);

  const openDialog = (data: Donation | null, editMode: boolean) => {
    setSelectedData(data);
    setIsEdit(editMode);
    setIsOpen(true);
  };

  const donationColumns = useDonationsColumnsDraft(
    (donation) => openDialog(donation, false), // View mode
    (donation) => openDialog(donation, true), // Edit mode
    (donation) => {
      setDataToDelete(donation);
      setIsDeleteOpen(true);
    } // Delete mode
  );

  interface donationType {
    id: string;
    campaign: string;
    donor: string;
    amount: number;
    date: string;
    status: "success" | "pending" | "failed";
  }

  const donations: donationType[] = [
    {
      id: "D001",
      campaign: "Bukber dengan Anak-anak Panti Asuhan",
      donor: "Faishal Akbar",
      amount: 100000,
      date: "2026-03-05",
      status: "success",
    },
  ];

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setTimeout(() => {
        setSelectedData(null);
        setIsEdit(false);
      }, 300);
    }
  };

  const handleDelete = () => {
    if (!dataToDelete) return;

    setIsDeleteOpen(false);
    setTimeout(() => setDataToDelete(null), 300);
  };

  return (
    <DashboardLayout>
      <Header />
      <Main className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Donations</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of charity donations!
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={() => openDialog(null, false)}>
                  Create <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-106.25 ">
                <form className="flex flex-col gap-4">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedData
                        ? isEdit
                          ? "Edit Campaign"
                          : "Detail Campaign"
                        : "Create Campaign"}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedData
                        ? "Information about campagin for charity."
                        : "Add a new campaign for charity info. Click save when you're done."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        name="amount"
                        key={selectedData?.id || "create"}
                        defaultValue={selectedData?.amount || ""}
                        disabled={!!selectedData && !isEdit}
                        readOnly={!!selectedData && !isEdit}
                        tabIndex={!!selectedData && isEdit ? -1 : 0}
                      />
                      <Label htmlFor="campaign">Campaign</Label>
                      <Select>
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="environment">Environment</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">
                        {selectedData && !isEdit ? "Close" : "Cancel"}
                      </Button>
                    </DialogClose>
                    {(!selectedData || isEdit) && (
                      <Button type="submit">
                        {isEdit ? "Update changes" : "Save changes"}
                      </Button>
                    )}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    donation <strong>{dataToDelete?.donor}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDataToDelete(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <DataTable
          columns={donationColumns}
          data={donations}
          filter="campaign"
          columnSearch="campaigns"
        />
      </Main>
    </DashboardLayout>
  );
}
