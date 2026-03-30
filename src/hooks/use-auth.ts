import API from "@/api/api";
import { handleApiError } from "@/lib/utils";
import type { Login } from "@/schema/login";
import type { Register } from "@/schema/register";
import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useAuth() {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await API.get("/auth/me");
      return response.data.data;
    },
    enabled: !!user.accessToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minute
  });
}

export function useAuthActions() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const { setAccessToken, setUser } = useAuthStore();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  // register hook
  const registerMutation = useMutation({
    mutationFn: async (data: Register) => {
      const response = await API.post("/auth/register", data);
      return response.data;
    },

    onSuccess: () => {
      toast.success("Register successful");
      navigate("/login");
    },

    onError: (error) => handleApiError(error, "Failed to register"),
  });

  // login hook
  const loginMutation = useMutation({
    mutationFn: async (data: Login) => {
      const response = await API.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      const userData = data.data;
      const role = userData.role;

      login(userData);

      toast.success("Login successful");

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "fundraiser") {
        navigate("/fundraiser/dashboard");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error) => handleApiError(error, "Failed to login"),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await API.delete("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      logout();
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    },
    onError: (error) => handleApiError(error, "Failed to logout"),
  });

  return { registerMutation, loginMutation, logoutMutation };
}
