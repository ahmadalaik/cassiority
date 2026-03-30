import API from "@/api/api";
import type { AdminDasboardStats } from "@/schema/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useAdminDashboardStats() {
  return useQuery<AdminDasboardStats, Error>({
    queryKey: ["dasboard"],
    queryFn: async () => {
      const response = await API.get("/admin/dashboard");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
