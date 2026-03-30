import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { Donation, UpdateDonation } from "@/schema/donation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminDonations() {
  return useQuery<Donation[], Error>({
    queryKey: ["donations"],
    queryFn: async () => {
      const response = await API.get("/admin/donations");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useAdminDonationActions() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateDonation) => {
      const response = await API.patch(`/admin/donations/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      queryClient.invalidateQueries({ queryKey: ["donations", variables.id] });
      toast.success("Donation status updated successfully");
    },
    onError: (error) => handleApiError(error, "Failed to update donation status"),
  });

  return {
    updateDonation: updateMutation,
  };
}
