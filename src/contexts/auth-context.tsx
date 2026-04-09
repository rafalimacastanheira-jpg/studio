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

async function buildAppUser(firebaseUser: FirebaseUser): Promise<AppUser> {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const userData = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || "",
      email: firebaseUser.email || "",
      createdAt: serverTimestamp(),
    };

    await setDoc(ref, userData);

    return {
      id: firebaseUser.uid,
      name: userData.name,
      email: userData.email,
    };
  }

  const data = snap.data();

  return {
    id: firebaseUser.uid,
    name: typeof data.name === "string" ? data.name : firebaseUser.displayName || "",
    email: typeof data.email === "string" ? data.email : firebaseUser.email || "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const appUser = await buildAppUser(firebaseUser);
        setUser(appUser);
      } catch (error) {
        console.error("Erro ao carregar utilizador autenticado:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
