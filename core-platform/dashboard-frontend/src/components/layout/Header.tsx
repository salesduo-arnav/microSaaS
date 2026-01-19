import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserMenu } from "./UserMenu";
import { Package } from "lucide-react";

export function Header({ isAuthenticated }: { isAuthenticated: boolean; user: any; onLogout: () => void }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-card">
            <div className="container flex h-16 items-center justify-between px-6">
                {!isAuthenticated ? (
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <Package className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-semibold">SellerTools</span>
                    </Link>
                ) : (
                    // Spacer for when logo is in sidebar
                    <div />
                )}

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <UserMenu />
                    ) : (
                        <Link
                            to="/login"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
