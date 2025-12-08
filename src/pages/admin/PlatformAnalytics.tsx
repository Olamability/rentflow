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

const PlatformAnalytics = () => {
  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Platform Analytics"
      pageDescription="Detailed platform metrics and insights"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">1,234</div>
          <div className="text-sm text-muted-foreground mt-1">Total Users</div>
          <div className="text-xs text-success mt-2">+15% this month</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">345</div>
          <div className="text-sm text-muted-foreground mt-1">Active Properties</div>
          <div className="text-xs text-success mt-2">+8% this month</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">$125K</div>
          <div className="text-sm text-muted-foreground mt-1">Total GMV</div>
          <div className="text-xs text-success mt-2">+23% this month</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Growth Metrics</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Chart Placeholder - User growth over time
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default PlatformAnalytics;
