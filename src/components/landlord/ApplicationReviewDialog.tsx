import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

interface ApplicationReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: {
    id: string;
    tenantName: string;
    unitNumber: string;
    moveInDate: string;
    employer: string;
    position: string;
    income: number;
    referenceName?: string;
    referencePhone?: string;
    status: string;
  };
  onApprove?: () => void;
  onReject?: () => void;
}

export const ApplicationReviewDialog = ({ 
  open, 
  onOpenChange, 
  application,
  onApprove,
  onReject 
}: ApplicationReviewDialogProps) => {
  const handleApprove = () => {
    toast.success(`Application approved for ${application.tenantName}`);
    onApprove?.();
    onOpenChange(false);
  };

  const handleReject = () => {
    toast.error(`Application rejected for ${application.tenantName}`);
    onReject?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Application - {application.tenantName}</DialogTitle>
          <DialogDescription>
            Review the application details and approve or reject the tenant application.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Application Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Applicant</div>
                <div className="font-medium text-foreground">{application.tenantName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Unit</div>
                <div className="font-medium text-foreground">{application.unitNumber}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Move-in Date</div>
                <div className="font-medium text-foreground">{application.moveInDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    application.status === 'pending' ? 'bg-warning/10 text-warning' :
                    application.status === 'approved' ? 'bg-success/10 text-success' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {application.status}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Employment Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Employer</div>
                <div className="font-medium text-foreground">{application.employer}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Position</div>
                <div className="font-medium text-foreground">{application.position}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-muted-foreground">Annual Income</div>
                <div className="font-medium text-foreground">${application.income.toLocaleString()}</div>
              </div>
            </div>
          </Card>

          {application.referenceName && (
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Reference</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium text-foreground">{application.referenceName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium text-foreground">{application.referencePhone}</div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {application.status === 'pending' && (
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleReject}
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button 
              onClick={handleApprove}
              className="flex-1"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
