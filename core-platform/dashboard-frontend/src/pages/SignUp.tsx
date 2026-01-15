import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; // Added useSearchParams
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const { signup, loginWithGoogle, isLoading } = useAuth();
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    try {
      await signup(name, email, password);
      handleRedirect(); // Use helper instead of hardcoded navigate
    } catch (err) {
      setError("Failed to create account");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      handleRedirect(); // Use helper instead of hardcoded navigate
    } catch (err) {
      setError("Google sign-up failed");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start your 14-day free trial today"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (Inputs for Name, Email, Password remain unchanged) ... */}
        
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
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

        <GoogleButton
          onClick={handleGoogleSignup}
          isLoading={isLoading}
          text="Sign up with Google"
        />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          {/* UPDATED LINK: Preserves the ?redirect=... parameter */}
          <Link 
            to={`/login?${searchParams.toString()}`} 
            className="text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}