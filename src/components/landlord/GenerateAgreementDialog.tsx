import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

interface GenerateAgreementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgreementGenerated?: () => void;
}

export const GenerateAgreementDialog = ({ open, onOpenChange, onAgreementGenerated }: GenerateAgreementDialogProps) => {
  const [formData, setFormData] = useState({
    tenantId: "",
    unitId: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    deposit: "",
    additionalTerms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tenantId || !formData.unitId || !formData.startDate || !formData.rentAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log("Generating agreement:", formData);
    toast.success("Tenancy agreement generated successfully! Ready for digital signature.");
    
    // Reset form
    setFormData({
      tenantId: "",
      unitId: "",
      startDate: "",
      endDate: "",
      rentAmount: "",
      deposit: "",
      additionalTerms: "",
    });
    
    onAgreementGenerated?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Tenancy Agreement</DialogTitle>
          <DialogDescription>
            Create a new tenancy agreement for a tenant
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tenantId">Tenant *</Label>
              <Select value={formData.tenantId} onValueChange={(value) => setFormData({ ...formData, tenantId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant-1">Sarah Johnson</SelectItem>
                  <SelectItem value="tenant-2">John Smith</SelectItem>
                  <SelectItem value="tenant-3">Mike Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="unitId">Unit *</Label>
              <Select value={formData.unitId} onValueChange={(value) => setFormData({ ...formData, unitId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit-1">Unit 4A - Sunset Apartments</SelectItem>
                  <SelectItem value="unit-2">Unit 2B - Sunset Apartments</SelectItem>
                  <SelectItem value="unit-3">Unit 7C - Sunset Apartments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="rentAmount">Monthly Rent *</Label>
              <Input
                id="rentAmount"
                type="number"
                value={formData.rentAmount}
                onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                placeholder="1500"
                required
              />
            </div>

            <div>
              <Label htmlFor="deposit">Security Deposit</Label>
              <Input
                id="deposit"
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                placeholder="2000"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
              <Textarea
                id="additionalTerms"
                value={formData.additionalTerms}
                onChange={(e) => setFormData({ ...formData, additionalTerms: e.target.value })}
                placeholder="Add any additional terms or conditions..."
                rows={4}
              />
            </div>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Standard Terms Included:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Rent due on 1st of each month</li>
              <li>• Late fee of $50 after 5 days</li>
              <li>• No smoking inside the unit</li>
              <li>• 30 days notice required for move-out</li>
              <li>• Tenant responsible for utilities</li>
              <li>• Landlord responsible for major repairs</li>
            </ul>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Generate Agreement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
