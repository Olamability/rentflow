import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User, Mail, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const Profile = () => {
  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Profile"
      pageDescription="Manage your personal information"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input defaultValue="Sarah Johnson" className="mt-2" />
            </div>
            <div>
              <Label>Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input defaultValue="sarah@email.com" className="pl-10" />
              </div>
            </div>
            <div>
              <Label>Phone</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input defaultValue="+1 (555) 234-5678" className="pl-10" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Current Residence</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Property:</span>
              <span className="text-foreground font-medium">Sunset Apartments</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit:</span>
              <span className="text-foreground font-medium">4A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lease Start:</span>
              <span className="text-foreground font-medium">Jan 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lease End:</span>
              <span className="text-foreground font-medium">Jan 14, 2025</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button className="flex-1">Save Changes</Button>
          <Button variant="outline" className="flex-1">Cancel</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
