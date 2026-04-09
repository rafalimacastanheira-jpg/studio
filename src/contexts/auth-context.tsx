"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

interface AppUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function ensureUserDoc(firebaseUser: FirebaseUser): Promise<AppUser> {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);

  const name = firebaseUser.displayName || "";
  const email = firebaseUser.email || "";

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: firebaseUser.uid,
      name,
      email,
      createdAt: serverTimestamp(),
    });
  }

  return {
    id: firebaseUser.uid,
    name,
    email,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Erro ao definir persistência:", error);
      }

      const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (!mounted) return;

          if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          const appUser = await ensureUserDoc(firebaseUser);

          if (!mounted) return;
          setUser(appUser);
        } catch (error) {
          console.error("Erro ao carregar utilizador autenticado:", error);
          if (mounted) setUser(null);
        } finally {
          if (mounted) setLoading(false);
        }
      });

      return unsub;
    };

    let unsubscribe: (() => void) | undefined;

    init().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const appUser = await ensureUserDoc(cred.user);
      setUser(appUser);
    } catch (error) {
      console.error("AUTH CONTEXT LOGIN ERROR:", error);
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      if (!name || !email || password.length < 6) {
        throw new Error("Dados inválidos. A password deve ter pelo menos 6 caracteres.");
      }

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, { displayName: name });

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      setUser({
        id: cred.user.uid,
        name,
        email,
      });
    } catch (error) {
      console.error("AUTH CONTEXT REGISTER ERROR:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
