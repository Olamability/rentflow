import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Download, Calendar, TrendingUp, TrendingDown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const PlatformAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // User growth data
  const userGrowthData = [
    { month: 'Jan', users: 320, landlords: 120, tenants: 200 },
    { month: 'Feb', users: 450, landlords: 170, tenants: 280 },
    { month: 'Mar', users: 580, landlords: 220, tenants: 360 },
    { month: 'Apr', users: 720, landlords: 280, tenants: 440 },
    { month: 'May', users: 890, landlords: 340, tenants: 550 },
    { month: 'Jun', users: 1020, landlords: 390, tenants: 630 },
    { month: 'Jul', users: 1150, landlords: 440, tenants: 710 },
    { month: 'Aug', users: 1234, landlords: 456, tenants: 778 },
  ];

  // Revenue data
  const revenueData = [
    { month: 'Jan', revenue: 12500, subscriptions: 85 },
    { month: 'Feb', revenue: 18200, subscriptions: 102 },
    { month: 'Mar', revenue: 24600, subscriptions: 125 },
    { month: 'Apr', revenue: 32100, subscriptions: 148 },
    { month: 'May', revenue: 38400, subscriptions: 162 },
    { month: 'Jun', revenue: 42300, subscriptions: 171 },
    { month: 'Jul', revenue: 48900, subscriptions: 189 },
    { month: 'Aug', revenue: 52400, subscriptions: 198 },
  ];

  // User distribution by role
  const roleDistribution = [
    { name: 'Landlords', value: 456, color: '#10b981' },
    { name: 'Tenants', value: 778, color: '#3b82f6' },
  ];

  // Subscription distribution
  const subscriptionDistribution = [
    { name: 'Free', value: 300, color: '#6b7280' },
    { name: 'Pro', value: 156, color: '#8b5cf6' },
  ];

  // Activity metrics
  const activityData = [
    { day: 'Mon', logins: 342, tickets: 15, transactions: 128 },
    { day: 'Tue', logins: 389, tickets: 12, transactions: 145 },
    { day: 'Wed', logins: 421, tickets: 18, transactions: 167 },
    { day: 'Thu', logins: 398, tickets: 14, transactions: 152 },
    { day: 'Fri', logins: 456, tickets: 20, transactions: 189 },
    { day: 'Sat', logins: 298, tickets: 8, transactions: 98 },
    { day: 'Sun', logins: 267, tickets: 6, transactions: 76 },
  ];

  const handleExportAnalytics = () => {
    toast.success("Analytics data exported successfully");
  };
  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Platform Analytics"
      pageDescription="Detailed platform metrics and insights"
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={handleExportAnalytics}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Users</div>
            <Users className="w-5 h-5 text-info" />
          </div>
          <div className="text-3xl font-bold text-foreground">1,234</div>
          <div className="flex items-center gap-1 text-xs mt-2 text-success">
            <TrendingUp className="w-3 h-3" />
            +15% this month
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Active Properties</div>
            <Home className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl font-bold text-foreground">345</div>
          <div className="flex items-center gap-1 text-xs mt-2 text-success">
            <TrendingUp className="w-3 h-3" />
            +8% this month
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <CreditCard className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-foreground">₦52.4K</div>
          <div className="flex items-center gap-1 text-xs mt-2 text-success">
            <TrendingUp className="w-3 h-3" />
            +23% this month
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Pro Subscribers</div>
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl font-bold text-foreground">156</div>
          <div className="flex items-center gap-1 text-xs mt-2 text-success">
            <TrendingUp className="w-3 h-3" />
            +12 this month
          </div>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} name="Total Users" />
            <Line type="monotone" dataKey="landlords" stroke="#10b981" strokeWidth={2} name="Landlords" />
            <Line type="monotone" dataKey="tenants" stroke="#3b82f6" strokeWidth={2} name="Tenants" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue & Subscriptions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Revenue (₦)" />
              <Bar yAxisId="right" dataKey="subscriptions" fill="#8b5cf6" name="Subscriptions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">By Role</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">By Plan</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Activity Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="logins" fill="#3b82f6" name="User Logins" />
            <Bar dataKey="tickets" fill="#f59e0b" name="Support Tickets" />
            <Bar dataKey="transactions" fill="#10b981" name="Transactions" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </DashboardLayout>
  );
};

export default PlatformAnalytics;
