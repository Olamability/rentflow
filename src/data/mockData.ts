import type {
  Landlord,
  Tenant,
  Property,
  Unit,
  Payment,
  MaintenanceRequest,
  PropertyApplication,
  TenancyAgreement,
  Notification,
  Document,
} from '@/types';

// Mock Landlords
export const mockLandlords: Landlord[] = [
  {
    id: 'landlord-1',
    email: 'james@rentflow.com',
    name: 'James Wilson',
    role: 'landlord',
    phone: '+1 (555) 123-4567',
    isPro: true,
    subscriptionStatus: 'pro',
    subscriptionExpiry: new Date('2025-12-31'),
    properties: ['prop-1', 'prop-2', 'prop-3'],
    createdAt: new Date('2024-01-15'),
    isVerified: true,
  },
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    email: 'sarah@email.com',
    name: 'Sarah Johnson',
    role: 'tenant',
    phone: '+1 (555) 234-5678',
    currentLeaseId: 'lease-1',
    createdAt: new Date('2024-01-20'),
    isVerified: true,
  },
  {
    id: 'tenant-2',
    email: 'john@email.com',
    name: 'John Smith',
    role: 'tenant',
    phone: '+1 (555) 345-6789',
    currentLeaseId: 'lease-2',
    createdAt: new Date('2024-02-01'),
    isVerified: true,
  },
  {
    id: 'tenant-3',
    email: 'mike@email.com',
    name: 'Mike Davis',
    role: 'tenant',
    phone: '+1 (555) 456-7890',
    currentLeaseId: 'lease-3',
    createdAt: new Date('2024-02-15'),
    isVerified: true,
  },
];

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    landlordId: 'landlord-1',
    name: 'Sunset Apartments',
    address: '123 Sunset Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    type: 'apartment',
    description: 'Modern apartment complex with amenities',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    amenities: ['Pool', 'Gym', 'Parking', 'Laundry', 'Pet Friendly'],
    totalUnits: 12,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'prop-2',
    landlordId: 'landlord-1',
    name: 'Oak Street Condos',
    address: '456 Oak Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    type: 'condo',
    description: 'Luxury condos in prime location',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    ],
    amenities: ['Concierge', 'Rooftop Terrace', 'Security'],
    totalUnits: 8,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'prop-3',
    landlordId: 'landlord-1',
    name: 'Riverside Homes',
    address: '789 River Road',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    type: 'house',
    description: 'Family homes near the waterfront',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    ],
    amenities: ['Garden', 'Garage', 'Backyard'],
    totalUnits: 6,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
];

// Mock Units
export const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    propertyId: 'prop-1',
    unitNumber: '4A',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    rentAmount: 1500,
    deposit: 2000,
    isOccupied: true,
    currentTenantId: 'tenant-1',
    features: ['Balcony', 'Dishwasher', 'In-unit Laundry'],
  },
  {
    id: 'unit-2',
    propertyId: 'prop-1',
    unitNumber: '2B',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 850,
    rentAmount: 1200,
    deposit: 1500,
    isOccupied: true,
    currentTenantId: 'tenant-2',
    features: ['Hardwood Floors', 'Walk-in Closet'],
  },
  {
    id: 'unit-3',
    propertyId: 'prop-1',
    unitNumber: '7C',
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1500,
    rentAmount: 1800,
    deposit: 2500,
    isOccupied: true,
    currentTenantId: 'tenant-3',
    features: ['Bay Windows', 'Storage', 'Parking Space'],
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    tenantId: 'tenant-1',
    landlordId: 'landlord-1',
    unitId: 'unit-1',
    amount: 1500,
    dueDate: new Date('2024-12-01'),
    paidDate: new Date('2024-12-05'),
    status: 'paid',
    paymentMethod: 'card',
    transactionId: 'txn-123456',
    receiptUrl: '/receipts/pay-1.pdf',
  },
  {
    id: 'pay-2',
    tenantId: 'tenant-2',
    landlordId: 'landlord-1',
    unitId: 'unit-2',
    amount: 1200,
    dueDate: new Date('2024-12-01'),
    paidDate: new Date('2024-12-05'),
    status: 'paid',
    paymentMethod: 'transfer',
    transactionId: 'txn-123457',
    receiptUrl: '/receipts/pay-2.pdf',
  },
  {
    id: 'pay-3',
    tenantId: 'tenant-3',
    landlordId: 'landlord-1',
    unitId: 'unit-3',
    amount: 1800,
    dueDate: new Date('2024-12-01'),
    status: 'pending',
  },
];

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'maint-1',
    tenantId: 'tenant-1',
    landlordId: 'landlord-1',
    unitId: 'unit-1',
    title: 'Leaky faucet in bathroom',
    description: 'The bathroom sink faucet has been dripping constantly for the past week.',
    priority: 'medium',
    status: 'in_progress',
    category: 'plumbing',
    images: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop'],
    createdAt: new Date('2024-12-03'),
    updatedAt: new Date('2024-12-05'),
    assignedTo: 'John\'s Plumbing Services',
  },
  {
    id: 'maint-2',
    tenantId: 'tenant-2',
    landlordId: 'landlord-1',
    unitId: 'unit-2',
    title: 'AC not cooling properly',
    description: 'Air conditioning unit is running but not cooling the apartment effectively.',
    priority: 'high',
    status: 'completed',
    category: 'hvac',
    images: [],
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-20'),
    completedAt: new Date('2024-11-20'),
    assignedTo: 'Cool Air HVAC',
    estimatedCost: 150,
    actualCost: 125,
  },
];

