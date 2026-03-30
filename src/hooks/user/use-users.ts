import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUserCheckFundraiserRoleRequest() {
  return useQuery({
    queryKey: ["users", "role"],
    queryFn: async () => {
      const response = await API.get("/users/fundraiser");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useUserActions() {
  const queryClient = useQueryClient();

  const createDonationMutation = useMutation({
    mutationFn: async ({ campaignId, data }: { campaignId: number; data: FormData }) => {
      const response = await API.post(`/donations/${campaignId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast.success("Donation created successfully");
    },
    onError: (error) => handleApiError(error, "Failed to create donation"),
  });

  //  update user profile
  const updateUserMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await API.patch("/users", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: (error) => handleApiError(error, "Failed to update user"),
  });

  // request role fundraiser
  const fundraiserRoleRequestMutation = useMutation({
    mutationFn: async () => {
      const response = await API.post("/users/fundraiser");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
      toast.success("Request to become fundraiser created successfully");
    },
    onError: (error) => handleApiError(error, "Failed to create request"),
  });

  return {
    createDonation: createDonationMutation,
    updateUser: updateUserMutation,
    fundraiserRoleRequest: fundraiserRoleRequestMutation,
  };
}
