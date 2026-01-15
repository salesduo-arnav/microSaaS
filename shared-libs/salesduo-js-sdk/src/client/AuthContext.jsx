import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);
const CORE_API_URL = "http://api.lvh.me";

export const SalesDuoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${CORE_API_URL}/user/me`, { credentials: "include" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser({
             id: data.userId || data.id,
             email: data.email,
             name: data.name,
             orgId: data.orgId,
             plan: data.plan
          });
        }
      })
      .catch((err) => console.error("SalesDuo Auth Check Failed", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSalesDuo = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useSalesDuo must be used within SalesDuoProvider");
  return context;
};