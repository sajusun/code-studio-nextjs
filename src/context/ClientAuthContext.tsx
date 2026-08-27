"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ClientUser } from "@/types";
import { clientLogin, fetchClientMe } from "@/lib/api";

interface ClientAuthContextType {
  user: ClientUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
});

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("codestudio_client_token");
    if (savedToken) {
      setToken(savedToken);
      fetchClientMe(savedToken).then((res) => {
        if (res && res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          // Invalid or expired token
          localStorage.removeItem("codestudio_client_token");
          setToken(null);
          setUser(null);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await clientLogin(email, password);
      if (res.token) {
        localStorage.setItem("codestudio_client_token", res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, message: res.message || "Invalid credentials" };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("codestudio_client_token");
    setToken(null);
    setUser(null);
  };

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  return useContext(ClientAuthContext);
}
