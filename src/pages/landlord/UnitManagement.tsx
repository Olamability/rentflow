import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Building2, Users, CreditCard, Wrench, FileText, Settings,
  BarChart3, Crown, Bell as BellIcon
} from "lucide-react";

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

const UnitManagement = () => {
  const units = [
    { id: '1', property: 'Sunset Apartments', unit: '4A', tenant: 'Sarah Johnson', rent: 1500, status: 'occupied' },
    { id: '2', property: 'Sunset Apartments', unit: '2B', tenant: 'John Smith', rent: 1200, status: 'occupied' },
    { id: '3', property: 'Sunset Apartments', unit: '7C', tenant: 'Mike Davis', rent: 1800, status: 'occupied' },
    { id: '4', property: 'Oak Street Condos', unit: '1A', tenant: null, rent: 2000, status: 'vacant' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Unit & Tenant Management"
      pageDescription="Manage units and tenant assignments"
    >
      <div className="bg-card rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold text-foreground">Property</th>
                <th className="p-4 font-semibold text-foreground">Unit</th>
                <th className="p-4 font-semibold text-foreground">Tenant</th>
                <th className="p-4 font-semibold text-foreground">Rent</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-foreground">{unit.property}</td>
                  <td className="p-4 text-foreground font-medium">{unit.unit}</td>
                  <td className="p-4 text-foreground">{unit.tenant || '-'}</td>
                  <td className="p-4 text-foreground">${unit.rent}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      unit.status === 'occupied' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-accent hover:underline text-sm">Manage</button>
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

export default UnitManagement;
