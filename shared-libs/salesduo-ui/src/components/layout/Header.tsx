import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { UserMenu, UserMenuProps } from "./UserMenu";

export interface HeaderProps extends UserMenuProps {
    isAuthenticated: boolean;
    navItems?: {
        label: string;
        href: string;
    }[];
}

export function Header({ isAuthenticated, user, onLogout, navItems }: HeaderProps) {
    const defaultNavItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Plans", href: "/plans" },
        { label: "Billing", href: "/billing" },
    ];

    const items = navItems || defaultNavItems;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-card">
            <div className="container flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                        <Package className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-semibold">SalesDuo</span>
                </Link>

                {isAuthenticated && (
                    <nav className="hidden items-center gap-6 md:flex">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <UserMenu user={user} onLogout={onLogout} />
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
