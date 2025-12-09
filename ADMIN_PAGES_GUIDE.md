# Admin Pages - Backend Integration Guide

## Overview
This document provides comprehensive information about the admin pages, their functionality, and requirements for backend integration.

## Admin Pages Structure

### 1. Admin Dashboard (`/admin/dashboard`)
**Purpose**: Central hub for platform administration and monitoring

**Features**:
- Real-time platform statistics (users, revenue, etc.)
- Quick action buttons to navigate to different admin sections
- Recent activity feed
- Platform health monitoring
- System alerts and notifications

**Data Requirements**:
- Platform statistics (total users, active landlords, active tenants, monthly revenue)
- Recent activity logs
- System health metrics (uptime, active sessions, API response time)
- Pending alerts (support tickets, user registrations)

### 2. User Management (`/admin/users`)
**Purpose**: Manage all platform users (landlords, tenants, admins)

**Features**:
- Search and filter users by role, status, verification, KYC status
- View user details with complete profile information
- Bulk actions (suspend, delete, export)
- Approve pending users
- Flag users for fraud
- Pagination support

**Data Requirements**:
```typescript
interface User {
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
```

**API Endpoints Needed**:
- `GET /api/admin/users` - List users with filters and pagination
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `POST /api/admin/users/:id/suspend` - Suspend user
- `POST /api/admin/users/:id/approve` - Approve user
- `POST /api/admin/users/:id/flag-fraud` - Flag user for fraud
- `POST /api/admin/users/bulk-action` - Bulk operations
- `GET /api/admin/users/export` - Export user data

### 3. Support Tickets (`/admin/support`)
**Purpose**: Manage user support requests and tickets

**Features**:
- Search and filter tickets by priority, status, category
- View full ticket details with conversation history
- Respond to tickets
- Update ticket status
- Send internal notes
- Pagination support

**Data Requirements**:
```typescript
interface SupportTicket {
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
```

**API Endpoints Needed**:
- `GET /api/admin/tickets` - List tickets with filters
- `GET /api/admin/tickets/:id` - Get ticket details
- `PUT /api/admin/tickets/:id/status` - Update ticket status
- `POST /api/admin/tickets/:id/messages` - Add message to ticket
- `GET /api/admin/tickets/export` - Export ticket data

### 4. Platform Analytics (`/admin/analytics`)
**Purpose**: Visualize platform metrics and insights

**Features**:
- Time range selection (7d, 30d, 90d, 1y)
- User growth charts (line chart)
- Revenue and subscription trends (bar chart)
- User distribution by role and plan (pie charts)
- Weekly activity metrics
- Export analytics reports

**Data Requirements**:
- User growth over time (grouped by month)
- Revenue and subscription data (grouped by month)
- User distribution by role and plan
- Weekly activity metrics (logins, tickets, transactions)

**API Endpoints Needed**:
- `GET /api/admin/analytics/user-growth?range=30d` - User growth data
- `GET /api/admin/analytics/revenue?range=30d` - Revenue data
- `GET /api/admin/analytics/distribution` - User distribution data
- `GET /api/admin/analytics/activity?range=7d` - Activity metrics
- `GET /api/admin/analytics/export` - Export analytics data

### 5. Subscription Management (`/admin/subscriptions`)
**Purpose**: Track and manage landlord subscriptions

**Features**:
- Search and filter subscriptions by plan and status
- View subscription details
- Track revenue metrics (MRR, total revenue)
- Monitor trial users
- Pagination support

**Data Requirements**:
```typescript
interface Subscription {
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
```

**API Endpoints Needed**:
- `GET /api/admin/subscriptions` - List subscriptions with filters
- `GET /api/admin/subscriptions/:id` - Get subscription details
- `PUT /api/admin/subscriptions/:id` - Update subscription
- `GET /api/admin/subscriptions/export` - Export subscription data

### 6. System Configuration (`/admin/configuration`)
**Purpose**: Manage platform-wide settings and configurations

**Features**:
- Search configurations
- Filter by category (general, payment, email, security, features)
- Add, edit, delete configurations
- Categorized view

**Data Requirements**:
```typescript
interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  category: 'general' | 'payment' | 'email' | 'security' | 'features';
  updatedAt: string;
  updatedBy: string;
}
```

