import { Link } from "react-router-dom";
import { Building2, Mail, Phone, User, Bell as BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="text-xl font-semibold">RentFlow</span>
        </Link>
        <div className="ml-auto">
          <Link to="/landlord/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your account settings and preferences</p>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input defaultValue="James Wilson" className="pl-10" />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input defaultValue="james@rentflow.com" className="pl-10" />
                </div>
              </div>
              <div>
                <Label>Phone</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input defaultValue="+1 (555) 123-4567" className="pl-10" />
                </div>
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via SMS</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive push notifications</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Rent Reminders</div>
                  <div className="text-sm text-muted-foreground">Get reminded about upcoming rent</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Security</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Enable Two-Factor Authentication
              </Button>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1">Save Changes</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
