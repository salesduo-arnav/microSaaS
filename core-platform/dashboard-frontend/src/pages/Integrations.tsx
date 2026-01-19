import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Plug, Plus, Trash2, ExternalLink, Key } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"; // Assuming standard shadcn/custom components exist or need to be created, but I'll use standard HTML/Tailwind for now if they don't exist to avoid breakage, OR I'll check if they exist. Redacting to standard HTML for safety in this step or waiting to check.
// Actually, let's use standard Tailwind for the layout and see if we can import UI components.
// The user has @salesduo/ui but I don't know all exports. I'll stick to basic HTML/Tailwind for the structure to be safe,
// or better, I should implement it using the design system if possible.
// Given previous context, I'll assume standard components might need to be imported or I'll build them inline for now to avoid 'module not found' if I guess wrong.
// Wait, I saw "import { Toaster } from "@salesduo/ui/toaster";" in App.tsx. Use of @salesduo/ui seems preferred.
// However, creating a whole form might be complex without knowing available components.
// I will create a self-contained page first using Tailwind classes.

interface Integration {
    id: string;
    name: string;
    sellerId: string;
    region: string;
    connectedAt: string;
    status: "active" | "inactive";
}

export default function Integrations() {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        sellerId: "",
        authToken: "",
        region: "North America",
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newIntegration: Integration = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            sellerId: formData.sellerId,
            region: formData.region,
            connectedAt: new Date().toLocaleDateString(),
            status: "active",
        };
        setIntegrations([...integrations, newIntegration]);
        setIsDialogOpen(false);
        setFormData({ name: "", sellerId: "", authToken: "", region: "North America" });
    };

    const handleDelete = (id: string) => {
        setIntegrations(integrations.filter((i) => i.id !== id));
    };

    return (
        <Layout>
            <div className="container py-8 max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
                        <p className="mt-2 text-muted-foreground">
                            Manage your connected Amazon Seller Central accounts and APIs.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Integration
                    </button>
                </div>

                {/* Integration List */}
                <div className="grid gap-6">
                    {integrations.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-12 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                <Plug className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">No integrations connected</h3>
                            <p className="mb-4 mt-2 text-sm text-muted-foreground">
                                Connect your Amazon Seller Central account to start syncing data.
                            </p>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                            >
                                Connect Account
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {integrations.map((integration) => (
                                <div
                                    key={integration.id}
                                    className="rounded-lg border bg-card text-card-foreground shadow-sm"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                                                    <span className="text-lg font-bold text-[#FF9900]">a</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold leading-none tracking-tight">
                                                        {integration.name}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {integration.region}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    Active
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid gap-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Seller ID</span>
                                                <span className="font-mono">{integration.sellerId}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Connected</span>
                                                <span>{integration.connectedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 pt-0">
                                        <button
                                            onClick={() => handleDelete(integration.id)}
                                            className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Integration Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">Connect Amazon SP-API</h2>
                            <p className="text-sm text-muted-foreground">
                                Enter your Amazon Seller Central credentials to connect your account.
                            </p>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Account Name
                                </label>
                                <input
                                    id="name"
                                    placeholder="e.g. US Store"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="sellerId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Seller ID
                                </label>
                                <input
                                    id="sellerId"
                                    placeholder="Amazon Seller ID"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.sellerId}
                                    onChange={(e) => setFormData({ ...formData, sellerId: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="authToken" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    MWS Auth Token
                                </label>
                                <div className="relative">
                                    <input
                                        id="authToken"
                                        type="password"
                                        placeholder="amzn.mws..."
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                                        value={formData.authToken}
                                        onChange={(e) => setFormData({ ...formData, authToken: e.target.value })}
                                        required
                                    />
                                    <Key className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="region" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Region
                                </label>
                                <select
                                    id="region"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.region}
                                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                >
                                    <option value="North America">North America (NA)</option>
                                    <option value="Europe">Europe (EU)</option>
                                    <option value="Far East">Far East (FE)</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    Connect
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
