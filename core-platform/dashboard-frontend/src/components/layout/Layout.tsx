import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      {isAuthenticated && <Sidebar className="hidden md:flex" />}
      <div className="flex flex-1 flex-col">
        <Header
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={logout}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
