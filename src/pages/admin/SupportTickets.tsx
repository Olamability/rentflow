import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Home, Users, BarChart3, Headphones, CreditCard, Settings, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TicketResponseDialog } from "@/components/admin/TicketResponseDialog";
import { TicketDetailDialog } from "@/components/admin/TicketDetailDialog";
import { SearchBar } from "@/components/admin/SearchBar";
import { TicketFiltersBar } from "@/components/admin/TicketFiltersBar";
import { TablePagination } from "@/components/admin/TablePagination";
import { SupportTicket, TicketFilters } from "@/types/admin";
import { toast } from "sonner";

const navLinks = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Headphones, label: "Support", href: "/admin/support" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const SupportTickets = () => {
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<TicketFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Mock data with expanded fields
  const allTickets: SupportTicket[] = [
    { 
      id: 'TKT-001', 
      userId: 'u1',
      user: 'James Wilson', 
      subject: 'Payment gateway issue', 
      description: 'I am unable to process payments through the platform. Getting error code 500.',
      priority: 'high', 
      status: 'open', 
      category: 'technical',
      date: '2024-12-08T10:30:00Z',
      assignedTo: 'Admin Team',
      messages: [
        {
          id: 'm1',
          ticketId: 'TKT-001',
          from: 'James Wilson',
          message: 'I am unable to process payments through the platform. Getting error code 500.',
          timestamp: '2024-12-08T10:30:00Z',
        }
      ]
    },
    { 
      id: 'TKT-002', 
      userId: 'u2',
      user: 'Sarah Johnson', 
      subject: 'Cannot upload documents', 
      description: 'The document upload feature is not working. Files over 5MB fail to upload.',
      priority: 'medium', 
      status: 'in_progress', 
      category: 'technical',
      date: '2024-12-07T14:20:00Z',
      assignedTo: 'Tech Support',
      messages: [
        {
          id: 'm2',
          ticketId: 'TKT-002',
          from: 'Sarah Johnson',
          message: 'The document upload feature is not working. Files over 5MB fail to upload.',
          timestamp: '2024-12-07T14:20:00Z',
        },
        {
          id: 'm3',
          ticketId: 'TKT-002',
          from: 'Tech Support',
          message: 'We are investigating this issue. Can you try with files under 5MB for now?',
          timestamp: '2024-12-07T15:00:00Z',
        }
      ]
    },
    { 
      id: 'TKT-003', 
      userId: 'u3',
      user: 'Mike Davis', 
      subject: 'Question about subscription', 
      description: 'What are the benefits of upgrading to Pro plan?',
      priority: 'low', 
      status: 'resolved', 
      category: 'billing',
      date: '2024-12-06T09:15:00Z',
      assignedTo: 'Support Team',
      messages: [
        {
          id: 'm4',
          ticketId: 'TKT-003',
          from: 'Mike Davis',
          message: 'What are the benefits of upgrading to Pro plan?',
          timestamp: '2024-12-06T09:15:00Z',
        },
        {
          id: 'm5',
          ticketId: 'TKT-003',
          from: 'Support Team',
          message: 'Pro plan includes unlimited properties, advanced analytics, priority support, and more. Check our pricing page for details.',
          timestamp: '2024-12-06T10:30:00Z',
        }
      ]
    },
    { 
      id: 'TKT-004', 
      userId: 'u4',
      user: 'Emma Brown', 
      subject: 'Account locked', 
      description: 'My account has been locked and I cannot log in.',
      priority: 'urgent', 
      status: 'open', 
      category: 'general',
      date: '2024-12-09T08:00:00Z',
    },
    { 
      id: 'TKT-005', 
      userId: 'u5',
      user: 'Alex Chen', 
      subject: 'Feature request: Bulk import', 
      description: 'It would be great to have a bulk import feature for properties.',
      priority: 'low', 
      status: 'open', 
      category: 'feature_request',
      date: '2024-12-05T16:45:00Z',
    },
  ];

  // Filter and search logic
  const filteredTickets = useMemo(() => {
    let result = allTickets;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ticket => 
        ticket.subject.toLowerCase().includes(query) ||
        ticket.user.toLowerCase().includes(query) ||
        ticket.id.toLowerCase().includes(query)
      );
    }

    // Priority filter
    if (filters.priority) {
      result = result.filter(ticket => ticket.priority === filters.priority);
    }

    // Status filter
    if (filters.status) {
      result = result.filter(ticket => ticket.status === filters.status);
    }

    // Category filter
    if (filters.category) {
      result = result.filter(ticket => ticket.category === filters.category);
    }

    return result;
  }, [allTickets, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / pageSize);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDetailDialogOpen(true);
  };

  const handleRespondTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsResponseDialogOpen(true);
  };

  const handleStatusChange = (ticketId: string, status: SupportTicket['status']) => {
    console.log(`Ticket ${ticketId} status changed to ${status}`);
  };

  const handleSendMessage = (ticketId: string, message: string) => {
    console.log(`Message sent to ticket ${ticketId}:`, message);
  };

  const handleExportTickets = () => {
    toast.success("Tickets exported successfully");
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      userName="Admin"
      pageTitle="Support Tickets"
      pageDescription="Manage user support requests"
    >
      {selectedTicket && (
        <>
          <TicketResponseDialog
            open={isResponseDialogOpen}
            onOpenChange={setIsResponseDialogOpen}
            ticket={selectedTicket}
            onResponseSent={() => console.log("Response sent")}
          />
          <TicketDetailDialog
            open={isDetailDialogOpen}
            onOpenChange={setIsDetailDialogOpen}
            ticket={selectedTicket}
            onStatusChange={handleStatusChange}
            onSendMessage={handleSendMessage}
          />
        </>
      )}

      {/* Header with Search and Actions */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by ticket ID, subject, or user..."
            className="flex-1 max-w-md"
          />
          <Button variant="outline" onClick={handleExportTickets}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <TicketFiltersBar
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Tickets List */}
      <Card>
        <div className="divide-y divide-border">
          {paginatedTickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-secondary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'urgent' ? 'bg-destructive text-white' :
                      ticket.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                      ticket.priority === 'medium' ? 'bg-warning/10 text-warning' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'resolved' ? 'bg-success/10 text-success' :
                      ticket.status === 'in_progress' ? 'bg-info/10 text-info' :
                      ticket.status === 'closed' ? 'bg-muted text-muted-foreground' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    {ticket.category && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {ticket.category.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{ticket.subject}</h3>
                  {ticket.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{ticket.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>From: <span className="text-foreground font-medium">{ticket.user}</span></span>
                    <span>•</span>
                    <span>{new Date(ticket.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    {ticket.assignedTo && (
                      <>
                        <span>•</span>
                        <span>Assigned to: <span className="text-foreground font-medium">{ticket.assignedTo}</span></span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewTicket(ticket)}
                  >
                    View Details
                  </Button>
                  {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                    <Button 
                      size="sm"
                      onClick={() => handleRespondTicket(ticket)}
                    >
                      Respond
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredTickets.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </Card>
    </DashboardLayout>
  );
};

export default SupportTickets;
