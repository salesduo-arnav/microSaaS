import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Package, Star, Zap, Crown, Sparkles, FileText, ImageIcon, BarChart, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BundleTier {
  name: string;
  price: string;
  period: string;
  limits: string;
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  apps: string[];
  tiers: BundleTier[];
  popular?: boolean;
  icon: React.ReactNode;
}

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  features: string[];
  status: "available" | "coming-soon";
}

const bundles: Bundle[] = [
  {
    id: "content-creator",
    name: "Content Creator Bundle",
    description: "Everything you need to create compelling product content",
    apps: ["Listing Content Generator", "Image Editor & Optimizer", "A+ Content Builder"],
    icon: <Sparkles className="h-5 w-5" />,
    popular: true,
    tiers: [
      { name: "Basic", price: "$49", period: "/month", limits: "50 listings/month" },
      { name: "Pro", price: "$99", period: "/month", limits: "200 listings/month" },
      { name: "Unlimited", price: "$179", period: "/month", limits: "Unlimited listings" },
    ],
  },
  {
    id: "analytics",
    name: "Analytics Bundle",
    description: "Deep insights into your Amazon business performance",
    apps: ["Sales Analytics", "Keyword Tracker", "Competitor Monitor", "Profit Calculator"],
    icon: <Zap className="h-5 w-5" />,
    tiers: [
      { name: "Basic", price: "$59", period: "/month", limits: "5 products tracked" },
      { name: "Pro", price: "$119", period: "/month", limits: "50 products tracked" },
      { name: "Unlimited", price: "$199", period: "/month", limits: "Unlimited tracking" },
    ],
  },
  {
    id: "automation",
    name: "Automation Bundle",
    description: "Automate repetitive tasks and save hours every week",
    apps: ["Auto-Repricer", "Inventory Manager", "Review Requester", "Order Tracker"],
    icon: <Star className="h-5 w-5" />,
    tiers: [
      { name: "Basic", price: "$69", period: "/month", limits: "100 SKUs" },
      { name: "Pro", price: "$139", period: "/month", limits: "500 SKUs" },
      { name: "Unlimited", price: "$229", period: "/month", limits: "Unlimited SKUs" },
    ],
  },
  {
    id: "full-suite",
    name: "Full Suite Bundle",
    description: "Complete access to all tools and features",
    apps: ["All Content Tools", "All Analytics Tools", "All Automation Tools", "Priority Support"],
    icon: <Crown className="h-5 w-5" />,
    popular: true,
    tiers: [
      { name: "Team", price: "$299", period: "/month", limits: "Up to 5 users" },
      { name: "Business", price: "$499", period: "/month", limits: "Up to 15 users" },
      { name: "Enterprise", price: "$799", period: "/month", limits: "Unlimited users" },
    ],
  },
  {
    id: "starter",
    name: "Starter Bundle",
    description: "Perfect for new sellers just getting started",
    apps: ["Listing Content Generator", "Basic Analytics"],
    icon: <Package className="h-5 w-5" />,
    tiers: [
      { name: "Basic", price: "$29", period: "/month", limits: "25 listings/month" },
      { name: "Pro", price: "$49", period: "/month", limits: "75 listings/month" },
    ],
  },
];

const apps: App[] = [
  {
    id: "listing-generator",
    name: "Listing Content Generator",
    description: "AI-powered product listing creation with optimized titles, bullets, and descriptions",
    icon: <FileText className="h-5 w-5" />,
    price: "$29",
    period: "/month",
    features: ["AI-powered content", "SEO optimization", "Multiple variations", "Export to Amazon"],
    status: "available",
  },
  {
    id: "image-editor",
    name: "Image Editor & Optimizer",
    description: "Professional image editing and optimization for your product photos",
    icon: <ImageIcon className="h-5 w-5" />,
    price: "$19",
    period: "/month",
    features: ["Background removal", "Image enhancement", "Batch processing", "Format optimization"],
    status: "available",
  },
  {
    id: "keyword-tracker",
    name: "Keyword Tracker",
    description: "Track your product rankings for important keywords",
    icon: <TrendingUp className="h-5 w-5" />,
    price: "$24",
    period: "/month",
    features: ["Real-time tracking", "Competitor analysis", "Historical data", "Ranking alerts"],
    status: "coming-soon",
  },
  {
    id: "sales-analytics",
    name: "Sales Analytics",
    description: "Comprehensive sales analytics and reporting dashboard",
    icon: <BarChart className="h-5 w-5" />,
    price: "$34",
    period: "/month",
    features: ["Sales reports", "Profit tracking", "Trend analysis", "Custom dashboards"],
    status: "coming-soon",
  },
  {
    id: "inventory-manager",
    name: "Inventory Manager",
    description: "Smart inventory management with automated restock alerts",
    icon: <Package className="h-5 w-5" />,
    price: "$39",
    period: "/month",
    features: ["Stock tracking", "Restock alerts", "Multi-warehouse", "FBA integration"],
    status: "coming-soon",
  },
  {
    id: "competitor-monitor",
    name: "Competitor Monitor",
    description: "Monitor competitor prices, listings, and strategies",
    icon: <Sparkles className="h-5 w-5" />,
    price: "$44",
    period: "/month",
    features: ["Price tracking", "Listing changes", "Review monitoring", "Market insights"],
    status: "coming-soon",
  },
];

const popularBundleIds = ["content-creator", "full-suite"];

