import React, { createContext, useContext, useState, useEffect } from "react";

// Standard User Shape for all apps
export interface User {
  id: string;
  email: string;
  orgId: string;
  role: string;
}

const AuthContext = createContext<{ user: User | null; isLoading: boolean } | undefined>(undefined);

export const AuthProvider = ({ children, apiUrl = "http://api.lvh.me" }: { children: React.ReactNode; apiUrl?: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Automatically checks session on mount
    fetch(`${apiUrl}/user/me`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser({
           id: data.userId || data.id, 
           email: data.email, 
           orgId: data.orgId, 
           role: data.role 
        });
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [apiUrl]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSalesDuoUser = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useSalesDuoUser must be used within AuthProvider");
  return context;
};