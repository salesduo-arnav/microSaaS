import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
      />
      <main>{children}</main>
    </div>
  );
}
