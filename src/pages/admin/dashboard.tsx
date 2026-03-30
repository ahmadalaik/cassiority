import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import Main from "@/components/layout/main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useAdminDashboardStats } from "@/hooks/admin/use-admin-dashboard";
import { formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { DollarSign, Megaphone, Package, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";

const chartConfig = {
  donations: {
    label: "Donations",
    color: "#2563eb",
  },
  donors: {
    label: "Donors",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminDashboardStats();

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  const donationChart =
    stats?.dailyStats.map((item) => ({
      date: format(parseISO(item.date), "d MMM"),
      donations: item.totalAmount === null ? 0 : Number(item.totalAmount),
      donors: item.totalDonors === null ? 0 : Number(item.totalDonors),
    })) || [];

  const categoryChart =
    stats?.categoryChart
      .filter((item) => item.percentage !== null)
      .map((category, index) => ({
        ...category,
        color: colors[index % colors.length],
      })) || [];

  const pieChartData = categoryChart.map((item) => ({
    fill: item.color,
    name: item.categoryName,
    value: Number(item.percentage),
  }));

  const pieChartConfig = categoryChart.reduce((acc, item) => {
    const key = item.categoryName.toLowerCase();
    acc[key] = {
      label: item.categoryName,
      color: item.color,
    };
    return acc;
  }, {} as ChartConfig) satisfies ChartConfig;

  if (isLoading) {
    return (
      <Main className="flex flex-col gap-4 px-8">
        <DashboardSkeleton />
      </Main>
    );
  }

  return (
    <Main className="flex flex-col gap-4 px-8">
      {/* <MainStats stats={stats} /> */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Package className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Megaphone className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCampaigns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalDonors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalRaised as bigint)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <Card className="lg:col-span-2 border border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">Donation Trends</CardTitle>
                <CardDescription>Monthly donations and new donors</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-50 w-full">
              <AreaChart
                accessibilityLayer
                data={donationChart}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid horizontal={true} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" className="w-50" />}
                />
                <Area
                  dataKey="donations"
                  type="natural"
                  fill="var(--chart-1)"
                  fillOpacity={0.4}
                  stroke="var(--chart-1)"
                />
                <Area
                  dataKey="donors"
                  type="natural"
                  fill="var(--chart-2)"
                  fillOpacity={0.4}
                  stroke="var(--chart-2)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="border border-gray-100">
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-base">Donation by Category</CardTitle>
              <CardDescription>Distribution this month</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square max-h-62.5"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      // formatter={(value, name, payload) => {
                      //   console.log(payload.payload.fill);
                      //   return (
                      //     <>
                      //       <div
                      //         className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      //         style={
                      //           {
                      //             backgroundColor: `${payload.payload.fill}`,
                      //           } as React.CSSProperties
                      //         }
                      //       />
                      //       {pieChartConfig[name as keyof typeof pieChartConfig]?.label ||
                      //         name}
                      //       <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                      //         {value}
                      //         <span className="font-normal text-muted-foreground">%</span>
                      //       </div>
                      //     </>
                      //   );
                      // }}
                    />
                  }
                />
                <Pie data={pieChartData} dataKey="value" nameKey="name" innerRadius={60} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-2 mt-2">
              {categoryChart?.map((item) => (
                <div
                  key={item.categoryName}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.categoryName}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Main>
  );
}
