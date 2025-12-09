import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Save, Plus, Edit, Trash2, Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchBar } from "@/components/admin/SearchBar";
import { SystemConfig } from "@/types/admin";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const SystemConfiguration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<SystemConfig | null>(null);
  const [formData, setFormData] = useState({ key: "", value: "", description: "", category: "general" as SystemConfig['category'] });

  const allConfigs: SystemConfig[] = [
    {
      id: "c1",
      key: "PLATFORM_NAME",
      value: "RentFlow",
      description: "The name of the platform displayed across the application",
      category: "general",
      updatedAt: "2024-12-01T10:00:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c2",
      key: "PAYMENT_GATEWAY",
      value: "Paystack",
      description: "Primary payment gateway for processing transactions",
      category: "payment",
      updatedAt: "2024-12-05T14:30:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c3",
      key: "STRIPE_PUBLIC_KEY",
      value: "pk_test_xxxxxxxxxxxxx",
      description: "Stripe API public key for payment processing",
      category: "payment",
      updatedAt: "2024-11-20T09:15:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c4",
      key: "SMTP_HOST",
      value: "smtp.gmail.com",
      description: "SMTP server host for sending emails",
      category: "email",
      updatedAt: "2024-10-15T16:45:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c5",
      key: "SMTP_PORT",
      value: "587",
      description: "SMTP server port",
      category: "email",
      updatedAt: "2024-10-15T16:45:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c6",
      key: "FROM_EMAIL",
      value: "noreply@rentflow.com",
      description: "Default sender email address",
      category: "email",
      updatedAt: "2024-10-15T16:45:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c7",
      key: "MAX_LOGIN_ATTEMPTS",
      value: "5",
      description: "Maximum number of failed login attempts before account lockout",
      category: "security",
      updatedAt: "2024-09-10T11:20:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c8",
      key: "SESSION_TIMEOUT",
      value: "3600",
      description: "Session timeout in seconds (1 hour)",
      category: "security",
      updatedAt: "2024-09-10T11:20:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c9",
      key: "ENABLE_NOTIFICATIONS",
      value: "true",
      description: "Enable or disable platform-wide notifications",
      category: "features",
      updatedAt: "2024-12-08T08:00:00Z",
      updatedBy: "Admin"
    },
    {
      id: "c10",
      key: "MAINTENANCE_MODE",
      value: "false",
      description: "Enable maintenance mode to restrict access",
      category: "general",
      updatedAt: "2024-12-09T07:30:00Z",
      updatedBy: "Admin"
    },
  ];

  const filteredConfigs = useMemo(() => {
    let result = allConfigs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(config => 
        config.key.toLowerCase().includes(query) ||
        config.description.toLowerCase().includes(query) ||
        config.value.toLowerCase().includes(query)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(config => config.category === categoryFilter);
    }

    return result;
  }, [allConfigs, searchQuery, categoryFilter]);

  const handleEdit = (config: SystemConfig) => {
    setSelectedConfig(config);
    setFormData({
      key: config.key,
      value: config.value,
      description: config.description,
      category: config.category
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.key || !formData.value) {
      toast.error("Key and value are required");
      return;
    }
    
    toast.success(`Configuration ${selectedConfig ? 'updated' : 'created'} successfully`);
    setIsEditDialogOpen(false);
    setSelectedConfig(null);
    setFormData({ key: "", value: "", description: "", category: "general" });
  };

  const handleDelete = (config: SystemConfig) => {
    toast.success(`Configuration ${config.key} deleted successfully`);
  };

  const getCategoryColor = (category: SystemConfig['category']) => {
    const colors = {
      general: 'bg-secondary text-secondary-foreground',
      payment: 'bg-success/10 text-success',
      email: 'bg-info/10 text-info',
      security: 'bg-destructive/10 text-destructive',
      features: 'bg-accent/10 text-accent',
    };
    return colors[category];
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="System Configuration"
      pageDescription="Manage platform settings and configurations"
    >
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedConfig ? 'Edit Configuration' : 'New Configuration'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="key">Key *</Label>
              <Input
                id="key"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="CONFIG_KEY"
                disabled={!!selectedConfig}
              />
            </div>
            <div>
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="Configuration value"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this configuration does"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="features">Features</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search configurations..."
            className="flex-1 max-w-md"
          />
          <Button onClick={() => {
            setSelectedConfig(null);
            setFormData({ key: "", value: "", description: "", category: "general" });
            setIsEditDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Configuration
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="features">Features</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Configurations List */}
      <div className="space-y-4">
        {Object.entries(
          filteredConfigs.reduce((acc, config) => {
            if (!acc[config.category]) acc[config.category] = [];
            acc[config.category].push(config);
            return acc;
          }, {} as Record<string, SystemConfig[]>)
        ).map(([category, configs]) => (
          <Card key={category} className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 capitalize flex items-center gap-2">
              {category}
              <Badge className={getCategoryColor(category as SystemConfig['category'])}>
                {configs.length}
              </Badge>
            </h3>
            <div className="space-y-3">
              {configs.map((config) => (
                <div key={config.id} className="p-4 border border-border rounded-md hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <code className="text-sm font-mono font-semibold text-foreground">{config.key}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{config.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Value: <code className="text-foreground font-mono bg-secondary px-2 py-1 rounded">{config.value}</code></span>
                        <span>•</span>
                        <span>Updated by {config.updatedBy} on {new Date(config.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(config)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(config)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SystemConfiguration;
