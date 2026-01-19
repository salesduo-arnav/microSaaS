import { Button } from "@salesduo/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@salesduo/ui/input";
import { Label } from "@salesduo/ui/label";
import { Textarea } from "@salesduo/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@salesduo/ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function CreateApp() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="container py-8">
                <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/apps")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Create App</h1>
                            <p className="text-muted-foreground">
                                Register a new application in the system.
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>App Details</CardTitle>
                            <CardDescription>
                                Enter the basic information for the new application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">App Name</Label>
                                <Input id="name" placeholder="e.g. Campaign Manager" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">App Slug (URL-friendly)</Label>
                                <Input id="slug" placeholder="e.g. campaign-manager" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of the app's functionality..."
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => navigate("/admin/apps")}>
                                Cancel
                            </Button>
                            <Button>Create App</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
