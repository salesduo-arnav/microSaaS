import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const invoices = [
  {
    id: "INV-001",
    date: "Jan 1, 2024",
    amount: "$79.00",
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "Dec 1, 2023",
    amount: "$79.00",
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "Nov 1, 2023",
    amount: "$79.00",
    status: "Paid",
  },
];

export default function Billing() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: "sub-1",
      name: "Listing Content Generator",
      plan: "Pro Plan",
      price: "$29.00/mo",
      status: "Active",
      nextBilling: "Feb 1, 2024",
    },
    {
      id: "sub-2",
      name: "Image Editor & Optimizer",
      plan: "Starter Plan",
      price: "$19.00/mo",
      status: "Active",
      nextBilling: "Feb 15, 2024",
    },
  ]);

  const handleUnsubscribe = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Billing & Invoices</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your subscriptions and view billing history
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Subscriptions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>
                Manage your active plans and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{sub.name}</span>
                      <Badge variant="outline">{sub.plan}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {sub.price} • Next billing on {sub.nextBilling}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      {sub.status}
                    </Badge>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50">
                          Unsubscribe
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel your {sub.plan} for {sub.name}. You will lose access to premium features at the end of the current billing period.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleUnsubscribe(sub.id)}
                          >
                            Unsubscribe
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
              {subscriptions.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No active subscriptions</p>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">
                    Expires 12/28
                  </p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Billing History */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Download your past invoices
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{invoice.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}