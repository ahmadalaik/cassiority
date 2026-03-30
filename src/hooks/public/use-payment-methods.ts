import API from "@/api/api";
import type { PaymentMethod } from "@/schema/payment-method";
import { useQuery } from "@tanstack/react-query";

export function usePaymentMethods() {
  return useQuery<PaymentMethod[], Error>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const response = await API.get("/public/payment-methods");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
}
