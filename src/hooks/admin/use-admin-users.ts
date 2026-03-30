import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { UpdateRole } from "@/schema/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminUserActions() {
  const queryClient = useQueryClient();

  const updateRoleMutation = useMutation({
    mutationFn: async ({ requestId, ...data }: UpdateRole) => {
      const response = await API.patch(`/admin/users/role/${requestId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fundraisers"] });
      toast.success("Update role successfully");
    },
    onError: (error) => handleApiError(error, "Failed to update role"),
  });

  return {
    updateRole: updateRoleMutation,
  };
}
