import { Link } from "react-router-dom";
import { Building2, Bell as BellIcon, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      type: 'warning',
      title: 'Rent Due in 7 Days',
      message: 'Your December rent payment of $1,500 is due on December 15th.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Maintenance Update',
      message: 'Your maintenance request #MR-001 has been assigned to a technician.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Payment Confirmed',
      message: 'Your November rent payment of $1,500 has been successfully processed.',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Lease Renewal Reminder',
      message: 'Your lease expires in 45 days. Contact your landlord to discuss renewal.',
      time: '2 days ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-6 h-6 text-success" />;
      case 'warning': return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'error': return <AlertCircle className="w-6 h-6 text-destructive" />;
      default: return <Info className="w-6 h-6 text-info" />;
    }
  };

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
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" size="sm">Mark All as Read</Button>
          <Link to="/tenant/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
        <p className="text-muted-foreground mb-8">Stay updated with your latest activities</p>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-6 ${notification.read ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  {!notification.read && (
                    <Button variant="ghost" size="sm" className="mt-2 px-0">
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="p-12 text-center">
            <BellIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
