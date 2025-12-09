import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User, MapPin, Navigation, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApplicationDialog } from "@/components/tenant/ApplicationDialog";
import { useLocationSort } from "@/hooks/useLocationSort";
import { formatDistance } from "@/lib/geolocation";

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
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{ id: string; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock properties with coordinates (San Francisco area)
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
      latitude: 37.7749,
      longitude: -122.4194,
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
      latitude: 37.7699,
      longitude: -122.4494,
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
      latitude: 37.7849,
      longitude: -122.4094,
    },
  ];

  const {
    sortedProperties,
    userLocation,
    isLoadingLocation,
    locationError,
    hasLocationEnabled,
    requestUserLocation,
    clearLocation,
  } = useLocationSort(properties);

  // Filter properties based on search query
  const displayedProperties = sortedProperties.filter((property) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      property.name.toLowerCase().includes(query) ||
      property.address.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Property Search"
      pageDescription="Find your perfect rental home"
    >
      {selectedProperty && (
        <ApplicationDialog
          open={isApplicationDialogOpen}
          onOpenChange={setIsApplicationDialogOpen}
          propertyName={selectedProperty.name}
          propertyId={selectedProperty.id}
        />
      )}
      
      {/* Location-based sorting controls */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3 items-start">
          <Input 
            placeholder="Search by location, property type, or price..." 
            className="max-w-2xl" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {!hasLocationEnabled ? (
            <Button 
              variant="outline" 
              onClick={requestUserLocation}
              disabled={isLoadingLocation}
              className="whitespace-nowrap"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {isLoadingLocation ? 'Getting Location...' : 'Sort by Distance'}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={clearLocation}
              className="whitespace-nowrap"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Location
            </Button>
          )}
        </div>

        {locationError && (
          <Alert variant="destructive">
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        {hasLocationEnabled && (
          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              Properties are sorted by distance from your current location. You can still search for properties anywhere.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={property.image} 
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              {property.distance !== undefined && (
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {formatDistance(property.distance)} away
                </Badge>
              )}
            </div>
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
                <Button onClick={() => {
                  setSelectedProperty({ id: property.id, name: property.name });
                  setIsApplicationDialogOpen(true);
                }}>
                  Apply Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {displayedProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties found matching your search.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PropertySearch;
