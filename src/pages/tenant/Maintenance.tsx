import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User, Plus, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MaintenanceRequestDialog } from "@/components/tenant/MaintenanceRequestDialog";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/tenant/dashboard" },
  { icon: Search, label: "Search Properties", href: "/tenant/search" },
  { icon: CreditCard, label: "Rent Payment", href: "/tenant/rent" },
  { icon: Wrench, label: "Maintenance", href: "/tenant/maintenance" },
  { icon: FileText, label: "Agreements", href: "/tenant/agreements" },
  { icon: User, label: "Profile", href: "/tenant/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Maintenance = () => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  
  const requests = [
    { id: 'MR-001', title: 'Leaky faucet in bathroom', status: 'in_progress', priority: 'medium', date: '2024-12-03', lastUpdate: 'Technician assigned' },
    { id: 'MR-002', title: 'AC not cooling properly', status: 'completed', priority: 'high', date: '2024-11-15', lastUpdate: 'Repair completed' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Maintenance Requests"
      pageDescription="Submit and track maintenance issues"
      headerActions={
        <Button onClick={() => setIsRequestDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      }
    >
      <MaintenanceRequestDialog
        open={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
        onRequestSubmitted={() => console.log("Request submitted")}
      />
      
      {/* Existing Requests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Your Requests</h3>
        {requests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{request.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'completed' ? 'bg-success/10 text-success' :
                    request.status === 'in_progress' ? 'bg-info/10 text-info' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {request.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-1">{request.title}</h4>
                <p className="text-sm text-muted-foreground">Submitted: {request.date}</p>
                <p className="text-sm text-muted-foreground">Last update: {request.lastUpdate}</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;
