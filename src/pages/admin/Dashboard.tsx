import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings
} from "lucide-react";
import { Card } from "@/components/ui/card";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', color: 'text-info' },
    { label: 'Active Landlords', value: '456', change: '+8%', color: 'text-success' },
    { label: 'Active Tenants', value: '778', change: '+15%', color: 'text-success' },
    { label: 'Monthly Revenue', value: '$45,231', change: '+23%', color: 'text-success' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Admin Dashboard"
      pageDescription="Platform overview and metrics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            <div className={`text-xs mt-2 ${stat.color}`}>{stat.change} from last month</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-foreground">New landlord registration</span>
              <span className="text-xs text-muted-foreground">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-foreground">Support ticket created</span>
              <span className="text-xs text-muted-foreground">15 mins ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-foreground">Pro subscription activated</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">System Uptime</span>
                <span className="text-foreground font-medium">99.9%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: '99.9%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Active Sessions</span>
                <span className="text-foreground font-medium">342</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-info" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
