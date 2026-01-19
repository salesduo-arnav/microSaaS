import { Button } from "@salesduo/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@salesduo/ui/card";
import { Badge } from "@salesduo/ui/badge";
import { Check, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlansManager() {
    const navigate = useNavigate();
    const plans = [
        {
            id: "1",
            name: "Starter",
            pice: "$29",
            period: "/month",
            features: ["Up to 5 apps", "Basic Analytics", "Email Support"],
            active: true,
        },
        {
            id: "2",
            name: "Professional",
            pice: "$79",
            period: "/month",
            features: [
                "Unlimited apps",
                "Advanced Analytics",
                "Priority Support",
                "API Access",
            ],
            active: true,
            popular: true,
        },
        {
            id: "3",
            name: "Enterprise",
            pice: "Custom",
            period: "",
            features: ["Dedicated Manager", "SLA", "Custom Integrations", "SSO"],
            active: true,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
                    <p className="text-muted-foreground">
                        Manage subscription plans and features.
                    </p>
                </div>
                <Button onClick={() => navigate("/admin/plans/new")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Plan
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <Card key={plan.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{plan.name}</CardTitle>
                                {/* @ts-ignore - popular property check */}
                                {plan.popular && <Badge>Popular</Badge>}
                            </div>
                            <CardDescription>
                                <span className="text-3xl font-bold">{plan.pice}</span>
                                {plan.period}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm">
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">
                                Edit Plan
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
