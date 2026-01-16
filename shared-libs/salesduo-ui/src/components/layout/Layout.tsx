import { ReactNode } from "react";
import { Header, HeaderProps } from "./Header";

export interface LayoutProps extends HeaderProps {
    children: ReactNode;
}

export function Layout({ children, ...headerProps }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Header {...headerProps} />
            <main>{children}</main>
        </div>
    );
}
