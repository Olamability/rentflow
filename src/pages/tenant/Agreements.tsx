import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/tenant/dashboard" },
  { icon: Search, label: "Search Properties", href: "/tenant/search" },
  { icon: CreditCard, label: "Rent Payment", href: "/tenant/rent" },
  { icon: Wrench, label: "Maintenance", href: "/tenant/maintenance" },
  { icon: FileText, label: "Agreements", href: "/tenant/agreements" },
  { icon: User, label: "Profile", href: "/tenant/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Agreements = () => {
  const agreement = {
    id: 'AGR-001',
    property: 'Sunset Apartments - Unit 4A',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    rent: 1500,
    deposit: 2000,
    status: 'active',
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Tenancy Agreements"
      pageDescription="View and manage your lease agreements"
    >
      <Card className="p-8 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Current Lease Agreement</h2>
            <p className="text-muted-foreground">{agreement.property}</p>
          </div>
          <span className="px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
            {agreement.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Start Date</div>
            <div className="text-lg font-semibold text-foreground">{agreement.startDate}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">End Date</div>
            <div className="text-lg font-semibold text-foreground">{agreement.endDate}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Monthly Rent</div>
            <div className="text-lg font-semibold text-foreground">${agreement.rent}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Security Deposit</div>
            <div className="text-lg font-semibold text-foreground">${agreement.deposit}</div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-semibold text-foreground mb-4">Lease Terms</h3>
          <ul className="space-y-2 text-foreground">
            <li>• Rent due on 1st of each month</li>
            <li>• Late fee of $50 after 5 days</li>
            <li>• No smoking inside the unit</li>
            <li>• 30 days notice required for move-out</li>
            <li>• Pets allowed with additional deposit</li>
          </ul>
        </div>

        <div className="flex gap-3 mt-8">
          <Button className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Agreement
          </Button>
          <Button variant="outline" className="flex-1">View Full Document</Button>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Agreements;
