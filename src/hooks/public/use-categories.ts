import API from "@/api/api";
import type { Category } from "@/schema/category";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await API.get("/public/categories");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetCategory(id: number) {
  return useQuery<Category, Error>({
    queryKey: ["categories", id],
    queryFn: async () => {
      const response = await API.get(`/public/categories/${id}`);
      return response.data.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
