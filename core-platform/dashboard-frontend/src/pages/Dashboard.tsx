import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { AppCard } from "@/components/dashboard/AppCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { FileText, ImageIcon, BarChart, Package } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const apps = [
    {
      title: "Listing Content Generator",
      description:
        "Create optimized product listings with AI-powered title, bullet points, and description generation.",
      icon: FileText,
      status: "trial" as const,
      trialDaysLeft: 12,
      subdomain: "listing",
    },
    {
      title: "Image Editor & Optimizer",
      description:
        "Edit, optimize, and enhance your product images for maximum conversion.",
      icon: ImageIcon,
      status: "trial" as const,
      trialDaysLeft: 12,
      subdomain: "images",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track your sales, rankings, and performance across all your products.",
      icon: BarChart,
      status: "coming-soon" as const,
    },
    {
      title: "Inventory Manager",
      description:
        "Manage your FBA and FBM inventory levels with smart restocking alerts.",
      icon: Package,
      status: "coming-soon" as const,
    },
  ];

  const handleLaunch = (subdomain: string) => {
    // TODO: Replace with actual subdomain URLs
    console.log(`Launching ${subdomain} app...`);
    // window.location.href = `https://${subdomain}.yourapp.com`;
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "Seller"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Access your tools and manage your Amazon business
          </p>
        </div>

        <div className="mb-8">
          <QuickStats
            trialDaysLeft={12}
            currentPlan="Trial"
            usagePercentage={35}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Your Apps</h2>
          <p className="text-sm text-muted-foreground">
            Launch any of your available tools below
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard
              key={app.title}
              title={app.title}
              description={app.description}
              icon={app.icon}
              status={app.status}
              trialDaysLeft={app.trialDaysLeft}
              onLaunch={
                app.subdomain ? () => handleLaunch(app.subdomain!) : undefined
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
