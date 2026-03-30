import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { DataTable } from "@/components/data-table";
import { useDonationsColumns } from "@/components/donations/donations-columns";
import DonationsViewDialog from "@/components/donations/donations-view-dialog";
import Main from "@/components/layout/main";
import { useUserDonations } from "@/hooks/user/user-user-donations";

export default function DonationsPage() {
  const donationColumns = useDonationsColumns();
  const { data: donations, isLoading } = useUserDonations();

  return (
    <>
      <Main className="flex flex-col gap-4 px-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <MainHeader />
            <DataTable
              key={donations?.length}
              columns={donationColumns}
              data={donations ?? []}
              filter="donation"
              columnSearch="donor"
            />
          </>
        )}
      </Main>

      <DonationsViewDialog />
    </>
  );
}

function MainHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Donations</h2>
        <p className="text-muted-foreground">Here&apos;s a list of charity donations!</p>
      </div>
      {/* <DonationsPrimaryButton /> */}
    </div>
  );
}
