import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { Campaign } from "@/schema/campaign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFundraiserCampaigns() {
  return useQuery<Campaign[], Error>({
    queryKey: ["campaigns", "fundraiser"],
    queryFn: async () => {
      const response = await API.get(`/fundraiser/campaigns`);
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useFundraiserCampaignActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await API.post("/fundraiser/campaigns", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Category created successfully");
    },
    onError: (error) => handleApiError(error, "Failed to create campaign"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const response = await API.put(`/fundraiser/campaigns/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", variables.id] });
      toast.success("Campaign updated successfully");
    },
    onError: (error) => handleApiError(error, "Failed to update campaign"),
  });

  return {
    createCampaign: createMutation,
    updateCampaign: updateMutation,
  };
}
