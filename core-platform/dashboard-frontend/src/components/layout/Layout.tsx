import { Layout as BaseLayout } from "@salesduo/ui/layout";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      user={user}
      onLogout={logout}
    >
      {children}
    </BaseLayout>
  );
}
