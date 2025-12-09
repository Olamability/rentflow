import { 
  Building2, 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Settings, 
  Bell,
  MessageSquare,
  Calendar,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sidebarLinks = [
  { icon: Home, label: "Dashboard", href: "/tenant", active: true },
  { icon: CreditCard, label: "Payments", href: "/tenant/rent" },
  { icon: Wrench, label: "Maintenance", href: "/tenant/maintenance" },
  { icon: FileText, label: "Documents", href: "/tenant/documents" },
  { icon: MessageSquare, label: "Messages", href: "/tenant/messages" },
  { icon: Settings, label: "Settings", href: "/tenant/settings" },
];

const paymentHistory = [
  { month: "December 2024", amount: "$1,500", date: "Dec 1", status: "Upcoming" },
  { month: "November 2024", amount: "$1,500", date: "Nov 1", status: "Paid" },
  { month: "October 2024", amount: "$1,500", date: "Oct 1", status: "Paid" },
  { month: "September 2024", amount: "$1,500", date: "Sep 1", status: "Paid" },
];

const maintenanceRequests = [
  { id: "#1234", title: "Leaky faucet in bathroom", status: "In Progress", date: "Dec 3" },
  { id: "#1198", title: "AC not cooling properly", status: "Completed", date: "Nov 15" },
];

const documents = [
  { name: "Lease Agreement", type: "PDF", size: "2.4 MB", date: "Jan 15, 2024" },
  { name: "Move-in Checklist", type: "PDF", size: "1.1 MB", date: "Jan 15, 2024" },
  { name: "November Receipt", type: "PDF", size: "245 KB", date: "Nov 1, 2024" },
];

const TenantDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0">
        <div className="p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">RentFlow</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  link.active 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Tenant Portal</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Sarah</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">SJ</span>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Lease Overview Card */}
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop"
                  alt="Property"
                  className="w-24 h-20 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Sunset Apartments - Unit 4A</h2>
                  <p className="text-muted-foreground">123 Main Street, Apt 4A, San Francisco, CA 94102</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Lease ends: Jan 15, 2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">$1,500</div>
                <div className="text-muted-foreground">/month</div>
                <Button variant="accent" className="mt-3">
                  Pay Rent
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Payment History */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Payment History</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                      <div>
                        <div className="font-medium text-foreground">{payment.month}</div>
                        <div className="text-sm text-muted-foreground">Due: {payment.date}</div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div className="font-semibold text-foreground">{payment.amount}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          payment.status === 'Paid' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {payment.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Maintenance Requests */}
              <div className="bg-card rounded-xl border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Maintenance</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    New Request
                  </Button>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {maintenanceRequests.map((request) => (
                      <div key={request.id} className="p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{request.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'Completed' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-info/10 text-info'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="font-medium text-foreground text-sm">{request.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{request.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-card rounded-xl border border-border">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">Documents</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground text-sm">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">{doc.size}</div>
                          </div>
                        </div>
                        <button className="p-2 text-muted-foreground hover:text-foreground">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="mt-6 p-4 rounded-xl bg-warning/5 border border-warning/20 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Rent Due in 7 Days</div>
              <p className="text-sm text-muted-foreground">Your December rent payment of $1,500 is due on December 15th. Set up autopay to never miss a payment.</p>
              <Button variant="outline" size="sm" className="mt-3">
                Set Up Autopay
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TenantDashboard;
