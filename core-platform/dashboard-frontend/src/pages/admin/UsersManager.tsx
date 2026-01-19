import { Button } from "@salesduo/ui/button";
import { Input } from "@salesduo/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@salesduo/ui/table";
import { Badge } from "@salesduo/ui/badge";
import { Search, MoreHorizontal, Mail, Shield } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@salesduo/ui/dropdown-menu";

export default function UsersManager() {
    const users = [
        {
            id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "admin",
            status: "active",
            joined: "2024-01-15",
        },
        {
            id: "2",
            name: "Bob Smith",
            email: "bob@company.com",
            role: "user",
            status: "active",
            joined: "2024-02-20",
        },
        {
            id: "3",
            name: "Charlie Brown",
            email: "charlie@startup.io",
            role: "user",
            status: "inactive",
            joined: "2024-03-05",
        },
    ];


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage users and their permissions.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-9" />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground flex items-center">
                                            <Mail className="mr-1 h-3 w-3" />
                                            {user.email}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        {user.role === "admin" && (
                                            <Shield className="h-3 w-3 text-primary" />
                                        )}
                                        <span className="capitalize">{user.role}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={user.status === "active" ? "outline" : "secondary"}
                                        className={
                                            user.status === "active"
                                                ? "text-green-600 border-green-600"
                                                : ""
                                        }
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.joined}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                Ban User
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
