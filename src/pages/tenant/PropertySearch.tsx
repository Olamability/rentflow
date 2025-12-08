import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/tenant/dashboard" },
  { icon: Search, label: "Search Properties", href: "/tenant/search" },
  { icon: CreditCard, label: "Rent Payment", href: "/tenant/rent" },
  { icon: Wrench, label: "Maintenance", href: "/tenant/maintenance" },
  { icon: FileText, label: "Agreements", href: "/tenant/agreements" },
  { icon: User, label: "Profile", href: "/tenant/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const PropertySearch = () => {
  const properties = [
    {
      id: '1',
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, San Francisco, CA',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      rent: 1500,
      available: true,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Oak Street Condos',
      address: '456 Oak Street, San Francisco, CA',
      type: 'Condo',
      bedrooms: 1,
      bathrooms: 1,
      rent: 1200,
      available: true,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      name: 'Riverside Homes',
      address: '789 River Road, San Francisco, CA',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2.5,
      rent: 2000,
      available: true,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Property Search"
      pageDescription="Find your perfect rental home"
    >
      <div className="mb-6">
        <Input placeholder="Search by location, property type, or price..." className="max-w-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={property.image} 
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">{property.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{property.address}</p>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span>{property.bedrooms} bed</span>
                <span>{property.bathrooms} bath</span>
                <span>{property.type}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">${property.rent}</div>
                  <div className="text-xs text-muted-foreground">/month</div>
                </div>
                <Button>Apply Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default PropertySearch;
