import API from "@/api/api";
import type { Fundraiser } from "@/schema/fundraiser";
import { useQuery } from "@tanstack/react-query";

export function useAdminFundraisers() {
  return useQuery<Fundraiser[], Error>({
    queryKey: ["fundraisers"],
    queryFn: async () => {
      const response = await API.get("/admin/fundraisers");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}
