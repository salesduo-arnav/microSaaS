import { Card, CardContent, CardHeader, CardTitle } from "@salesduo/ui/card";
import { Calendar, CreditCard, Activity } from "lucide-react";

interface QuickStatsProps {
  trialDaysLeft: number;
  currentPlan: string;
  usagePercentage: number;
}

export function QuickStats({
  trialDaysLeft,
  currentPlan,
  usagePercentage,
}: QuickStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trial Period</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{trialDaysLeft} days</div>
          <p className="text-xs text-muted-foreground">remaining in your trial</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentPlan}</div>
          <p className="text-xs text-muted-foreground">
            {currentPlan === "Trial" ? "Upgrade for full access" : "Full access enabled"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usage</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usagePercentage}%</div>
          <div className="mt-2 h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
