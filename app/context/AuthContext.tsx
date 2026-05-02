"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("lux_admin_auth");
    if (savedAuth === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === "luxadmin2026") {
      setIsAdmin(true);
      localStorage.setItem("lux_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("lux_admin_auth");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// MAKE SURE THIS IS AT THE BOTTOM OF THE FILE
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}