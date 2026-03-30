import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useUserDonations() {
  return useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const response = await API.get("/donations");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}