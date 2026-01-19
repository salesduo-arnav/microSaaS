import { Button } from "@salesduo/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@salesduo/ui/table";
import { Badge } from "@salesduo/ui/badge";
import { Plus, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@salesduo/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function AppsManager() {
    const navigate = useNavigate();
    const apps = [
        {
            id: "1",
            name: "Campaign Manager",
            status: "active",
            users: 120,
            lastUpdated: "2024-03-10",
        },
        {
            id: "2",
            name: "Review Automator",
            status: "active",
            users: 85,
            lastUpdated: "2024-03-08",
        },
        {
            id: "3",
            name: "Inventory Sync",
            status: "maintenance",
            users: 45,
            lastUpdated: "2024-03-01",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Apps</h1>
                    <p className="text-muted-foreground">
                        Manage your applications and their availability.
                    </p>
                </div>
                <Button onClick={() => navigate("/admin/apps/new")}>
                    <Plus className="mr-2 h-4 w-4" /> Add App
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Active Users</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {apps.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.name}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={app.status === "active" ? "default" : "secondary"}
                                    >
                                        {app.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{app.users}</TableCell>
                                <TableCell>{app.lastUpdated}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                            <DropdownMenuItem>View Users</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                Deactivate
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
