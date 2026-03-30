import AdminCampaignsGridView from "@/components/campaigns/admin-campaigns-grid-view";
import CampaignsActionDialog from "@/components/campaigns/campaigns-action-dialog";
import CampaignsDeleteDialog from "@/components/campaigns/campaigns-delete-dialog";
import CampaignsViewDialog from "@/components/campaigns/campaigns-view-dialog";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import Main from "@/components/layout/main";
import { useAdminSearchCampaigns } from "@/hooks/admin/use-admin-campaigns";

export default function CampaignsManagePage() {
  const { data: campaigns, isLoading } = useAdminSearchCampaigns();
  console.log("data: ", campaigns);

  return (
    <>
      <Main className="flex flex-col gap-4 px-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <MainHeader />
            <AdminCampaignsGridView data={campaigns ?? []} />
          </>
        )}
      </Main>

      <CampaignsActionDialog />
      <CampaignsViewDialog />
      <CampaignsDeleteDialog />
    </>
  );
}

function MainHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Campaigns</h2>
        <p className="text-muted-foreground">Here&apos;s a list of charity campaigns!</p>
      </div>
    </div>
  );
}
