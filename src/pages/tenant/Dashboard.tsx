import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Settings, 
  Search,
  User,
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

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/tenant/dashboard" },
  { icon: Search, label: "Search Properties", href: "/tenant/search" },
  { icon: CreditCard, label: "Rent Payment", href: "/tenant/rent" },
  { icon: Wrench, label: "Maintenance", href: "/tenant/maintenance" },
  { icon: FileText, label: "Agreements", href: "/tenant/agreements" },
  { icon: User, label: "Profile", href: "/tenant/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
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
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Tenant Portal"
      pageDescription="Welcome back, Sarah"
    >
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
                <Button variant="accent" className="mt-3" asChild>
                  <Link to="/tenant/rent">Pay Rent</Link>
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
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/tenant/maintenance">
                      <Plus className="w-4 h-4 mr-1" />
                      New Request
                    </Link>
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
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/tenant/rent">Set Up Autopay</Link>
              </Button>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default TenantDashboard;
