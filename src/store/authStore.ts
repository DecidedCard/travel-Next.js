import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) =>
    set((state) => ({
      user,
      isLoggedIn: true,
    })),
  logout: () =>
    set((state) => ({
      user: null,
      isLoggedIn: false,
    })),
}));

export default useAuthStore;
