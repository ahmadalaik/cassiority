import API from "@/api/api";
import type { Donation } from "@/schema/donation";
import { useQuery } from "@tanstack/react-query";

export function useFundraiserDonations() {
  return useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const response = await API.get("/fundraiser/donations");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useFundraiserGetDonationsCampaign(campaignId: number) {
  return useQuery<Donation[], Error>({
    queryKey: ["donations", campaignId],
    queryFn: async () => {
      const response = await API.get(`/fundraiser/donations/${campaignId}`);
      return response.data.data;
    },
    enabled: !!campaignId,
    refetchOnWindowFocus: false,
  });
}
