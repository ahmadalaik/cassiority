import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { Campaign } from "@/schema/campaign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminSearchCampaigns() {
  return useQuery<Campaign[], Error>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await API.get(`/admin/campaigns`);
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useAdminCampaignActions() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await API.delete(`/admin/campaigns/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Campaign deleted successfully");
    },
    onError: (error) => handleApiError(error, "Failed to delete campaign"),
  });

  return {
    deleteCampaign: deleteMutation,
  };
}
