import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <span className="text-2xl font-semibold text-primary-foreground">
            SalesDuo
          </span>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Supercharge Your Amazon Business
          </h1>
          <p className="text-lg text-primary-foreground/80">
            All-in-one platform for listing optimization, image editing, and
            more tools to grow your Amazon seller business.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">
          © 2024 SalesDuo. All rights reserved.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-16 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">SalesDuo</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
