import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Download, Calendar, TrendingUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/admin/SearchBar";
import { TablePagination } from "@/components/admin/TablePagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Subscription, SubscriptionFilters } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const SubscriptionManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SubscriptionFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const allSubscriptions: Subscription[] = [
    { 
      id: 's1',
      landlordId: 'l1',
      landlord: 'James Wilson', 
      plan: 'Pro', 
      status: 'active', 
      revenue: 3000, 
      nextBilling: '2025-01-01',
      startDate: '2024-01-01',
      autoRenew: true
    },
    { 
      id: 's2',
      landlordId: 'l2',
      landlord: 'Alex Chen', 
      plan: 'Pro', 
      status: 'active', 
      revenue: 20000, 
      nextBilling: '2025-03-15',
      startDate: '2024-03-15',
      autoRenew: true
    },
    { 
      id: 's3',
      landlordId: 'l3',
      landlord: 'Maria Garcia', 
      plan: 'Free', 
      status: 'active', 
      revenue: 0, 
      nextBilling: '-',
      startDate: '2024-06-10',
      autoRenew: false
    },
    { 
      id: 's4',
      landlordId: 'l4',
      landlord: 'John Smith', 
      plan: 'Pro', 
      status: 'cancelled', 
      revenue: 3000, 
      nextBilling: '-',
      startDate: '2024-02-20',
      autoRenew: false
    },
    { 
      id: 's5',
      landlordId: 'l5',
      landlord: 'Emma Brown', 
      plan: 'Pro', 
      status: 'trial', 
      revenue: 0, 
      nextBilling: '2024-12-20',
      startDate: '2024-12-06',
      autoRenew: true
    },
    { 
      id: 's6',
      landlordId: 'l6',
      landlord: 'Michael Lee', 
      plan: 'Free', 
      status: 'active', 
      revenue: 0, 
      nextBilling: '-',
      startDate: '2024-08-15',
      autoRenew: false
    },
  ];

  // Filter and search logic
  const filteredSubscriptions = useMemo(() => {
    let result = allSubscriptions;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(sub => 
        sub.landlord.toLowerCase().includes(query) ||
        sub.id.toLowerCase().includes(query)
      );
    }

    // Plan filter
    if (filters.plan) {
      result = result.filter(sub => sub.plan === filters.plan);
    }

    // Status filter
    if (filters.status) {
      result = result.filter(sub => sub.status === filters.status);
    }

    return result;
  }, [allSubscriptions, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredSubscriptions.length / pageSize);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Calculate metrics
  const totalRevenue = filteredSubscriptions.reduce((sum, sub) => sum + sub.revenue, 0);
  const proSubscribers = filteredSubscriptions.filter(s => s.plan === 'Pro' && s.status === 'active').length;
  const freeUsers = filteredSubscriptions.filter(s => s.plan === 'Free').length;
  const trialUsers = filteredSubscriptions.filter(s => s.status === 'trial').length;

  const handleExport = () => {
    toast.success("Subscription data exported successfully");
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Subscription Management"
      pageDescription="Track landlord subscriptions and revenue"
    >
      {/* Header with Search and Actions */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by landlord name or ID..."
            className="flex-1 max-w-md"
          />
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-secondary/30 rounded-md">
          <Select
            value={filters.plan || 'all'}
            onValueChange={(value) => setFilters({ ...filters, plan: value === 'all' ? undefined : value as any })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status || 'all'}
            onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? undefined : value as any })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          {(filters.plan || filters.status) && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Pro Subscribers</div>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-foreground">{proSubscribers}</div>
          <div className="text-xs text-success mt-2">+12 this month</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Free Users</div>
            <Users className="w-5 h-5 text-info" />
          </div>
          <div className="text-3xl font-bold text-foreground">{freeUsers}</div>
          <div className="text-xs text-info mt-2">34% conversion rate</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Trial Users</div>
            <Calendar className="w-5 h-5 text-warning" />
          </div>
          <div className="text-3xl font-bold text-foreground">{trialUsers}</div>
          <div className="text-xs text-muted-foreground mt-2">Active trials</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total MRR</div>
            <CreditCard className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-foreground">₦{(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="text-xs text-success mt-2">+18% growth</div>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold text-foreground">Landlord</th>
                <th className="p-4 font-semibold text-foreground">Plan</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Revenue</th>
                <th className="p-4 font-semibold text-foreground">Start Date</th>
                <th className="p-4 font-semibold text-foreground">Next Billing</th>
                <th className="p-4 font-semibold text-foreground">Auto-Renew</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-foreground font-medium">{sub.landlord}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sub.plan === 'Pro' ? 'bg-accent/10 text-accent' : 
                      sub.plan === 'Enterprise' ? 'bg-info/10 text-info' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sub.status === 'active' ? 'bg-success/10 text-success' :
                      sub.status === 'trial' ? 'bg-info/10 text-info' :
                      sub.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-foreground font-semibold">₦{sub.revenue.toLocaleString()}</td>
                  <td className="p-4 text-foreground">
                    {format(new Date(sub.startDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="p-4 text-foreground">{sub.nextBilling !== '-' ? format(new Date(sub.nextBilling), 'MMM dd, yyyy') : '-'}</td>
                  <td className="p-4">
                    {sub.autoRenew ? (
                      <Badge variant="default" className="bg-success/10 text-success">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      {sub.status === 'trial' && (
                        <Button size="sm" onClick={() => toast.success("Subscription upgraded")}>
                          Upgrade
                        </Button>
                      )}
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
          totalItems={filteredSubscriptions.length}
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

export default SubscriptionManagement;
