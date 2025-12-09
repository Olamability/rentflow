import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Download, Filter, FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/admin/SearchBar";
import { TablePagination } from "@/components/admin/TablePagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuditLog } from "@/types/admin";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const AuditLogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const allLogs: AuditLog[] = [
    {
      id: "log1",
      adminId: "a1",
      adminName: "Admin User",
      action: "User Suspended",
      resource: "User",
      resourceId: "u5",
      changes: { status: { from: "active", to: "suspended" } },
      timestamp: "2024-12-09T10:30:00Z",
      ipAddress: "192.168.1.1"
    },
    {
      id: "log2",
      adminId: "a1",
      adminName: "Admin User",
      action: "Subscription Updated",
      resource: "Subscription",
      resourceId: "s2",
      changes: { plan: { from: "Free", to: "Pro" } },
      timestamp: "2024-12-09T09:15:00Z",
      ipAddress: "192.168.1.1"
    },
    {
      id: "log3",
      adminId: "a2",
      adminName: "Super Admin",
      action: "Support Ticket Resolved",
      resource: "Ticket",
      resourceId: "TKT-003",
      changes: { status: { from: "in_progress", to: "resolved" } },
      timestamp: "2024-12-08T16:45:00Z",
      ipAddress: "10.0.0.5"
    },
    {
      id: "log4",
      adminId: "a1",
      adminName: "Admin User",
      action: "User Flagged for Fraud",
      resource: "User",
      resourceId: "u5",
      changes: { fraudFlag: { added: true, reason: "Multiple failed payment attempts" } },
      timestamp: "2024-12-08T14:20:00Z",
      ipAddress: "192.168.1.1"
    },
    {
      id: "log5",
      adminId: "a2",
      adminName: "Super Admin",
      action: "Configuration Updated",
      resource: "Config",
      resourceId: "c9",
      changes: { value: { from: "false", to: "true" } },
      timestamp: "2024-12-08T11:00:00Z",
      ipAddress: "10.0.0.5"
    },
    {
      id: "log6",
      adminId: "a1",
      adminName: "Admin User",
      action: "User Approved",
      resource: "User",
      resourceId: "u4",
      changes: { verified: { from: false, to: true } },
      timestamp: "2024-12-07T10:30:00Z",
      ipAddress: "192.168.1.1"
    },
    {
      id: "log7",
      adminId: "a2",
      adminName: "Super Admin",
      action: "Email Template Updated",
      resource: "EmailTemplate",
      resourceId: "et1",
      changes: { subject: { from: "Welcome!", to: "Welcome to RentFlow!" } },
      timestamp: "2024-12-06T15:30:00Z",
      ipAddress: "10.0.0.5"
    },
    {
      id: "log8",
      adminId: "a1",
      adminName: "Admin User",
      action: "Bulk User Export",
      resource: "User",
      timestamp: "2024-12-06T09:00:00Z",
      ipAddress: "192.168.1.1"
    },
  ];

  const filteredLogs = useMemo(() => {
    let result = allLogs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.action.toLowerCase().includes(query) ||
        log.adminName.toLowerCase().includes(query) ||
        log.resourceId?.toLowerCase().includes(query)
      );
    }

    if (actionFilter !== 'all') {
      result = result.filter(log => log.action.includes(actionFilter));
    }

    if (resourceFilter !== 'all') {
      result = result.filter(log => log.resource === resourceFilter);
    }

    return result;
  }, [allLogs, searchQuery, actionFilter, resourceFilter]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleExport = () => {
    toast.success("Audit logs exported successfully");
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActionFilter("all");
    setResourceFilter("all");
  };

  const getActionColor = (action: string) => {
    if (action.includes("Delete") || action.includes("Suspend") || action.includes("Flag")) {
      return "bg-destructive/10 text-destructive";
    }
    if (action.includes("Create") || action.includes("Approve")) {
      return "bg-success/10 text-success";
    }
    if (action.includes("Update")) {
      return "bg-info/10 text-info";
    }
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Audit Log"
      pageDescription="Track all administrative actions and changes"
    >
      {/* Header */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by action, admin, or resource ID..."
            className="flex-1 max-w-md"
          />
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-secondary/30 rounded-md">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="Create">Create</SelectItem>
              <SelectItem value="Update">Update</SelectItem>
              <SelectItem value="Delete">Delete</SelectItem>
              <SelectItem value="Suspend">Suspend</SelectItem>
              <SelectItem value="Approve">Approve</SelectItem>
              <SelectItem value="Flag">Flag</SelectItem>
            </SelectContent>
          </Select>

          <Select value={resourceFilter} onValueChange={setResourceFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Resource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Subscription">Subscription</SelectItem>
              <SelectItem value="Ticket">Ticket</SelectItem>
              <SelectItem value="Config">Configuration</SelectItem>
              <SelectItem value="EmailTemplate">Email Template</SelectItem>
            </SelectContent>
          </Select>

          {(actionFilter !== 'all' || resourceFilter !== 'all' || searchQuery) && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Audit Log Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold text-foreground">Timestamp</th>
                <th className="p-4 font-semibold text-foreground">Admin</th>
                <th className="p-4 font-semibold text-foreground">Action</th>
                <th className="p-4 font-semibold text-foreground">Resource</th>
                <th className="p-4 font-semibold text-foreground">Changes</th>
                <th className="p-4 font-semibold text-foreground">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-foreground">
                    <div className="text-sm">
                      {format(new Date(log.timestamp), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(log.timestamp), 'HH:mm:ss')}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">{log.adminName}</div>
                    <div className="text-xs text-muted-foreground">{log.adminId}</div>
                  </td>
                  <td className="p-4">
                    <Badge className={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">{log.resource}</div>
                    {log.resourceId && (
                      <div className="text-xs text-muted-foreground font-mono">{log.resourceId}</div>
                    )}
                  </td>
                  <td className="p-4">
                    {log.changes ? (
                      <div className="text-xs font-mono space-y-1">
                        {Object.entries(log.changes).map(([key, value]) => (
                          <div key={key} className="text-muted-foreground">
                            <span className="font-semibold">{key}:</span>{" "}
                            {typeof value === 'object' && 'from' in value && 'to' in value ? (
                              <>
                                <span className="text-destructive">{String(value.from)}</span>
                                {" → "}
                                <span className="text-success">{String(value.to)}</span>
                              </>
                            ) : (
                              <span>{JSON.stringify(value)}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">
                    {log.ipAddress || '-'}
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
          totalItems={filteredLogs.length}
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

export default AuditLogPage;
