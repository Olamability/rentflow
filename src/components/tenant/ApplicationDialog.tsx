import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyName: string;
  propertyId: string;
}

export const ApplicationDialog = ({ open, onOpenChange, propertyName }: ApplicationDialogProps) => {
  const [formData, setFormData] = useState({
    moveInDate: "",
    employer: "",
    position: "",
    income: "",
    referenceName: "",
    referencePhone: "",
    referenceRelationship: "",
  });
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    idCard: null,
    proofOfIncome: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.moveInDate || !formData.employer || !formData.income) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate API call
    console.log("Submitting application:", formData, documents);
    toast.success("Application submitted successfully!");
    
    // Reset form
    setFormData({
      moveInDate: "",
      employer: "",
      position: "",
      income: "",
      referenceName: "",
      referencePhone: "",
      referenceRelationship: "",
    });
    setDocuments({
      idCard: null,
      proofOfIncome: null,
    });
    
    onOpenChange(false);
  };

  const handleFileChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments({ ...documents, [type]: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {propertyName}</DialogTitle>
          <DialogDescription>
            Fill out this application to apply for this property. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="moveInDate">Desired Move-in Date *</Label>
            <Input
              id="moveInDate"
              type="date"
              value={formData.moveInDate}
              onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Employment Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employer">Employer *</Label>
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="income">Annual Income *</Label>
                <Input
                  id="income"
                  type="number"
                  min="0"
                  max="10000000"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  placeholder="50000"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Reference</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="referenceName">Name</Label>
                <Input
                  id="referenceName"
                  value={formData.referenceName}
                  onChange={(e) => setFormData({ ...formData, referenceName: e.target.value })}
                  placeholder="Reference name"
                />
              </div>
              <div>
                <Label htmlFor="referencePhone">Phone</Label>
                <Input
                  id="referencePhone"
                  type="tel"
                  value={formData.referencePhone}
                  onChange={(e) => setFormData({ ...formData, referencePhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="referenceRelationship">Relationship</Label>
                <Input
                  id="referenceRelationship"
                  value={formData.referenceRelationship}
                  onChange={(e) => setFormData({ ...formData, referenceRelationship: e.target.value })}
                  placeholder="e.g., Previous landlord"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Documents</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="idCard">ID Card</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <Input
                    id="idCard"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("idCard", e)}
                    className="hidden"
                  />
                  <label htmlFor="idCard" className="cursor-pointer text-center block">
                    <span className="text-sm text-muted-foreground">
                      {documents.idCard ? documents.idCard.name : "Click to upload ID"}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="proofOfIncome">Proof of Income</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <Input
                    id="proofOfIncome"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("proofOfIncome", e)}
                    className="hidden"
                  />
                  <label htmlFor="proofOfIncome" className="cursor-pointer text-center block">
                    <span className="text-sm text-muted-foreground">
                      {documents.proofOfIncome ? documents.proofOfIncome.name : "Click to upload proof of income"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
