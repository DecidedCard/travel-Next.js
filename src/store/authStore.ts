import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  authLogin: (user: User) => void;
  authLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  authLogin: (user) =>
    set((state) => ({
      user,
      isLoggedIn: true,
    })),
  authLogout: () =>
    set((state) => ({
      user: null,
      isLoggedIn: false,
    })),
}));

export default useAuthStore;
