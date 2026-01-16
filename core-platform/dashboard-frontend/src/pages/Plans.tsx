import { Layout } from "@/components/layout/Layout";
import { Button } from "@salesduo/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@salesduo/ui/card";
import { Badge } from "@salesduo/ui/badge";
import { Check } from "lucide-react";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  current?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for new sellers getting started",
    features: [
      { name: "1 App Access", included: true },
      { name: "100 Listings/month", included: true },
      { name: "Basic Support", included: true },
      { name: "Priority Processing", included: false },
      { name: "API Access", included: false },
    ],
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing sellers who need more power",
    popular: true,
    features: [
      { name: "All Apps Access", included: true },
      { name: "Unlimited Listings", included: true },
      { name: "Priority Support", included: true },
      { name: "Priority Processing", included: true },
      { name: "API Access", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For high-volume sellers and agencies",
    features: [
      { name: "All Apps Access", included: true },
      { name: "Unlimited Listings", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Priority Processing", included: true },
      { name: "API Access", included: true },
    ],
  },
];

const addOns = [
  { name: "Extra 500 Listings", price: "$19/month" },
  { name: "White Label Exports", price: "$29/month" },
  { name: "Team Members (5)", price: "$49/month" },
];

export default function Plans() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="mt-2 text-muted-foreground">
            Select the plan that fits your business needs
          </p>
        </div>

        {/* Current Plan Banner */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">You're currently on the Trial plan</p>
              <p className="text-sm text-muted-foreground">
                12 days remaining. Upgrade to keep your access.
              </p>
            </div>
            <Badge variant="secondary">Trial</Badge>
          </CardContent>
        </Card>

        {/* Plans Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-primary shadow-lg" : ""
                }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.name}
                      className={`flex items-center gap-2 ${!feature.included ? "text-muted-foreground" : ""
                        }`}
                    >
                      <Check
                        className={`h-4 w-4 ${feature.included
                            ? "text-primary"
                            : "text-muted-foreground/40"
                          }`}
                      />
                      {feature.name}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Available Add-ons</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {addOns.map((addOn) => (
              <Card key={addOn.name}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{addOn.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {addOn.price}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add
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
