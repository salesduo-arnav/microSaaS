import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Updated to match the Backend Response shape
interface User {
  id: string;
  email: string;
  name: string;
  orgId?: string; // Optional: specific to your backend logic
  role?: string;  // Optional: specific to your backend logic
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the API Base URL (Gateway) - uses Vite environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://api.lvh.me";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Default to true to check session first

  // 1. Check for existing session on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/user/me`, {
          method: "GET",
          credentials: "include", // CRITICAL: Sends the 'session_id' cookie
        });

        if (res.ok) {
          const userData = await res.json();
          // Map backend 'userId' to frontend 'id' if necessary
          setUser({
            id: userData.userId || userData.id,
            email: userData.email,
            name: userData.name,
            orgId: userData.orgId,
            role: userData.role
          });
        }
      } catch (error) {
        console.error("Session check failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // 2. Login Implementation
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // CRITICAL: Receives the Set-Cookie header
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }

      // After successful login, fetch the full user context
      // (Or you can have the login endpoint return the user object directly to save a call)
      const userRes = await fetch(`${API_URL}/user/me`, { credentials: "include" });
      const userData = await userRes.json();
      
      setUser({
        id: userData.userId || userData.id,
        email: userData.email,
        name: userData.name,
        orgId: userData.orgId,
        role: userData.role
      });

    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw to handle in the UI (e.g. show error message)
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Signup Implementation
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Signup failed");
      }

      const data = await res.json();
      
      // Assuming the signup response includes the user object
      if (data.user) {
         setUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            // Add other fields if your signup response returns them
         });
      } else {
        // Fallback: fetch user me
         const userRes = await fetch(`${API_URL}/user/me`, { credentials: "include" });
         const userData = await userRes.json();
         setUser(userData);
      }

    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Google Login (Placeholder - Keep as requested)
  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Logic: Usually redirects the browser to `http://api.lvh.me/auth/google`
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: "1",
      email: "user@example.com",
      name: "Demo User",
    });
    setIsLoading(false);
  };

  // 5. Logout Implementation
  const logout = async () => {
    try {
      // Call backend to invalidate session in Redis and clear HTTP-only cookie
      await fetch(`${API_URL}/auth/logout`, { 
        method: "POST", 
        credentials: "include" 
      });
    } catch (error) {
      console.error("Logout failed", error);
      // We proceed to clear local state anyway so the user isn't "stuck"
    } finally {
      setUser(null);
      // Hard refresh is often safer for logout to clear all memory states/cache
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}