export default function Plans() {
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [selectedTier, setSelectedTier] = useState<BundleTier | null>(null);
  const [activeTab, setActiveTab] = useState("bundles");

  const popularBundles = bundles.filter((b) => popularBundleIds.includes(b.id));
  const allBundles = bundles;

  const handleSelectBundle = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setSelectedTier(null);
  };

  const handleSelectTier = (tier: BundleTier) => {
    setSelectedTier(tier);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="mt-2 text-muted-foreground">
            Select bundles for best value or individual apps for flexibility
          </p>
        </div>

        {/* Selection Summary - Shows when bundle + tier selected */}
        {selectedBundle && selectedTier && (
          <Card className="mb-8 border-primary bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="py-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Your Selection</p>
                  <p className="font-semibold text-lg">
                    {selectedBundle.name} - {selectedTier.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedTier.limits}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">
                      {selectedTier.price}
                      <span className="text-sm text-muted-foreground">{selectedTier.period}</span>
                    </p>
                  </div>
                  <Button size="lg">Subscribe Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
            <TabsTrigger value="bundles">Bundles</TabsTrigger>
            <TabsTrigger value="apps">All Apps</TabsTrigger>
          </TabsList>

          {/* Bundles Tab */}
          <TabsContent value="bundles" className="space-y-12">
            {/* Popular Bundles */}
            <section>
              <div className="mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <h2 className="text-xl font-semibold">Popular Bundles</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {popularBundles.map((bundle) => (
                  <BundleCard
                    key={bundle.id}
                    bundle={bundle}
                    isSelected={selectedBundle?.id === bundle.id}
                    selectedTier={selectedBundle?.id === bundle.id ? selectedTier : null}
                    onSelect={() => handleSelectBundle(bundle)}
                    onSelectTier={handleSelectTier}
                  />
                ))}
              </div>
            </section>

            {/* All Bundles */}
            <section>
              <div className="mb-6 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">All Bundles</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allBundles.map((bundle) => (
                  <BundleCard
                    key={bundle.id}
                    bundle={bundle}
                    isSelected={selectedBundle?.id === bundle.id}
                    selectedTier={selectedBundle?.id === bundle.id ? selectedTier : null}
                    onSelect={() => handleSelectBundle(bundle)}
                    onSelectTier={handleSelectTier}
                    compact
                  />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* All Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Individual Apps</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Purchase individual tools without a bundle commitment
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

interface BundleCardProps {
  bundle: Bundle;
  isSelected: boolean;
  selectedTier: BundleTier | null;
  onSelect: () => void;
  onSelectTier: (tier: BundleTier) => void;
  compact?: boolean;
}

function BundleCard({ bundle, isSelected, selectedTier, onSelect, onSelectTier, compact }: BundleCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-lg"
          : "hover:border-primary/50 hover:shadow-md",
        bundle.popular && !isSelected && "border-primary/30"
      )}
      onClick={onSelect}
    >
      {bundle.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500">
          <Star className="mr-1 h-3 w-3 fill-white" />
          Best Value
        </Badge>
      )}
      <CardHeader className={compact ? "pb-3" : ""}>
        <CardTitle className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-lg p-2",
              isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}
          >
            {bundle.icon}
          </span>
          <span className={compact ? "text-base" : ""}>{bundle.name}</span>
        </CardTitle>
        <CardDescription className={compact ? "text-xs" : ""}>{bundle.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Included Apps */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Included Apps</p>
          <ul className={cn("space-y-1", compact && "text-sm")}>
            {bundle.apps.slice(0, compact ? 3 : bundle.apps.length).map((app) => (
              <li key={app} className="flex items-center gap-2 text-sm">
                <Check className="h-3 w-3 text-primary shrink-0" />
                <span className="truncate">{app}</span>
              </li>
            ))}
            {compact && bundle.apps.length > 3 && (
              <li className="text-xs text-muted-foreground">+{bundle.apps.length - 3} more</li>
            )}
          </ul>
        </div>

        {/* Pricing Tiers */}
        {isSelected && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select a Tier</p>
            {bundle.tiers.map((tier) => (
              <button
                key={tier.name}
                onClick={() => onSelectTier(tier)}
                className={cn(
                  "w-full flex items-center justify-between rounded-lg border p-3 transition-all duration-200 text-left",
                  selectedTier?.name === tier.name
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "hover:bg-muted/50 hover:border-primary/50"
                )}
              >
                <div>
                  <p className="font-medium">{tier.name}</p>
                  <p className="text-xs text-muted-foreground">{tier.limits}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {tier.price}
                    <span className="text-xs text-muted-foreground">{tier.period}</span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Price Range Preview */}
        {!isSelected && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold">
              {bundle.tiers[0].price}
              <span className="text-sm font-normal text-muted-foreground">{bundle.tiers[0].period}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface AppCardProps {
  app: App;
}

function AppCard({ app }: AppCardProps) {
  const isComingSoon = app.status === "coming-soon";

  return (
    <Card className={cn(
      "relative transition-all duration-200",
      !isComingSoon && "hover:border-primary/50 hover:shadow-md"
    )}>
      {isComingSoon && (
        <Badge className="absolute -top-3 right-4 bg-secondary">
          Coming Soon
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded-lg p-2 bg-primary/10 text-primary">
            {app.icon}
          </span>
          <span className="text-base">{app.name}</span>
        </CardTitle>
        <CardDescription className="text-xs">{app.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Features */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Key Features</p>
          <ul className="space-y-1">
            {app.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-3 w-3 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-lg font-bold">
                {app.price}
                <span className="text-sm font-normal text-muted-foreground">{app.period}</span>
              </p>
            </div>
          </div>
          <Button className="w-full" disabled={isComingSoon}>
            {isComingSoon ? "Coming Soon" : "Subscribe Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
