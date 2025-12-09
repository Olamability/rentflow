import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Shield, CheckCircle2, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FraudFlagDialog } from "@/components/admin/FraudFlagDialog";
import { toast } from "sonner";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const UserManagement = () => {
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const users = [
    { id: '1', name: 'James Wilson', email: 'james@rentflow.com', role: 'landlord', status: 'active', verified: true },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@email.com', role: 'tenant', status: 'active', verified: true },
    { id: '3', name: 'Mike Davis', email: 'mike@email.com', role: 'tenant', status: 'active', verified: true },
    { id: '4', name: 'John Doe', email: 'john@email.com', role: 'landlord', status: 'pending', verified: false },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="User Management"
      pageDescription="Manage platform users"
    >
      {selectedUser && (
        <FraudFlagDialog
          open={isFlagDialogOpen}
          onOpenChange={setIsFlagDialogOpen}
          user={selectedUser}
          onFlagUser={() => console.log("User flagged")}
        />
      )}
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold text-foreground">Name</th>
                <th className="p-4 font-semibold text-foreground">Email</th>
                <th className="p-4 font-semibold text-foreground">Role</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Verified</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-foreground">{user.name}</td>
                  <td className="p-4 text-foreground">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'landlord' ? 'bg-accent/10 text-accent' : 'bg-info/10 text-info'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.verified ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      {!user.verified && (
                        <Button 
                          size="sm"
                          onClick={() => toast.success(`${user.name} has been approved`)}
                        >
                          Approve
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsFlagDialogOpen(true);
                        }}
                      >
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default UserManagement;
