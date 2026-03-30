import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { CreateCategory, UpdateCategory } from "@/schema/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminCategoryActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: CreateCategory) => {
      const response = await API.post("/admin/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error) => handleApiError(error, "Failed to create category"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateCategory) => {
      const response = await API.put(`/admin/categories/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", variables.id] });
      toast.success("Category updated successfully");
    },
    onError: (error) => handleApiError(error, "Failed to update category"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await API.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => handleApiError(error, "Failed to delete category"),
  });

  return {
    createCategory: createMutation,
    updateCategory: updateMutation,
    deleteCategory: deleteMutation,
  };
}