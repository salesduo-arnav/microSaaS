import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; // Added useSearchParams
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@salesduo/ui/button";
import { Input } from "@salesduo/ui/input";
import { Label } from "@salesduo/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Capture query params

  // Helper to handle redirection logic
  const handleRedirect = () => {
    const redirectUrl = searchParams.get("redirect");
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      handleRedirect(); // Use helper
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      handleRedirect(); // Use helper
    } catch (err) {
      setError("Google sign-in failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleButton onClick={handleGoogleLogin} isLoading={isLoading} />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          {/* UPDATED LINK: Preserves the ?redirect=... parameter */}
          <Link
            to={`/signup?${searchParams.toString()}`}
            className="text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}