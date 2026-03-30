import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/stores/use-auth-store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { data: user, isLoading, isError } = useAuth();
  const authStoreUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();

  useEffect(() => {
    if (user && user.role !== authStoreUser.role) {
      setUser({ ...authStoreUser, role: user.role });
    }
  }, [user, setUser, authStoreUser]);

  // Immediate check from store
  if (!authStoreUser.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse bg-gray-50">
        {/* Simulasi Sidebar */}
        <div className="w-64 bg-gray-200 hidden md:block" />

        {/* Simulasi Konten Utama */}
        <div className="flex-1 p-8 space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
          <div className="h-64 bg-gray-200 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  if (!user || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
