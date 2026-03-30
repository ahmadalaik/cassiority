import API from "@/api/api";
import type { CampaignDetail, PaginateCampaign } from "@/schema/campaign";
import { useQuery } from "@tanstack/react-query";

export function useSearchCampaignsByCategory(slug: string, page: number) {
  return useQuery<PaginateCampaign, Error>({
    queryKey: ["campaigns", "category", slug],
    queryFn: async () => {
      const response = await API.get(`/public/campaigns?category=${slug}&page=${page}`);
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetCampaign(slug: string) {
  return useQuery<CampaignDetail, Error>({
    queryKey: ["campaigns", slug],
    queryFn: async () => {
      const response = await API.get(`/public/campaigns/${slug}`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
