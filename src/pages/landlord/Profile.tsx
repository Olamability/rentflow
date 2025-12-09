import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  User, Mail, Phone, MapPin, Briefcase, DollarSign, FileCheck, Save, X as XIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Landlord, LandlordProfile } from "@/types";
import { ProfileCompletionBanner } from "@/components/profile/ProfileCompletionBanner";
import { landlordNavLinks } from "@/config/navigation";

const LandlordProfile = () => {
  const { user, updateUser, getProfileCompleteness } = useAuth();
  const navigate = useNavigate();
  const landlord = user as Landlord;

  const [formData, setFormData] = useState<LandlordProfile>({
    firstName: landlord?.profile?.firstName || "",
    lastName: landlord?.profile?.lastName || "",
    dateOfBirth: landlord?.profile?.dateOfBirth || "",
    nationalId: landlord?.profile?.nationalId || "",
    address: landlord?.profile?.address || {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    businessInfo: landlord?.profile?.businessInfo || {
      registeredBusiness: false,
      businessName: "",
      businessRegistrationNumber: "",
      taxId: "",
    },
    bankDetails: landlord?.profile?.bankDetails || {
      bankName: "",
      accountNumber: "",
      accountName: "",
      routingNumber: "",
    },
    verificationDocuments: landlord?.profile?.verificationDocuments || {
      idCardUrl: "",
      proofOfOwnershipUrl: "",
      businessRegistrationUrl: "",
    },
  });

  const [phone, setPhone] = useState(landlord?.phone || "");
  const [email] = useState(landlord?.email || "");

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof LandlordProfile] as any),
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    if (!user) return;

    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      toast.error("Please fill in your first and last name");
      return;
    }

    if (formData.bankDetails && formData.bankDetails.bankName && formData.bankDetails.accountNumber) {
      // If any bank field is filled, ensure the critical ones are complete
      if (!formData.bankDetails.bankName.trim() || !formData.bankDetails.accountNumber.trim() || !formData.bankDetails.accountName.trim()) {
        toast.error("Please complete all required bank details (bank name, account number, and account name)");
        return;
      }
    }

    // Update user with new profile data
    updateUser({
      phone,
      profile: formData,
    });

    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    navigate("/landlord/dashboard");
  };

  const completeness = getProfileCompleteness();

  return (
    <DashboardLayout
      navLinks={landlordNavLinks}
      userName={user?.name || "User"}
      pageTitle="Profile"
      pageDescription="Complete your profile to manage properties and collect rent"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Completion Banner */}
        <ProfileCompletionBanner
          completeness={completeness}
          profileUrl="/landlord/profile"
        />

        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>First Name *</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-2"
                placeholder="John"
              />
            </div>
            <div>
              <Label>Last Name *</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-2"
                placeholder="Doe"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  value={email}
                  className="pl-10"
                  type="email"
                  disabled
                />
              </div>
            </div>
            <div>
              <Label>Phone *</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  placeholder="+1 (555) 234-5678"
                />
              </div>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>National ID / SSN</Label>
              <Input
                value={formData.nationalId}
                onChange={(e) => handleInputChange("nationalId", e.target.value)}
                className="mt-2"
                placeholder="XXX-XX-XXXX"
              />
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Address</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Street Address</Label>
              <Input
                value={formData.address?.street || ""}
                onChange={(e) => handleNestedChange("address", "street", e.target.value)}
                className="mt-2"
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                value={formData.address?.city || ""}
                onChange={(e) => handleNestedChange("address", "city", e.target.value)}
                className="mt-2"
                placeholder="San Francisco"
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={formData.address?.state || ""}
                onChange={(e) => handleNestedChange("address", "state", e.target.value)}
                className="mt-2"
                placeholder="CA"
              />
            </div>
            <div>
              <Label>ZIP Code</Label>
              <Input
                value={formData.address?.zipCode || ""}
                onChange={(e) => handleNestedChange("address", "zipCode", e.target.value)}
                className="mt-2"
                placeholder="94102"
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                value={formData.address?.country || ""}
                onChange={(e) => handleNestedChange("address", "country", e.target.value)}
                className="mt-2"
                placeholder="United States"
              />
            </div>
          </div>
        </Card>

        {/* Business Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Registered Business</Label>
                <p className="text-sm text-muted-foreground">Do you operate as a registered business?</p>
              </div>
              <Switch
                checked={formData.businessInfo?.registeredBusiness || false}
                onCheckedChange={(checked) => handleNestedChange("businessInfo", "registeredBusiness", checked)}
              />
            </div>
            
            {formData.businessInfo?.registeredBusiness && (
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div>
                  <Label>Business Name</Label>
                  <Input
                    value={formData.businessInfo?.businessName || ""}
                    onChange={(e) => handleNestedChange("businessInfo", "businessName", e.target.value)}
                    className="mt-2"
                    placeholder="ABC Property Management LLC"
                  />
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <Input
                    value={formData.businessInfo?.businessRegistrationNumber || ""}
                    onChange={(e) => handleNestedChange("businessInfo", "businessRegistrationNumber", e.target.value)}
                    className="mt-2"
                    placeholder="123456789"
                  />
                </div>
                <div>
                  <Label>Tax ID / EIN</Label>
                  <Input
                    value={formData.businessInfo?.taxId || ""}
                    onChange={(e) => handleNestedChange("businessInfo", "taxId", e.target.value)}
                    className="mt-2"
                    placeholder="XX-XXXXXXX"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Bank Details */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Bank Details</h3>
              <p className="text-sm text-muted-foreground">Required to receive rent payments</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Bank Name *</Label>
              <Input
                value={formData.bankDetails?.bankName || ""}
                onChange={(e) => handleNestedChange("bankDetails", "bankName", e.target.value)}
                className="mt-2"
                placeholder="Chase Bank"
              />
            </div>
            <div>
              <Label>Account Name *</Label>
              <Input
                value={formData.bankDetails?.accountName || ""}
                onChange={(e) => handleNestedChange("bankDetails", "accountName", e.target.value)}
                className="mt-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Account Number *</Label>
              <Input
                value={formData.bankDetails?.accountNumber || ""}
                onChange={(e) => handleNestedChange("bankDetails", "accountNumber", e.target.value)}
                className="mt-2"
                placeholder="XXXXXXXXXX"
                type="password"
              />
            </div>
            <div>
              <Label>Routing Number</Label>
              <Input
                value={formData.bankDetails?.routingNumber || ""}
                onChange={(e) => handleNestedChange("bankDetails", "routingNumber", e.target.value)}
                className="mt-2"
                placeholder="XXXXXXXXX"
              />
            </div>
          </div>
        </Card>

        {/* Verification Documents */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Verification Documents</h3>
              <p className="text-sm text-muted-foreground">Upload documents to verify your identity and property ownership</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>ID Card / Passport</Label>
              <Input
                type="file"
                accept="image/*,.pdf"
                className="mt-2"
                disabled
              />
              <p className="text-xs text-muted-foreground mt-1">Upload functionality coming soon</p>
            </div>
            <div>
              <Label>Proof of Property Ownership</Label>
              <Input
                type="file"
                accept="image/*,.pdf"
                className="mt-2"
                disabled
              />
              <p className="text-xs text-muted-foreground mt-1">Upload functionality coming soon</p>
            </div>
            {formData.businessInfo?.registeredBusiness && (
              <div>
                <Label>Business Registration Certificate</Label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="mt-2"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Upload functionality coming soon</p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button onClick={handleCancel} variant="outline" className="flex-1">
            <XIcon className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LandlordProfile;