**API Endpoints Needed**:
- `GET /api/admin/config` - List configurations
- `GET /api/admin/config/:id` - Get configuration
- `POST /api/admin/config` - Create configuration
- `PUT /api/admin/config/:id` - Update configuration
- `DELETE /api/admin/config/:id` - Delete configuration

### 7. Audit Log (`/admin/audit-log`)
**Purpose**: Track all administrative actions for accountability

**Features**:
- Search and filter by action type and resource
- View detailed change history
- Track admin user, timestamp, IP address
- Pagination support
- Export audit logs

**Data Requirements**:
```typescript
interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
}
```

**API Endpoints Needed**:
- `GET /api/admin/audit-log` - List audit logs with filters
- `GET /api/admin/audit-log/export` - Export audit logs
- `POST /api/admin/audit-log` - Create audit log entry (automatic on admin actions)

### 8. Platform Announcements (`/admin/announcements`)
**Purpose**: Create and manage platform-wide announcements

**Features**:
- Create, edit, delete announcements
- Set announcement type (info, success, warning, error)
- Target specific audiences (all, landlords, tenants)
- Schedule announcements with start/end dates
- Toggle active/inactive status

**Data Requirements**:
```typescript
interface PlatformAnnouncement {
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
```

**API Endpoints Needed**:
- `GET /api/admin/announcements` - List announcements
- `GET /api/admin/announcements/:id` - Get announcement
- `POST /api/admin/announcements` - Create announcement
- `PUT /api/admin/announcements/:id` - Update announcement
- `DELETE /api/admin/announcements/:id` - Delete announcement
- `PUT /api/admin/announcements/:id/toggle` - Toggle active status

## Common Features Across Pages

### Pagination
All list views support pagination with:
- Page number
- Page size (10, 25, 50, 100)
- Total count
- First/Previous/Next/Last navigation

**Query Parameters**:
```
?page=1&pageSize=10
```

### Search
All search features support:
- Real-time search
- Multiple field search
- Case-insensitive matching

**Query Parameters**:
```
?search=query
```

### Filters
Context-specific filters per page with query parameters like:
```
?role=landlord&status=active&verified=true
```

### Export
All export features should return CSV format with:
- All filtered data
- Proper headers
- Timestamp in filename

## Authentication & Authorization

All admin endpoints require:
1. Valid authentication token
2. Admin role verification
3. Specific permissions (for granular control)

**Headers Required**:
```
Authorization: Bearer <token>
```

## Error Handling

All API responses should follow this structure:

**Success Response**:
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

## Rate Limiting

Recommended rate limits for admin endpoints:
- Standard operations: 100 requests/minute
- Export operations: 10 requests/minute
- Bulk operations: 20 requests/minute

## Security Considerations

1. **Audit Logging**: All admin actions should be automatically logged
2. **IP Tracking**: Track IP addresses for admin actions
3. **Two-Factor Authentication**: Recommend 2FA for admin accounts
4. **Session Management**: Implement proper session timeout
5. **RBAC**: Implement role-based access control for granular permissions
6. **Data Encryption**: Encrypt sensitive configuration values
7. **Input Validation**: Validate all inputs server-side
8. **XSS Protection**: Sanitize all user inputs
9. **CSRF Protection**: Implement CSRF tokens for state-changing operations

## Next Steps for Backend Integration

1. Implement all API endpoints listed above
2. Set up database models matching the TypeScript interfaces
3. Implement authentication and authorization middleware
4. Set up audit logging system
5. Implement rate limiting
6. Add comprehensive input validation
7. Set up automated tests for all endpoints
8. Deploy and configure monitoring/alerting
9. Create API documentation (Swagger/OpenAPI)
10. Set up proper error tracking (e.g., Sentry)

## Testing the Admin Pages

Current mock data is implemented in each page. To test:

1. Navigate to any admin page
2. All functionality works with mock data
3. Toast notifications confirm actions
4. Filters, search, and pagination work correctly
5. Dialogs and forms are fully functional

When backend is ready:
1. Replace mock data with API calls
2. Update state management with real data
3. Implement loading states
4. Add error handling for failed requests
5. Test with real user scenarios

## Contact

For questions or clarifications about the admin pages implementation, please refer to the TypeScript interfaces in `/src/types/admin.ts` and the component implementations in `/src/pages/admin/` and `/src/components/admin/`.
