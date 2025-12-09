import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, CreditCard, Wrench, FileText, Settings, Search, User, Calendar, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PaymentDialog } from "@/components/tenant/PaymentDialog";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/tenant/dashboard" },
  { icon: Search, label: "Search Properties", href: "/tenant/search" },
  { icon: CreditCard, label: "Rent Payment", href: "/tenant/rent" },
  { icon: Wrench, label: "Maintenance", href: "/tenant/maintenance" },
  { icon: FileText, label: "Agreements", href: "/tenant/agreements" },
  { icon: User, label: "Profile", href: "/tenant/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const RentPayment = () => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  
  const currentRent = {
    amount: 1500,
    dueDate: '2024-12-15',
    status: 'upcoming',
    property: 'Sunset Apartments - Unit 4A',
  };

  const paymentHistory = [
    { month: 'November 2024', amount: 1500, date: '2024-11-01', status: 'Paid', method: 'Card' },
    { month: 'October 2024', amount: 1500, date: '2024-10-01', status: 'Paid', method: 'Transfer' },
    { month: 'September 2024', amount: 1500, date: '2024-09-01', status: 'Paid', method: 'Card' },
  ];

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Sarah Johnson"
      pageTitle="Rent Payment"
      pageDescription="Manage your rent payments"
    >
      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        amount={currentRent.amount}
        property={currentRent.property}
        onPaymentSuccess={() => console.log("Payment successful")}
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Current Rent Due */}
        <Card className="p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Current Rent Due</h2>
              <p className="text-muted-foreground">{currentRent.property}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-foreground">${currentRent.amount}</div>
              <div className="text-sm text-muted-foreground mt-1">Due: {currentRent.dueDate}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => setIsPaymentDialogOpen(true)}>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay with Card
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsPaymentDialogOpen(true)}>
              Pay with Transfer
            </Button>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(true)}>Setup Autopay</Button>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">Visa ending in 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 12/25</div>
                </div>
              </div>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Default</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">Add Payment Method</Button>
        </Card>

        {/* Payment History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment History</h3>
          <div className="space-y-4">
            {paymentHistory.map((payment, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{payment.month}</div>
                    <div className="text-sm text-muted-foreground">Paid on {payment.date} via {payment.method}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">${payment.amount}</div>
                  <Button variant="ghost" size="sm" className="mt-1">Download Receipt</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RentPayment;
