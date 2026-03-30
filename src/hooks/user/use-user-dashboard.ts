import API from "@/api/api";
import type { UserDashboardStats } from "@/schema/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useUserDashboardStats() {
  return useQuery<UserDashboardStats, Error>({
    queryKey: ["dasboard"],
    queryFn: async () => {
      const response = await API.get("/dashboard");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
