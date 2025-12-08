import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Building2, Users, CreditCard, Wrench, FileText, Settings,
  BarChart3, Crown, Bell as BellIcon
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

const Maintenance = () => {
  const requests = [
    { id: 'MR-001', tenant: 'Sarah Johnson', unit: 'Unit 4A', issue: 'Leaky faucet in bathroom', priority: 'medium', status: 'in_progress', date: '2024-12-03' },
    { id: 'MR-002', tenant: 'John Smith', unit: 'Unit 2B', issue: 'AC not cooling properly', priority: 'high', status: 'completed', date: '2024-11-15' },
    { id: 'MR-003', tenant: 'Mike Davis', unit: 'Unit 7C', issue: 'Broken window latch', priority: 'low', status: 'pending', date: '2024-12-07' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Maintenance Requests"
      pageDescription="Track and manage maintenance requests"
    >
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{request.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                    request.priority === 'medium' ? 'bg-warning/10 text-warning' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {request.priority} priority
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'completed' ? 'bg-success/10 text-success' :
                    request.status === 'in_progress' ? 'bg-info/10 text-info' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {request.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{request.issue}</h3>
                <p className="text-sm text-muted-foreground">{request.tenant} - {request.unit}</p>
                <p className="text-xs text-muted-foreground mt-2">Submitted: {request.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm">Assign Worker</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;
