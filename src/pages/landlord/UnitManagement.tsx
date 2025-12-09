import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Building2, Users, CreditCard, Wrench, FileText, Settings,
  BarChart3, Crown, Bell as BellIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationReviewDialog } from "@/components/landlord/ApplicationReviewDialog";

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
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  const units = [
    { id: '1', property: 'Sunset Apartments', unit: '4A', tenant: 'Sarah Johnson', rent: 1500, status: 'occupied' },
    { id: '2', property: 'Sunset Apartments', unit: '2B', tenant: 'John Smith', rent: 1200, status: 'occupied' },
    { id: '3', property: 'Sunset Apartments', unit: '7C', tenant: 'Mike Davis', rent: 1800, status: 'occupied' },
    { id: '4', property: 'Oak Street Condos', unit: '1A', tenant: null, rent: 2000, status: 'vacant' },
  ];

  const applications = [
    { 
      id: '1', 
      tenantName: 'Emily Brown', 
      unitNumber: 'Unit 1A', 
      moveInDate: '2025-01-01', 
      employer: 'Tech Corp',
      position: 'Software Engineer',
      income: 90000,
      referenceName: 'Previous Landlord',
      referencePhone: '+1 (555) 999-8888',
      status: 'pending' 
    },
    { 
      id: '2', 
      tenantName: 'David Wilson', 
      unitNumber: 'Unit 3B', 
      moveInDate: '2025-01-15', 
      employer: 'Finance Inc',
      position: 'Accountant',
      income: 75000,
      referenceName: 'Manager',
      referencePhone: '+1 (555) 888-7777',
      status: 'pending' 
    },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Unit & Tenant Management"
      pageDescription="Manage units and tenant assignments"
    >
      {selectedApplication && (
        <ApplicationReviewDialog
          open={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          application={selectedApplication}
          onApprove={() => console.log("Approved")}
          onReject={() => console.log("Rejected")}
        />
      )}

      <Tabs defaultValue="units" className="space-y-4">
        <TabsList>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="applications">
            Applications
            {applications.filter(a => a.status === 'pending').length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-warning/20 text-warning rounded-full text-xs">
                {applications.filter(a => a.status === 'pending').length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="units">
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
        </TabsContent>

        <TabsContent value="applications">
          <div className="bg-card rounded-xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-semibold text-foreground">Applicant</th>
                    <th className="p-4 font-semibold text-foreground">Unit</th>
                    <th className="p-4 font-semibold text-foreground">Move-in Date</th>
                    <th className="p-4 font-semibold text-foreground">Income</th>
                    <th className="p-4 font-semibold text-foreground">Status</th>
                    <th className="p-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                      <td className="p-4 text-foreground">{app.tenantName}</td>
                      <td className="p-4 text-foreground font-medium">{app.unitNumber}</td>
                      <td className="p-4 text-foreground">{app.moveInDate}</td>
                      <td className="p-4 text-foreground">${app.income.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'pending' ? 'bg-warning/10 text-warning' :
                          app.status === 'approved' ? 'bg-success/10 text-success' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsReviewDialogOpen(true);
                          }}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UnitManagement;
