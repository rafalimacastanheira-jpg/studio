"use client";

import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import type { User, FullUser } from '@/lib/definitions';
import useLocalStorage from '@/hooks/use-local-storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [users, setUsers] = useLocalStorage<FullUser[]>('users', []);
  const router = useRouter();

  const login = (email: string, password: string): void => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Credenciais inválidas');
    }
    const { password: _, ...userToStore } = foundUser;
    setUser(userToStore);
  };

  const register = (name: string, email: string, password: string): void => {
    if (!name || !email || password.length < 6) {
      throw new Error('Dados inválidos. A password deve ter pelo menos 6 caracteres.');
    }
    if (users.some(u => u.email === email)) {
      throw new Error('O email já está em uso.');
    }
    const id = Date.now();
    const newUser: FullUser = { id, name, email, password };
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const logout = (): void => {
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
