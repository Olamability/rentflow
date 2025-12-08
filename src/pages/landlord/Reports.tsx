import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Building2, Users, CreditCard, Wrench, FileText, Settings,
  BarChart3, Crown, Bell as BellIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/landlord/dashboard" },
  { icon: Building2, label: "Properties", href: "/landlord/properties" },
  { icon: Users, label: "Tenants", href: "/landlord/units" },
  { icon: CreditCard, label: "Rent Collection", href: "/landlord/rent-collection" },
  { icon: Wrench, label: "Maintenance", href: "/landlord/maintenance" },
  { icon: FileText, label: "Agreements", href: "/landlord/agreements" },
  { icon: BellIcon, label: "Reminders", href: "/landlord/reminders" },
  { icon: BarChart3, label: "Reports", href: "/landlord/reports" },
  { icon: Crown, label: "Subscription", href: "/landlord/subscription" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Reports = () => {
  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Reports & Analytics"
      pageDescription="View detailed reports and insights"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">$45,231</div>
          <div className="text-sm text-muted-foreground mt-1">Total Revenue (YTD)</div>
          <div className="text-xs text-success mt-2">+12.5% from last year</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">94%</div>
          <div className="text-sm text-muted-foreground mt-1">Avg Occupancy Rate</div>
          <div className="text-xs text-success mt-2">+3.2% from last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">28</div>
          <div className="text-sm text-muted-foreground mt-1">Active Leases</div>
          <div className="text-xs text-success mt-2">+2 new this month</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">5</div>
          <div className="text-sm text-muted-foreground mt-1">Open Requests</div>
          <div className="text-xs text-success mt-2">-3 from last week</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Rent Collection</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart Placeholder - Rent collection trend
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Occupancy Over Time</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart Placeholder - Occupancy rate trend
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
