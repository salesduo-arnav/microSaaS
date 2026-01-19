import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, LayoutDashboard, Building2, CreditCard, Receipt, ChevronLeft, ChevronRight, Plug } from "lucide-react";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const [isCollapsed, setIsCollapsed] = useState(true);

    const navItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Organisation",
            href: "/organisation",
            icon: Building2,
        },
        {
            title: "Plans",
            href: "/plans",
            icon: CreditCard,
        },
        {
            title: "Billing",
            href: "/billing",
            icon: Receipt,
        },
        {
            title: "Integrations",
            href: "/integrations",
            icon: Plug,
        },
    ];

    return (
        <div
            className={`relative flex min-h-screen flex-col border-r bg-card transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
                } ${className || ""}`}
        >
            <div className={`flex h-16 items-center border-b ${isCollapsed ? "justify-center px-2" : "px-6"}`}>
                <Link to="/" className="flex items-center gap-2 overflow-hidden">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
                        <Package className="h-5 w-5 text-primary-foreground" />
                    </div>
                    {!isCollapsed && <span className="text-xl font-semibold whitespace-nowrap">SellerTools</span>}
                </Link>
            </div>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent"
            >
                {isCollapsed ? (
                    <ChevronRight className="h-3 w-3" />
                ) : (
                    <ChevronLeft className="h-3 w-3" />
                )}
            </button>

            <div className="flex-1 overflow-auto py-6">
                <nav className="grid items-start gap-1 px-2 text-sm font-medium">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                title={isCollapsed ? item.title : undefined}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground"
                                    } ${isCollapsed ? "justify-center px-2" : ""}`}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span>{item.title}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
