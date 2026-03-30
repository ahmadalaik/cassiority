import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import Main from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFundraiserDashboardStats } from "@/hooks/fundraiser/use-fundraiser-dashboard";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, DollarSign, Megaphone, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FundraiserDashboardPage() {
  const { data, isLoading } = useFundraiserDashboardStats();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Main className="flex flex-col fap-6 px-8">
        <DashboardSkeleton />
      </Main>
    );
  }

  return (
    <Main className="flex flex-col gap-6 px-8">
      {/* <MainStats stats={stats} /> */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Megaphone className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalCampaigns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalDonors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data?.totalRaised as bigint)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Info */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {data?.recentCampaign && (
          <Card className="lg:col-span-3 border border-gray-100">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Recent Campaign</CardTitle>
                  <CardDescription>Last campaign that you created</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="group relative flex gap-4">
                <img
                  src={
                    typeof data?.recentCampaign.image === "string"
                      ? data.recentCampaign.image
                      : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  className="object-cover rounded-xl"
                  alt=""
                />
                <div className="absolute bottom-0 w-full h-full bg-black/25 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute left-4 bottom-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                  <h1 className="text-lg md:text-2xl font-bold text-white leading-tight">
                    {data?.recentCampaign.title}
                  </h1>
                </div>
                <div className="absolute right-4 top-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                  <Button
                    className="cursor-pointer"
                    onClick={() => navigate("/dashboard/campaigns")}
                  >
                    <ArrowUpRight />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Donations */}
        {data?.recentDonations && data.recentDonations.length > 0 && (
          <Card className="lg:col-span-2 border border-gray-100">
            <CardHeader className="pb-2">
              <div>
                <CardTitle className="text-base">Recent Donation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {data?.recentDonations.map((donation) => (
                  <div className="flex items-center gap-4 border border-gray-200 rounded-lg px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                      <User />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">{donation.donor}</h4>
                      <p className="text-muted-foreground text-sm">
                        {formatCurrency(donation.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Main>
  );
}
