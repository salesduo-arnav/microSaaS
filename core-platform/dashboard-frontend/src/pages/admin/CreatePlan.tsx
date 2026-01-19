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
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CreatePlan() {
    const navigate = useNavigate();
    const [features, setFeatures] = useState<string[]>([""]);

    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };
    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    return (
        <Layout>
            <div className="container py-8">
                <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/plans")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Create Plan</h1>
                            <p className="text-muted-foreground">
                                Define a new subscription plan.
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Plan Information</CardTitle>
                            <CardDescription>
                                Set the pricing and features for this plan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Plan Name</Label>
                                    <Input id="name" placeholder="e.g. Pro" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (Monthly)</Label>
                                    <Input id="price" placeholder="e.g. 29.99" type="number" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Features</Label>
                                {features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="Feature description"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFeature(index)}
                                            disabled={features.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={addFeature}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Feature
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => navigate("/admin/plans")}>
                                Cancel
                            </Button>
                            <Button>Create Plan</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
