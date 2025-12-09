import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Building2, Users, CreditCard, Wrench, FileText, Settings,
  BarChart3, Crown, Bell as BellIcon, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreateReminderDialog } from "@/components/landlord/CreateReminderDialog";

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

const AutomatedReminders = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const reminders = [
    { id: '1', type: 'Rent Due', schedule: '3 days before due date', channels: ['Email', 'SMS'], active: true },
    { id: '2', type: 'Rent Overdue', schedule: '1 day after due date', channels: ['Email', 'SMS', 'Push'], active: true },
    { id: '3', type: 'Lease Renewal', schedule: '30 days before expiry', channels: ['Email'], active: true },
    { id: '4', type: 'Maintenance Update', schedule: 'On status change', channels: ['Push'], active: false },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Automated Reminders"
      pageDescription="Configure automated notifications"
      headerActions={
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Reminder
        </Button>
      }
    >
      <CreateReminderDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onReminderCreated={() => console.log("Reminder created")}
      />
      
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{reminder.type}</h3>
                <p className="text-sm text-muted-foreground mb-2">Schedule: {reminder.schedule}</p>
                <div className="flex gap-2">
                  {reminder.channels.map((channel, idx) => (
                    <span key={idx} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reminder.active ? 'bg-success/10 text-success' : 'bg-secondary text-secondary-foreground'
                }`}>
                  {reminder.active ? 'Active' : 'Inactive'}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AutomatedReminders;
