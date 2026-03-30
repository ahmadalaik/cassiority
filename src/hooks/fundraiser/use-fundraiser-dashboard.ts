import API from "@/api/api";
import type { FundraiserDasboardStats } from "@/schema/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useFundraiserDashboardStats() {
  return useQuery<FundraiserDasboardStats, Error>({
    queryKey: ["dasboard"],
    queryFn: async () => {
      const response = await API.get("/fundraiser/dashboard");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
