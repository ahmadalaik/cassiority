import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;

  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access_token"),
  user: null,

  setAccessToken: (token) => {
    if (token) localStorage.setItem("access_token", token);
    else localStorage.removeItem("access_token");
    set({ accessToken: token });
  },
  setUser: (user) => {
    if (user) localStorage.setItem("user_storage", JSON.stringify(user));
    else localStorage.removeItem("user_storage");
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ accessToken: null, user: null });
  },
}));
