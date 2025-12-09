import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  property: string;
  onPaymentSuccess?: () => void;
}

export const PaymentDialog = ({ open, onOpenChange, amount, property, onPaymentSuccess }: PaymentDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    toast.loading("Processing payment...");
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("Payment successful! Receipt has been sent to your email.");
      
      // Reset form
      setCardDetails({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
      });
      
      onPaymentSuccess?.();
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pay Rent</DialogTitle>
          <DialogDescription>
            Complete your rent payment of ${amount} for {property}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
              <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Card Payment</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building2 className="w-4 h-4" />
                  <span>Bank Transfer</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                <RadioGroupItem value="ussd" id="ussd" />
                <Label htmlFor="ussd" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Smartphone className="w-4 h-4" />
                  <span>USSD</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    pattern="[0-9]{3,4}"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "transfer" && (
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-foreground mb-2 font-medium">Bank Details:</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Bank:</span> <span className="font-medium">RentFlow Bank</span></p>
                <p><span className="text-muted-foreground">Account Name:</span> <span className="font-medium">RentFlow Collections</span></p>
                <p><span className="text-muted-foreground">Account Number:</span> <span className="font-medium">1234567890</span></p>
                <p className="text-xs text-muted-foreground mt-2">Use your email as reference</p>
              </div>
            </div>
          )}

          {paymentMethod === "ussd" && (
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-foreground mb-2 font-medium">Dial on your phone:</p>
              <p className="text-2xl font-bold text-center my-4">*737*50*{amount}#</p>
              <p className="text-xs text-muted-foreground text-center">Follow the prompts to complete payment</p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {paymentMethod === "card" && (
              <Button type="submit">Pay ${amount}</Button>
            )}
            {paymentMethod === "transfer" && (
              <Button type="button" onClick={() => {
                toast.success("Transfer details copied to clipboard");
                onOpenChange(false);
              }}>
                Copy Details
              </Button>
            )}
            {paymentMethod === "ussd" && (
              <Button type="button" onClick={() => {
                toast.success("USSD code copied to clipboard");
                onOpenChange(false);
              }}>
                Copy Code
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
