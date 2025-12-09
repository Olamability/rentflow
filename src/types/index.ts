// User roles and authentication types
export type UserRole = 'landlord' | 'tenant' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  isVerified: boolean;
  profileComplete?: boolean;
  profileCompleteness?: number; // 0-100 percentage
}

export interface TenantProfile {
  // Personal Information
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationalId?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Employment Information
  employment?: {
    status: 'employed' | 'self-employed' | 'unemployed' | 'student' | 'retired';
    employer?: string;
    position?: string;
    monthlyIncome?: number;
    yearsEmployed?: number;
  };
  
  // Emergency Contact
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  
  // References
  references?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }[];
  
  // Previous Address
  previousAddress?: {
    street: string;
    city: string;
    state: string;
    duration: string;
    landlordName?: string;
    landlordPhone?: string;
  };
}

export interface LandlordProfile {
  // Personal Information
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationalId?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Business Information
  businessInfo?: {
    registeredBusiness: boolean;
    businessName?: string;
    businessRegistrationNumber?: string;
    taxId?: string;
  };
  
  // Bank Details
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber?: string;
  };
  
  // Verification Documents
  verificationDocuments?: {
    idCardUrl?: string;
    proofOfOwnershipUrl?: string;
    businessRegistrationUrl?: string;
  };
}

export interface Landlord extends User {
  role: 'landlord';
  isPro: boolean;
  subscriptionStatus: 'free' | 'pro';
  subscriptionExpiry?: Date;
  properties: string[]; // Property IDs
  profile?: LandlordProfile;
}

export interface Tenant extends User {
  role: 'tenant';
  currentLeaseId?: string;
  applicationStatus?: 'pending' | 'approved' | 'rejected';
  profile?: TenantProfile;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Property and Unit types
export interface Property {
  id: string;
  landlordId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'apartment' | 'house' | 'condo' | 'townhouse';
  description: string;
  images: string[];
  amenities: string[];
  totalUnits: number;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rentAmount: number;
  deposit: number;
  isOccupied: boolean;
  currentTenantId?: string;
  features: string[];
  availableDate?: Date;
}

// Tenancy and Lease types
export interface TenancyAgreement {
  id: string;
  landlordId: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  deposit: number;
  status: 'draft' | 'sent' | 'signed' | 'active' | 'expired' | 'terminated';
  documentUrl?: string;
  signedDate?: Date;
  terms: string[];
}

// Payment types
export interface Payment {
  id: string;
  tenantId: string;
  landlordId: string;
  unitId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paymentMethod?: 'card' | 'transfer' | 'ussd' | 'cash';
  transactionId?: string;
  receiptUrl?: string;
  notes?: string;
}

// Maintenance Request types
export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  landlordId: string;
  unitId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  images: string[];
  videos?: string[];
  assignedTo?: string; // Worker ID or name
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  estimatedCost?: number;
  actualCost?: number;
}

export interface MaintenanceUpdate {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  images?: string[];
}

// Application types
export interface PropertyApplication {
  id: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  moveInDate: Date;
  employmentInfo: {
    employer: string;
    position: string;
    income: number;
  };
  references: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  documents: {
    idCard?: string;
    proofOfIncome?: string;
    references?: string;
  };
}

// Reminder and Notification types
export interface Reminder {
  id: string;
  type: 'rent_due' | 'rent_overdue' | 'lease_renewal' | 'maintenance';
  recipientId: string;
  recipientType: 'tenant' | 'landlord';
  message: string;
  scheduledFor: Date;
  sentAt?: Date;
  status: 'scheduled' | 'sent' | 'failed';
  channels: ('email' | 'sms' | 'push')[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Document types
export interface Document {
  id: string;
  ownerId: string;
  type: 'lease' | 'receipt' | 'id' | 'photo' | 'other';
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
}

// Subscription types
export interface Subscription {
  id: string;
  landlordId: string;
  plan: 'free' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  amount?: number;
  billingCycle?: 'monthly' | 'yearly';
  paymentMethod?: string;
}

// Analytics types
export interface RentCollectionAnalytics {
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
  collectionRate: number;
  monthlyTrend: {
    month: string;
    collected: number;
    pending: number;
  }[];
}

export interface OccupancyAnalytics {
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
}

export interface MaintenanceAnalytics {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  averageResolutionTime: number; // in days
  costByCategory: {
    category: string;
    cost: number;
  }[];
}

// Ticket/Support types
export interface SupportTicket {
  id: string;
  userId: string;
  userRole: UserRole;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  message: string;
  timestamp: Date;
  attachments?: string[];
}
