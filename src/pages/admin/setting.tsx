import Main from "@/components/layout/main";
import { useAuth } from "@/hooks/use-auth";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import SettingsTab from "@/components/setting/settings-tab";

export default function SettingPage() {
  const { data: user, isLoading } = useAuth();

  return (
    <Main className="flex flex-col gap-6 px-8">
      {isLoading ? <DashboardSkeleton /> : <SettingsTab user={user} />}
    </Main>
  );
}
