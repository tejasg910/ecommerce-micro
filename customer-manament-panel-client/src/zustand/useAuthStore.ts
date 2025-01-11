// src/store/useStore.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: number;
  email: string;
  fullName: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => 
    set(() => ({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })),

  login: (user, token) => {
    Cookies.set('authToken', token, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    set(() => ({
      user,
      isAuthenticated: true,
      isLoading: false,
    }));
  },

  logout: () => {
    Cookies.remove('authToken');
    
    set(() => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }));
  },

  setLoading: (loading) => set(() => ({ isLoading: loading })),
}));