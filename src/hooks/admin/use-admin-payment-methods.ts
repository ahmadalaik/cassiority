import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { CreatePaymentMethod, UpdatePaymentMethod } from "@/schema/payment-method";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminPaymentMethodActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: CreatePaymentMethod) => {
      const response = await API.post("/admin/payment-methods", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Payment method created successfully");
    },
    onError: (error) => handleApiError(error, "Failed to create payment method"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdatePaymentMethod) => {
      const response = await API.put(`/admin/payment-methods/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["payment-methods", variables.id] });
      toast.success("Payment method updated successfully");
    },
    onError: (error) => handleApiError(error, "Failed to update payment method"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await API.delete(`/admin/payment-methods/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Payment method deleted successfully");
    },
    onError: (error) => handleApiError(error, "Failed to delete payment method"),
  });

  return {
    createPaymentMethod: createMutation,
    updatePaymentMethod: updateMutation,
    deletePaymentMethod: deleteMutation,
  };
}