// Mock Applications
export const mockApplications: PropertyApplication[] = [
  {
    id: 'app-1',
    tenantId: 'tenant-4',
    propertyId: 'prop-1',
    unitId: 'unit-4',
    status: 'pending',
    submittedAt: new Date('2024-12-01'),
    moveInDate: new Date('2025-01-01'),
    employmentInfo: {
      employer: 'Tech Corp',
      position: 'Software Engineer',
      income: 90000,
    },
    references: [
      {
        name: 'Previous Landlord',
        phone: '+1 (555) 999-8888',
        relationship: 'landlord',
      },
    ],
    documents: {
      idCard: '/docs/id-tenant-4.pdf',
      proofOfIncome: '/docs/income-tenant-4.pdf',
    },
  },
];

// Mock Tenancy Agreements
export const mockAgreements: TenancyAgreement[] = [
  {
    id: 'lease-1',
    landlordId: 'landlord-1',
    tenantId: 'tenant-1',
    propertyId: 'prop-1',
    unitId: 'unit-1',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-01-14'),
    rentAmount: 1500,
    deposit: 2000,
    status: 'active',
    documentUrl: '/agreements/lease-1.pdf',
    signedDate: new Date('2024-01-10'),
    terms: [
      'Rent due on 1st of each month',
      'Late fee of $50 after 5 days',
      'No smoking inside the unit',
      '30 days notice required for move-out',
    ],
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'tenant-1',
    title: 'Rent Due in 7 Days',
    message: 'Your December rent payment of $1,500 is due on December 15th.',
    type: 'warning',
    isRead: false,
    createdAt: new Date('2024-12-08'),
    actionUrl: '/tenant/payments',
  },
  {
    id: 'notif-2',
    userId: 'tenant-1',
    title: 'Maintenance Update',
    message: 'Your maintenance request #1234 has been assigned to a technician.',
    type: 'info',
    isRead: false,
    createdAt: new Date('2024-12-05'),
    actionUrl: '/tenant/maintenance',
  },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    ownerId: 'tenant-1',
    type: 'lease',
    name: 'Lease Agreement',
    url: '/documents/lease-1.pdf',
    size: 2457600,
    mimeType: 'application/pdf',
    uploadedAt: new Date('2024-01-15'),
  },
  {
    id: 'doc-2',
    ownerId: 'tenant-1',
    type: 'receipt',
    name: 'November Receipt',
    url: '/documents/receipt-nov-2024.pdf',
    size: 245760,
    mimeType: 'application/pdf',
    uploadedAt: new Date('2024-11-01'),
  },
];
