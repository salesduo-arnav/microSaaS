import { Button } from "@salesduo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@salesduo/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Users, Package, CreditCard, Activity, BarChart3 } from "lucide-react";
import { useState } from "react";
import AppsManager from "./AppsManager";
import PlansManager from "./PlansManager";
import UsersManager from "./UsersManager";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const renderContent = () => {
        switch (activeTab) {
            case "apps":
                return <AppsManager />;
            case "plans":
                return <PlansManager />;
            case "users":
                return <UsersManager />;
            default:
                return (
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12,345</div>
                                    <p className="text-xs text-muted-foreground">
                                        +180.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Apps</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+2350</div>
                                    <p className="text-xs text-muted-foreground">
                                        +19% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12,234</div>
                                    <p className="text-xs text-muted-foreground">
                                        +19% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+573</div>
                                    <p className="text-xs text-muted-foreground">
                                        +201 since last hour
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Layout>
            <div className="container py-8">
                <div className="flex flex-col space-y-8">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                            <p className="text-muted-foreground">
                                Overview of system performance and management.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button>Download Report</Button>
                        </div>
                    </div>

                    <div className="flex space-x-2 border-b">
                        {[
                            { id: "overview", label: "Overview", icon: BarChart3 },
                            { id: "apps", label: "Apps", icon: Package },
                            { id: "plans", label: "Plans", icon: CreditCard },
                            { id: "users", label: "Users", icon: Users },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[400px]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
