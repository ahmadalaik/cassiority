import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: number | null;
  name: string | null;
  email: string | null;
  role: string | null;
  avatar: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

interface AuthState {
  user: User;

  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
        avatar: null,
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false,
      },

      setUser: (user) => {
        set({ user });
      },
      login: (user) => {
        set({ user: { ...user, isLoggedIn: true } });
      },
      logout: () => {
        set({
          user: {
            id: null,
            name: null,
            email: null,
            role: null,
            avatar: null,
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
          },
        });
        useAuthStore.persist.clearStorage();
        // window.location.href = "/login";
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
