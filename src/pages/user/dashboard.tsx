import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import Main from "@/components/layout/main";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserDashboardStats } from "@/hooks/user/use-user-dashboard";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, HandCoins } from "lucide-react";

export default function UserDashboardPage() {
  const { data, isLoading } = useUserDashboardStats();

  if (isLoading) {
    return (
      <Main className="flex flex-col gap-6 px-8">
        <DashboardSkeleton />
      </Main>
    );
  }

  return (
    <Main className="flex flex-col gap-6 px-8">
      {/* <MainStats stats={stats} /> */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donation</CardTitle>
            <HandCoins className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalDonations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data?.totalSpend as bigint)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Spend</CardTitle>
            <DollarSign className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(BigInt(data?.averageSpend || 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Info */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Donations */}
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
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {formatCurrency(donation.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Main>
  );
}
