import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const SupportTickets = () => {
  const tickets = [
    { id: 'TKT-001', user: 'James Wilson', subject: 'Payment gateway issue', priority: 'high', status: 'open', date: '2024-12-08' },
    { id: 'TKT-002', user: 'Sarah Johnson', subject: 'Cannot upload documents', priority: 'medium', status: 'in_progress', date: '2024-12-07' },
    { id: 'TKT-003', user: 'Mike Davis', subject: 'Question about subscription', priority: 'low', status: 'resolved', date: '2024-12-06' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Support Tickets"
      pageDescription="Manage user support requests"
    >
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                    ticket.priority === 'medium' ? 'bg-warning/10 text-warning' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {ticket.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'resolved' ? 'bg-success/10 text-success' :
                    ticket.status === 'in_progress' ? 'bg-info/10 text-info' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{ticket.subject}</h3>
                <p className="text-sm text-muted-foreground">From: {ticket.user} • {ticket.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View</Button>
                {ticket.status !== 'resolved' && <Button size="sm">Respond</Button>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SupportTickets;
