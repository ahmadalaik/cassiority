import CampaignsActionDialog from "@/components/campaigns/campaigns-action-dialog";
import CampaignsDeleteDialog from "@/components/campaigns/campaigns-delete-dialog";
import CampaignsGridView from "@/components/campaigns/campaigns-grid-view";
import CampaignsPrimaryButton from "@/components/campaigns/campaigns-primary-button";
import CampaignsViewDialog from "@/components/campaigns/campaigns-view-dialog";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import Main from "@/components/layout/main";
import { useFundraiserCampaigns } from "@/hooks/fundraiser/use-fundraiser-campaigns";

export default function FundraiserCampaignsPage() {
  const { data: campaigns, isLoading } = useFundraiserCampaigns();

  return (
    <>
      <Main className="flex flex-col gap-4 px-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <MainHeader />
            <CampaignsGridView data={campaigns ?? []} />
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
        <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
        <p className="text-muted-foreground">Here&apos;s a list of charity campaigns!</p>
      </div>
      <CampaignsPrimaryButton />
    </div>
  );
}
