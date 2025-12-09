// Admin-related TypeScript interfaces and types

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'landlord' | 'tenant' | 'admin';
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  verified: boolean;
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  fraudFlags?: FraudFlag[];
}

export interface FraudFlag {
  id: string;
  reason: string;
  flaggedBy: string;
  flaggedAt: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
}

export interface SupportTicket {
  id: string;
  userId: string;
  user: string;
  subject: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category?: 'technical' | 'billing' | 'general' | 'feature_request';
  date: string;
  assignedTo?: string;
  messages?: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  from: string;
  message: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface Subscription {
  id: string;
  landlordId: string;
  landlord: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  revenue: number;
  nextBilling: string;
  startDate: string;
  autoRenew: boolean;
}

export interface PlatformStats {
  totalUsers: number;
  activeLandlords: number;
  activeTenants: number;
  monthlyRevenue: number;
  totalProperties: number;
  activeProperties: number;
  totalTransactions: number;
  platformUptime: number;
  activeSessions: number;
}

export interface ActivityLog {
  id: string;
  type: 'user_registration' | 'subscription' | 'support_ticket' | 'payment' | 'system';
  description: string;
  timestamp: string;
  userId?: string;
  metadata?: {
    [key: string]: string | number | boolean;
  };
}

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  category: 'general' | 'payment' | 'email' | 'security' | 'features';
  updatedAt: string;
  updatedBy: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: {
    [key: string]: {
      from?: string | number | boolean;
      to?: string | number | boolean;
    } | string | number | boolean;
  };
  timestamp: string;
  ipAddress?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'welcome' | 'notification' | 'billing' | 'support' | 'marketing';
  variables: string[];
  active: boolean;
  lastModified: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed?: string;
  expiresAt?: string;
  createdAt: string;
  active: boolean;
}

export interface PlatformAnnouncement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: 'all' | 'landlords' | 'tenants';
  startDate: string;
  endDate?: string;
  active: boolean;
  createdBy: string;
}

// Filter and Pagination Types
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

export interface UserFilters {
  search?: string;
  role?: User['role'];
  status?: User['status'];
  verified?: boolean;
  kycStatus?: User['kycStatus'];
  dateFrom?: string;
  dateTo?: string;
}

export interface TicketFilters {
  search?: string;
  priority?: SupportTicket['priority'];
  status?: SupportTicket['status'];
  category?: SupportTicket['category'];
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SubscriptionFilters {
  search?: string;
  plan?: Subscription['plan'];
  status?: Subscription['status'];
  dateFrom?: string;
  dateTo?: string;
}

// Analytics Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export interface AnalyticsTimeRange {
  start: string;
  end: string;
  granularity: 'day' | 'week' | 'month' | 'year';
}
