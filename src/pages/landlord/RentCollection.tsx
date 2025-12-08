import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Building2, Users, CreditCard, Wrench, FileText, Settings,
  BarChart3, Crown, Bell as BellIcon, CheckCircle2, Clock, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const RentCollection = () => {
  const payments = [
    { id: '1', tenant: 'Sarah Johnson', unit: 'Unit 4A', amount: 1500, due: '2024-12-01', status: 'paid', paidDate: '2024-12-05' },
    { id: '2', tenant: 'John Smith', unit: 'Unit 2B', amount: 1200, due: '2024-12-01', status: 'paid', paidDate: '2024-12-05' },
    { id: '3', tenant: 'Mike Davis', unit: 'Unit 7C', amount: 1800, due: '2024-12-01', status: 'pending' },
    { id: '4', tenant: 'Emily Brown', unit: 'Unit 1A', amount: 1350, due: '2024-11-01', status: 'overdue' },
  ];

  const stats = [
    { label: 'Collected This Month', value: '$2,700', icon: CheckCircle2, color: 'text-success' },
    { label: 'Pending', value: '$1,800', icon: Clock, color: 'text-warning' },
    { label: 'Overdue', value: '$1,350', icon: AlertCircle, color: 'text-destructive' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Rent Collection"
      pageDescription="Track and manage rent payments"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold text-foreground">Tenant</th>
                <th className="p-4 font-semibold text-foreground">Unit</th>
                <th className="p-4 font-semibold text-foreground">Amount</th>
                <th className="p-4 font-semibold text-foreground">Due Date</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-foreground">{payment.tenant}</td>
                  <td className="p-4 text-foreground">{payment.unit}</td>
                  <td className="p-4 text-foreground font-semibold">${payment.amount}</td>
                  <td className="p-4 text-foreground">{payment.due}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid' ? 'bg-success/10 text-success' : 
                      payment.status === 'pending' ? 'bg-warning/10 text-warning' : 
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm">
                      {payment.status === 'paid' ? 'View Receipt' : 'Send Reminder'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RentCollection;
