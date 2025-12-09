import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, FileText, Bell, Shield, TrendingUp, AlertCircle, Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', color: 'text-info', icon: Users, trend: 'up', href: '/admin/users' },
    { label: 'Active Landlords', value: '456', change: '+8%', color: 'text-success', icon: Home, trend: 'up', href: '/admin/users' },
    { label: 'Active Tenants', value: '778', change: '+15%', color: 'text-success', icon: Users, trend: 'up', href: '/admin/users' },
    { label: 'Monthly Revenue', value: '₦45,231', change: '+23%', color: 'text-success', icon: CreditCard, trend: 'up', href: '/admin/subscriptions' },
  ];

  const quickActions = [
    { label: 'User Management', icon: Users, href: '/admin/users', color: 'bg-info/10 text-info' },
    { label: 'Support Tickets', icon: Headphones, href: '/admin/support', color: 'bg-warning/10 text-warning' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'bg-accent/10 text-accent' },
    { label: 'Subscriptions', icon: CreditCard, href: '/admin/subscriptions', color: 'bg-success/10 text-success' },
    { label: 'Configuration', icon: Settings, href: '/admin/configuration', color: 'bg-secondary text-secondary-foreground' },
    { label: 'Audit Log', icon: FileText, href: '/admin/audit-log', color: 'bg-info/10 text-info' },
    { label: 'Announcements', icon: Bell, href: '/admin/announcements', color: 'bg-accent/10 text-accent' },
  ];

  const recentActivities = [
    { type: 'user', message: 'New landlord registration: James Wilson', time: '2 mins ago', icon: Users, color: 'text-info' },
    { type: 'ticket', message: 'Support ticket #TKT-001 created', time: '15 mins ago', icon: Headphones, color: 'text-warning' },
    { type: 'subscription', message: 'Pro subscription activated: Alex Chen', time: '1 hour ago', icon: CreditCard, color: 'text-success' },
    { type: 'security', message: 'User flagged for fraud review', time: '2 hours ago', icon: Shield, color: 'text-destructive' },
    { type: 'config', message: 'System configuration updated', time: '3 hours ago', icon: Settings, color: 'text-muted-foreground' },
  ];

  const systemHealth = [
    { name: 'System Uptime', value: 99.9, color: 'bg-success', target: 99 },
    { name: 'Active Sessions', value: 68, color: 'bg-info', target: 80 },
    { name: 'API Response Time', value: 85, color: 'bg-warning', target: 90 },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Admin Dashboard"
      pageDescription="Platform overview and metrics"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <Card 
            key={idx} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(stat.href)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg ${stat.color.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <TrendingUp className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            <div className={`text-xs mt-2 ${stat.color} flex items-center gap-1`}>
              <span>{stat.change}</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate(action.href)}
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/audit-log')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Platform Health */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Platform Health
            </h3>
          </div>
          <div className="space-y-4">
            {systemHealth.map((metric, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{metric.name}</span>
                  <span className="text-foreground font-medium">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
                {metric.value < metric.target && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-warning" />
                    <span className="text-xs text-warning">Below target ({metric.target}%)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          System Alerts
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground mb-1">3 Support Tickets Pending</h4>
                <p className="text-sm text-muted-foreground">There are 3 high-priority support tickets awaiting response.</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-2" onClick={() => navigate('/admin/support')}>
                  View Tickets
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-info/10 border border-info/20 rounded-md">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground mb-1">5 New User Registrations</h4>
                <p className="text-sm text-muted-foreground">Review and approve pending user accounts.</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-2" onClick={() => navigate('/admin/users')}>
                  Review Users
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
