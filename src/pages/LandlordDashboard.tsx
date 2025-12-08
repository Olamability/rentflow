import { useState } from "react";
import { 
  Building2, 
  Home, 
  Users, 
  CreditCard, 
  Wrench, 
  FileText, 
  Settings, 
  Bell,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sidebarLinks = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Building2, label: "Properties", href: "/properties" },
  { icon: Users, label: "Tenants", href: "/tenants" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: Wrench, label: "Maintenance", href: "/maintenance" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const stats = [
  { label: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Occupancy Rate", value: "94%", change: "+3.2%", trend: "up", icon: Home },
  { label: "Active Leases", value: "28", change: "+2", trend: "up", icon: FileText },
  { label: "Open Requests", value: "5", change: "-3", trend: "down", icon: Wrench },
];

const recentPayments = [
  { tenant: "John Smith", unit: "Unit 4A", amount: "$1,500", date: "Dec 5", status: "Paid" },
  { tenant: "Sarah Johnson", unit: "Unit 2B", amount: "$1,200", date: "Dec 5", status: "Paid" },
  { tenant: "Mike Davis", unit: "Unit 7C", amount: "$1,800", date: "Dec 4", status: "Pending" },
  { tenant: "Emily Brown", unit: "Unit 1A", amount: "$1,350", date: "Dec 3", status: "Paid" },
];

const properties = [
  { name: "Sunset Apartments", units: 12, occupied: 11, revenue: "$15,400", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop" },
  { name: "Oak Street Condos", units: 8, occupied: 8, revenue: "$12,800", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop" },
  { name: "Riverside Homes", units: 6, occupied: 5, revenue: "$9,500", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=150&fit=crop" },
];

const LandlordDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sidebar text-sidebar-foreground flex-shrink-0 transition-all duration-300`}>
        <div className="p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && <span className="text-xl font-semibold">RentFlow</span>}
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
                {sidebarOpen && <span>{link.label}</span>}
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
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, James</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <Button variant="accent" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl border border-border p-6 hover:shadow-soft transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Payments */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Recent Payments</h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentPayments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-sm font-medium text-secondary-foreground">
                            {payment.tenant.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{payment.tenant}</div>
                          <div className="text-sm text-muted-foreground">{payment.unit}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{payment.amount}</div>
                        <div className="text-sm text-muted-foreground">{payment.date}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Paid' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Properties Overview */}
            <div className="bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Properties</h2>
                <button className="p-1 text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {properties.map((property, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                      <img 
                        src={property.image} 
                        alt={property.name}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">{property.name}</div>
                        <div className="text-sm text-muted-foreground">{property.occupied}/{property.units} units</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{property.revenue}</div>
                        <div className="text-xs text-muted-foreground">/month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="mt-6 bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Upcoming</h2>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-center gap-2 text-warning mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-medium">Rent Due</span>
                </div>
                <div className="text-foreground font-semibold">3 payments due</div>
                <div className="text-sm text-muted-foreground">Dec 15, 2024</div>
              </div>
              <div className="p-4 rounded-lg bg-info/5 border border-info/20">
                <div className="flex items-center gap-2 text-info mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Lease Renewal</span>
                </div>
                <div className="text-foreground font-semibold">Unit 2B - Sarah J.</div>
                <div className="text-sm text-muted-foreground">Dec 20, 2024</div>
              </div>
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <Wrench className="w-4 h-4" />
                  <span className="text-sm font-medium">Maintenance</span>
                </div>
                <div className="text-foreground font-semibold">Plumber scheduled</div>
                <div className="text-sm text-muted-foreground">Dec 8, 2024</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandlordDashboard;
