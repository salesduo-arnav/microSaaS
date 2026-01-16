import { useState } from 'react'
import {
    Bell,
    Home,
    LineChart,
    Package2,
    Settings,
    Users,
    Plus,
    MoreHorizontal,
    Search,
    ArrowUpRight
} from "lucide-react"

// Importing from your shared UI kit
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Badge,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@salesduo/ui"

// Mock Data for the Dashboard
const recentCampaigns = [
    { id: "CMP-101", name: "Q1 Outreach", status: "Active", sent: 12500, openRate: "45%", type: "Email" },
    { id: "CMP-102", name: "Webinar Invite", status: "Completed", sent: 5400, openRate: "62%", type: "Event" },
    { id: "CMP-103", name: "Product Update", status: "Draft", sent: 0, openRate: "-", type: "In-App" },
    { id: "CMP-104", name: "Churn Prevention", status: "Active", sent: 890, openRate: "33%", type: "Email" },
    { id: "CMP-105", name: "Black Friday", status: "Scheduled", sent: 0, openRate: "-", type: "Push" },
]

export default function App() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/* Sidebar Navigation Mockup */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">SalesDuo</span>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full bg-muted/40"><Home className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full"><Users className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full"><LineChart className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full"><Settings className="h-5 w-5" /></Button>
                </nav>
            </aside>

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search campaigns..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {/* Main Dashboard Content */}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <Button variant="outline" className="h-8 gap-1">
                                <Settings className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">View Settings</span>
                            </Button>

                            {/* "Sophisticated" Element: Slide-over Sheet for Creation */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="sm" className="h-8 gap-1">
                                        <Plus className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Campaign</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Create Campaign</SheetTitle>
                                        <SheetDescription>
                                            Launch a new marketing initiative.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <label htmlFor="name" className="text-sm font-medium">Campaign Name</label>
                                            <Input id="name" placeholder="Summer Sale 2026" />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="type" className="text-sm font-medium">Channel</label>
                                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                <option>Email Blast</option>
                                                <option>Push Notification</option>
                                                <option>In-App Message</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                        <Button variant="outline">Cancel</Button>
                                        <Button type="submit">Launch</Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            {/* Quick Stats Cards */}
                            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                        <span className="text-muted-foreground">$</span>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$45,231.89</div>
                                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12</div>
                                        <p className="text-xs text-muted-foreground">+2 since yesterday</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Avg Open Rate</CardTitle>
                                        <LineChart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">42.8%</div>
                                        <p className="text-xs text-muted-foreground">+4% from last month</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Complex Data Table */}
                            <Card className="xl:col-span-2">
                                <CardHeader className="flex flex-row items-center">
                                    <div className="grid gap-2">
                                        <CardTitle>Recent Campaigns</CardTitle>
                                        <CardDescription>
                                            Manage your marketing initiatives and view performance.
                                        </CardDescription>
                                    </div>
                                    <Button asChild size="sm" variant="outline" className="ml-auto gap-1">
                                        <a href="#">
                                            View All
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Campaign</TableHead>
                                                <TableHead className="hidden xl:table-column">Type</TableHead>
                                                <TableHead className="hidden xl:table-column">Status</TableHead>
                                                <TableHead className="hidden xl:table-column">Date</TableHead>
                                                <TableHead className="text-right">Open Rate</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentCampaigns.map((campaign) => (
                                                <TableRow key={campaign.id}>
                                                    <TableCell>
                                                        <div className="font-medium">{campaign.name}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {campaign.type}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden xl:table-column">
                                                        <Badge className="text-xs" variant="outline">
                                                            {campaign.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <span className={`font-bold ${campaign.openRate !== "-" && parseInt(campaign.openRate) > 50
                                                                    ? "text-green-600"
                                                                    : "text-muted-foreground"
                                                                }`}>
                                                                {campaign.openRate}
                                                            </span>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                    <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}
