import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, 
  Building2, 
  Users, 
  CreditCard, 
  Wrench, 
  FileText, 
  Settings,
  BarChart3,
  Crown,
  Bell as BellIcon,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddPropertyDialog } from "@/components/landlord/AddPropertyDialog";

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

const PropertyManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const properties = [
    {
      id: '1',
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, San Francisco, CA',
      units: 12,
      occupied: 11,
      revenue: 15400,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Oak Street Condos',
      address: '456 Oak Street, San Francisco, CA',
      units: 8,
      occupied: 8,
      revenue: 12800,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      name: 'Riverside Homes',
      address: '789 River Road, San Francisco, CA',
      units: 6,
      occupied: 5,
      revenue: 9500,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="James Wilson"
      pageTitle="Property Management"
      pageDescription="Manage your properties and units"
      headerActions={
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      }
    >
      <AddPropertyDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onPropertyAdded={() => {
          // Handle refresh or update of property list
          console.log("Property added");
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={property.image} 
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">{property.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{property.address}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-foreground">{property.occupied}/{property.units}</div>
                  <div className="text-xs text-muted-foreground">Units Occupied</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">${property.revenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Property Card */}
        <button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-card rounded-xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center p-12 min-h-[400px]"
        >
          <Plus className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Add New Property</h3>
          <p className="text-sm text-muted-foreground">Click to create a new property</p>
        </button>
      </div>
    </DashboardLayout>
  );
};

export default PropertyManagement;
