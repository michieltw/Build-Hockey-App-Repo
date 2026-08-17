import { create } from 'zustand';

export type UserRole = 'admin' | 'scorekeeper' | 'coach' | 'player' | 'referee';

interface AuthState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: 'admin', // Default role
  setRole: (role) => set({ role }),
}));
