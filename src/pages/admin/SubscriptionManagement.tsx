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

const SubscriptionManagement = () => {
  const subscriptions = [
    { landlord: 'James Wilson', plan: 'Pro', status: 'active', revenue: 3000, nextBilling: '2025-01-01' },
    { landlord: 'Alex Chen', plan: 'Pro', status: 'active', revenue: 20000, nextBilling: '2025-03-15' },
    { landlord: 'Maria Garcia', plan: 'Free', status: 'active', revenue: 0, nextBilling: '-' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Subscription Management"
      pageDescription="Track landlord subscriptions and revenue"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">156</div>
          <div className="text-sm text-muted-foreground mt-1">Pro Subscribers</div>
          <div className="text-xs text-success mt-2">+12 this month</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">300</div>
          <div className="text-sm text-muted-foreground mt-1">Free Users</div>
          <div className="text-xs text-info mt-2">34% conversion rate</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-foreground">₦468K</div>
          <div className="text-sm text-muted-foreground mt-1">MRR</div>
          <div className="text-xs text-success mt-2">+18% growth</div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold text-foreground">Landlord</th>
                <th className="p-4 font-semibold text-foreground">Plan</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Revenue</th>
                <th className="p-4 font-semibold text-foreground">Next Billing</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr key={idx} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-foreground">{sub.landlord}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sub.plan === 'Pro' ? 'bg-accent/10 text-accent' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-foreground font-semibold">₦{sub.revenue.toLocaleString()}</td>
                  <td className="p-4 text-foreground">{sub.nextBilling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default SubscriptionManagement;
