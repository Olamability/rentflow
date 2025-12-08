import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User, Plus, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      }
    >
      {/* New Request Form */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Submit New Request</h3>
        <div className="space-y-4">
          <div>
            <Label>Issue Description</Label>
            <Textarea placeholder="Describe the maintenance issue..." className="mt-2" />
          </div>
          <div>
            <Label>Upload Photos/Videos</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            </div>
          </div>
          <Button className="w-full">Submit Request</Button>
        </div>
      </Card>

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
