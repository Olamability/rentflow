import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Shield, CheckCircle2, XCircle, Download, Trash2, Ban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FraudFlagDialog } from "@/components/admin/FraudFlagDialog";
import { UserDetailDialog } from "@/components/admin/UserDetailDialog";
import { SearchBar } from "@/components/admin/SearchBar";
import { UserFiltersBar } from "@/components/admin/UserFiltersBar";
import { TablePagination } from "@/components/admin/TablePagination";
import { User, UserFilters } from "@/types/admin";
import { toast } from "sonner";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const UserManagement = () => {
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<UserFilters>({});
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Mock data with expanded fields
  const allUsers: User[] = [
    { 
      id: '1', 
      name: 'James Wilson', 
      email: 'james@rentflow.com', 
      role: 'landlord', 
      status: 'active', 
      verified: true,
      createdAt: '2024-01-15T10:00:00Z',
      lastLogin: '2024-12-09T08:30:00Z',
      phone: '+234 801 234 5678',
      address: '123 Lagos Street, Victoria Island',
      kycStatus: 'approved'
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      email: 'sarah@email.com', 
      role: 'tenant', 
      status: 'active', 
      verified: true,
      createdAt: '2024-02-20T14:30:00Z',
      lastLogin: '2024-12-08T19:45:00Z',
      phone: '+234 802 345 6789',
      kycStatus: 'approved'
    },
    { 
      id: '3', 
      name: 'Mike Davis', 
      email: 'mike@email.com', 
      role: 'tenant', 
      status: 'active', 
      verified: true,
      createdAt: '2024-03-10T09:15:00Z',
      lastLogin: '2024-12-09T07:20:00Z',
      kycStatus: 'approved'
    },
    { 
      id: '4', 
      name: 'John Doe', 
      email: 'john@email.com', 
      role: 'landlord', 
      status: 'pending', 
      verified: false,
      createdAt: '2024-12-08T16:00:00Z',
      phone: '+234 803 456 7890',
      kycStatus: 'pending'
    },
    { 
      id: '5', 
      name: 'Emma Brown', 
      email: 'emma@email.com', 
      role: 'tenant', 
      status: 'suspended', 
      verified: true,
      createdAt: '2024-05-22T11:00:00Z',
      lastLogin: '2024-11-30T14:00:00Z',
      kycStatus: 'approved',
      fraudFlags: [
        {
          id: 'f1',
          reason: 'Multiple failed payment attempts with different cards',
          flaggedBy: 'Admin System',
          flaggedAt: '2024-11-30T14:30:00Z',
          status: 'investigating'
        }
      ]
    },
    { 
      id: '6', 
      name: 'Alex Chen', 
      email: 'alex@email.com', 
      role: 'landlord', 
      status: 'active', 
      verified: true,
      createdAt: '2024-06-15T13:20:00Z',
      lastLogin: '2024-12-09T10:15:00Z',
      phone: '+234 804 567 8901',
      kycStatus: 'approved'
    },
  ];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let result = allUsers;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    }

    // Role filter
    if (filters.role) {
      result = result.filter(user => user.role === filters.role);
    }

    // Status filter
    if (filters.status) {
      result = result.filter(user => user.status === filters.status);
    }

    // Verified filter
    if (filters.verified !== undefined) {
      result = result.filter(user => user.verified === filters.verified);
    }

    // KYC Status filter
    if (filters.kycStatus) {
      result = result.filter(user => user.kycStatus === filters.kycStatus);
    }

    return result;
  }, [allUsers, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailDialogOpen(true);
  };

  const handleFlagUser = (user: User) => {
    setSelectedUser(user);
    setIsFlagDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }
    toast.success(`${selectedUsers.length} users deleted successfully`);
    setSelectedUsers([]);
  };

  const handleBulkSuspend = () => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }
    toast.success(`${selectedUsers.length} users suspended successfully`);
    setSelectedUsers([]);
  };

  const handleExportUsers = () => {
    toast.success("User data exported successfully");
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="User Management"
      pageDescription="Manage platform users"
    >
      {selectedUser && (
        <>
          <FraudFlagDialog
            open={isFlagDialogOpen}
            onOpenChange={setIsFlagDialogOpen}
            user={selectedUser}
            onFlagUser={() => console.log("User flagged")}
          />
          <UserDetailDialog
            open={isDetailDialogOpen}
            onOpenChange={setIsDetailDialogOpen}
            user={selectedUser}
            onEdit={() => toast.info("Edit functionality coming soon")}
            onSuspend={() => {
              toast.success(`${selectedUser.name} has been suspended`);
              setIsDetailDialogOpen(false);
            }}
            onDelete={() => {
              toast.success(`${selectedUser.name} has been deleted`);
              setIsDetailDialogOpen(false);
            }}
          />
        </>
      )}

      {/* Header with Search and Actions */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, email, or ID..."
            className="flex-1 max-w-md"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportUsers}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {selectedUsers.length > 0 && (
              <>
                <Button variant="outline" onClick={handleBulkSuspend}>
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend ({selectedUsers.length})
                </Button>
                <Button variant="destructive" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedUsers.length})
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <UserFiltersBar
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* User Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4">
                  <Checkbox
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 font-semibold text-foreground">Name</th>
                <th className="p-4 font-semibold text-foreground">Email</th>
                <th className="p-4 font-semibold text-foreground">Role</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Verified</th>
                <th className="p-4 font-semibold text-foreground">KYC</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                    />
                  </td>
                  <td className="p-4 text-foreground font-medium">{user.name}</td>
                  <td className="p-4 text-foreground">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'landlord' ? 'bg-accent/10 text-accent' : 
                      user.role === 'tenant' ? 'bg-info/10 text-info' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-success/10 text-success' : 
                      user.status === 'pending' ? 'bg-warning/10 text-warning' :
                      user.status === 'suspended' ? 'bg-destructive/10 text-destructive' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.verified ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </td>
                  <td className="p-4">
                    {user.kycStatus && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.kycStatus === 'approved' ? 'bg-success/10 text-success' :
                        user.kycStatus === 'pending' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {user.kycStatus}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewUser(user)}
                      >
                        View
                      </Button>
                      {!user.verified && (
                        <Button 
                          size="sm"
                          onClick={() => toast.success(`${user.name} has been approved`)}
                        >
                          Approve
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFlagUser(user)}
                        title="Flag for fraud"
                      >
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredUsers.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </Card>
    </DashboardLayout>
  );
};

export default UserManagement;
