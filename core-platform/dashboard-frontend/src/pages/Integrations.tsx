import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plug,
  Plus,
  Check,
  AlertCircle,
  RefreshCw,
  Trash2,
  ExternalLink,
  ShoppingCart,
  Key,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  marketplace?: string;
}

const availableIntegrations: Integration[] = [
  {
    id: "sp-api",
    name: "Amazon SP-API",
    description: "Connect your Amazon Seller Central account via Selling Partner API",
    icon: <ShoppingCart className="h-6 w-6" />,
    status: "disconnected",
    marketplace: "Amazon",
  },
  {
    id: "mws",
    name: "Amazon MWS (Legacy)",
    description: "Legacy Marketplace Web Service integration",
    icon: <ShoppingCart className="h-6 w-6" />,
    status: "disconnected",
    marketplace: "Amazon",
  },
  {
    id: "advertising-api",
    name: "Amazon Advertising API",
    description: "Connect your Amazon Advertising account for PPC management",
    icon: <ShoppingCart className="h-6 w-6" />,
    status: "disconnected",
    marketplace: "Amazon",
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "sp-api-1",
      name: "Amazon SP-API",
      description: "US Marketplace",
      icon: <ShoppingCart className="h-6 w-6" />,
      status: "connected",
      lastSync: "2 hours ago",
      marketplace: "amazon.com",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [credentials, setCredentials] = useState({
    sellerId: "",
    clientId: "",
    clientSecret: "",
    refreshToken: "",
  });

  const handleConnect = () => {
    if (selectedIntegration) {
      setIntegrations([
        ...integrations,
        {
          ...selectedIntegration,
          id: `${selectedIntegration.id}-${Date.now()}`,
          status: "connected",
          lastSync: "Just now",
        },
      ]);
      setIsAddDialogOpen(false);
      setSelectedIntegration(null);
      setCredentials({
        sellerId: "",
        clientId: "",
        clientSecret: "",
        refreshToken: "",
      });
    }
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(integrations.filter((i) => i.id !== id));
  };

  const handleSync = (id: string) => {
    setIntegrations(
      integrations.map((i) =>
        i.id === id ? { ...i, lastSync: "Just now" } : i
      )
    );
  };

  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <Check className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            Disconnected
          </Badge>
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
            <p className="text-muted-foreground mt-2">
              Connect your Amazon seller accounts and third-party services
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogDescription>
                  Select an integration type and provide your credentials
                </DialogDescription>
              </DialogHeader>

              {!selectedIntegration ? (
                <div className="grid gap-4 py-4">
                  {availableIntegrations.map((integration) => (
                    <button
                      key={integration.id}
                      onClick={() => setSelectedIntegration(integration)}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {integration.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {selectedIntegration.icon}
                    </div>
                    <div>
                      <p className="font-medium">{selectedIntegration.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedIntegration.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sellerId">Seller ID</Label>
                      <Input
                        id="sellerId"
                        value={credentials.sellerId}
                        onChange={(e) =>
                          setCredentials({ ...credentials, sellerId: e.target.value })
                        }
                        placeholder="Enter your Amazon Seller ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientId">Client ID</Label>
                      <Input
                        id="clientId"
                        value={credentials.clientId}
                        onChange={(e) =>
                          setCredentials({ ...credentials, clientId: e.target.value })
                        }
                        placeholder="LWA Client ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientSecret">Client Secret</Label>
                      <Input
                        id="clientSecret"
                        type="password"
                        value={credentials.clientSecret}
                        onChange={(e) =>
                          setCredentials({ ...credentials, clientSecret: e.target.value })
                        }
                        placeholder="LWA Client Secret"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refreshToken">Refresh Token</Label>
                      <Input
                        id="refreshToken"
                        type="password"
                        value={credentials.refreshToken}
                        onChange={(e) =>
                          setCredentials({ ...credentials, refreshToken: e.target.value })
                        }
                        placeholder="OAuth Refresh Token"
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                {selectedIntegration && (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedIntegration(null)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleConnect}
                  disabled={!selectedIntegration}
                >
                  <Plug className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Connected Integrations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Connected Integrations</h2>
          {integrations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Plug className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No integrations connected</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first integration to get started
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {integrations.map((integration) => (
                <Card key={integration.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {integration.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{integration.name}</p>
                          {getStatusBadge(integration.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {integration.marketplace}
                          {integration.lastSync && ` • Last synced ${integration.lastSync}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(integration.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Available Integrations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Integrations</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {integration.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {integration.marketplace}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedIntegration(integration);
                      setIsAddDialogOpen(true);
                    }}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
