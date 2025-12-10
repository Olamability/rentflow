# 📡 RENTFLOW API ENDPOINTS REFERENCE

Complete reference for all 82 API endpoints.

## Base URL

```
Development: http://localhost:3000/api
Production:  https://api.rentflow.com/api
```

## Authentication

All protected endpoints require:
```
Authorization: Bearer {jwt_token}
```

---

## 1. AUTHENTICATION ENDPOINTS

### 1.1 Register User
```http
POST /api/auth/register

Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "role": "landlord" | "tenant"
}

Response 201:
{
  "success": true,
  "data": {
    "user": { id, email, name, role, isVerified },
    "token": "jwt-token"
  }
}
```

### 1.2 Login
```http
POST /api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "jwt-token"
  }
}
```

### 1.3 Verify Email
```http
POST /api/auth/verify-email

Body:
{
  "token": "verification-token"
}

Response 200:
{
  "success": true,
  "message": "Email verified successfully"
}
```

### 1.4 Forgot Password
```http
POST /api/auth/forgot-password

Body:
{
  "email": "user@example.com"
}

Response 200:
{
  "success": true,
  "message": "Reset link sent"
}
```

### 1.5 Reset Password
```http
POST /api/auth/reset-password

Body:
{
  "token": "reset-token",
  "newPassword": "NewSecurePass123!"
}
```

### 1.6 Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. USER & PROFILE ENDPOINTS

### 2.1 Get Current User
```http
GET /api/users/me
Authorization: Bearer {token}
```

### 2.2 Update Profile
```http
PUT /api/users/me
Authorization: Bearer {token}

Body:
{
  "name": "Updated Name",
  "phone": "+2348012345678"
}
```

### 2.3 Upload Avatar
```http
POST /api/users/me/avatar
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "avatar": File
}
```

### 2.4 Get Landlord Profile
```http
GET /api/landlords/profile
Authorization: Bearer {token}
```

### 2.5 Update Landlord Profile
```http
PUT /api/landlords/profile
Authorization: Bearer {token}

Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "businessName": "JD Properties",
  "bankDetails": { /* bank info */ }
}
```

### 2.6 Get Tenant Profile
```http
GET /api/tenants/profile
Authorization: Bearer {token}
```

### 2.7 Update Tenant Profile
```http
PUT /api/tenants/profile
Authorization: Bearer {token}

Body:
{
  "firstName": "Jane",
  "employment": { /* employment info */ }
}
```

---

## 3. PROPERTY ENDPOINTS (Landlord)

### 3.1 Create Property
```http
POST /api/properties
Authorization: Bearer {token}

Body:
{
  "name": "Sunset Apartments",
  "description": "Modern apartments",
  "propertyType": "apartment",
  "addressStreet": "123 Main St",
  "city": "Lagos",
  "state": "Lagos",
  "zipCode": "100001",
  "totalUnits": 10,
  "amenities": ["parking", "security"]
}
```

### 3.2 Get All Properties
```http
GET /api/properties
Authorization: Bearer {token}

Query:
?page=1&limit=10&search=sunset&city=Lagos&propertyType=apartment
```

### 3.3 Get Property by ID
```http
GET /api/properties/:propertyId
Authorization: Bearer {token}
```

### 3.4 Update Property
```http
PUT /api/properties/:propertyId
Authorization: Bearer {token}
```

### 3.5 Delete Property
```http
DELETE /api/properties/:propertyId
Authorization: Bearer {token}
```

### 3.6 Upload Property Images
```http
POST /api/properties/:propertyId/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "images": [File, File, File]
}
```

### 3.7 Delete Property Image
```http
DELETE /api/properties/:propertyId/images/:imageId
Authorization: Bearer {token}
```

### 3.8 Set Primary Image
```http
PATCH /api/properties/:propertyId/images/:imageId/primary
Authorization: Bearer {token}
```

---

## 4. UNIT ENDPOINTS

### 4.1 Create Unit
```http
POST /api/units
Authorization: Bearer {token}

Body:
{
  "propertyId": "property-uuid",
  "unitNumber": "A101",
  "bedrooms": 2,
  "bathrooms": 2,
  "squareFeet": 1200,
  "rentAmount": 50000,
  "depositAmount": 100000,
  "features": ["balcony"]
}
```

### 4.2 Get Units
```http
GET /api/units
Authorization: Bearer {token}

Query:
?propertyId=xxx&status=available&minRent=30000&maxRent=100000
```

### 4.3 Get Unit by ID
```http
GET /api/units/:unitId
Authorization: Bearer {token}
```

### 4.4 Update Unit
```http
PUT /api/units/:unitId
Authorization: Bearer {token}
```

### 4.5 Delete Unit
```http
DELETE /api/units/:unitId
Authorization: Bearer {token}
```

### 4.6 Mark Unit as Occupied
```http
PATCH /api/units/:unitId/occupy
Authorization: Bearer {token}

Body:
{
  "tenantId": "tenant-uuid",
  "agreementId": "agreement-uuid"
}
```

### 4.7 Mark Unit as Vacant
```http
PATCH /api/units/:unitId/vacate
Authorization: Bearer {token}
```

---

## 5. PAYMENT ENDPOINTS

### 5.1 Initiate Payment
```http
POST /api/payments/initiate
Authorization: Bearer {token}

Body:
{
  "unitId": "unit-uuid",
  "amount": 50000,
  "paymentType": "rent",
  "dueDate": "2024-12-31"
}

Response:
{
  "success": true,
  "data": {
    "paymentId": "payment-uuid",
    "reference": "RF-1234567890",
    "paystackUrl": "https://checkout.paystack.com/xxx"
  }
}
```

### 5.2 Verify Payment (Webhook)
```http
POST /api/payments/webhook
X-Paystack-Signature: signature

Body: (From Paystack)
{
  "event": "charge.success",
  "data": { /* payment data */ }
}
```

### 5.3 Get Payment History
```http
GET /api/payments
Authorization: Bearer {token}

Query:
?userId=xxx&status=paid&startDate=2024-01-01&endDate=2024-12-31
```

### 5.4 Get Payment by ID
```http
GET /api/payments/:paymentId
Authorization: Bearer {token}
```

### 5.5 Download Receipt
```http
GET /api/payments/:paymentId/receipt
Authorization: Bearer {token}

Response: PDF file
```

### 5.6 Get Payment Stats (Landlord)
```http
GET /api/payments/stats
Authorization: Bearer {token}

Query:
?period=30d

Response:
{
  "totalCollected": 500000,
  "totalPending": 150000,
  "totalOverdue": 50000,
  "collectionRate": 85.5
}
```

### 5.7 Create Payment Method
```http
POST /api/payment-methods
Authorization: Bearer {token}

Body:
{
  "paystackAuthCode": "AUTH_xxx",
  "isDefault": true
}
```

### 5.8 Get Payment Methods
```http
GET /api/payment-methods
Authorization: Bearer {token}
```

### 5.9 Delete Payment Method
```http
DELETE /api/payment-methods/:methodId
Authorization: Bearer {token}
```

### 5.10 Setup Autopay
```http
POST /api/payments/autopay
Authorization: Bearer {token}

Body:
{
  "agreementId": "agreement-uuid",
  "paymentMethodId": "method-uuid"
}
```

### 5.11 Cancel Autopay
```http
DELETE /api/payments/autopay/:autopayId
Authorization: Bearer {token}
```

---

## 6. MAINTENANCE ENDPOINTS

### 6.1 Create Maintenance Request
```http
POST /api/maintenance
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "unitId": "unit-uuid",
  "title": "Leaking faucet",
  "description": "Kitchen sink is leaking",
  "category": "plumbing",
  "priority": "high",
  "images": [File, File]
}
```

### 6.2 Get Maintenance Requests
```http
GET /api/maintenance
Authorization: Bearer {token}

Query:
?status=pending&priority=high&unitId=xxx
```

### 6.3 Get Request by ID
```http
GET /api/maintenance/:requestId
Authorization: Bearer {token}
```

### 6.4 Update Request Status
```http
PATCH /api/maintenance/:requestId/status
Authorization: Bearer {token}

Body:
{
  "status": "in_progress",
  "assignedTo": "Plumber Mike"
}
```

### 6.5 Add Update/Comment
```http
POST /api/maintenance/:requestId/updates
Authorization: Bearer {token}

Body:
{
  "message": "Plumber on the way",
  "images": [File]
}
```

### 6.6 Mark as Complete
```http
PATCH /api/maintenance/:requestId/complete
Authorization: Bearer {token}

Body:
{
  "actualCost": 5000,
  "completionNotes": "Fixed successfully"
}
```

---

## 7. APPLICATION ENDPOINTS

### 7.1 Submit Application
```http
POST /api/applications
Authorization: Bearer {token}

Body:
{
  "propertyId": "property-uuid",
  "unitId": "unit-uuid",
  "desiredMoveInDate": "2025-01-01",
  "employmentInfo": { /* employment details */ },
  "references": [ /* references */ ]
}
```

### 7.2 Get Applications (Landlord)
```http
GET /api/applications
Authorization: Bearer {token}

Query:
?propertyId=xxx&status=pending
```

### 7.3 Get Application by ID
```http
GET /api/applications/:applicationId
Authorization: Bearer {token}
```

### 7.4 Approve Application
```http
PATCH /api/applications/:applicationId/approve
Authorization: Bearer {token}
```

### 7.5 Reject Application
```http
PATCH /api/applications/:applicationId/reject
Authorization: Bearer {token}

Body:
{
  "rejectionReason": "Insufficient income"
}
```

### 7.6 Withdraw Application (Tenant)
```http
PATCH /api/applications/:applicationId/withdraw
Authorization: Bearer {token}
```

---

## 8. TENANCY AGREEMENT ENDPOINTS

### 8.1 Create Agreement
```http
POST /api/agreements
Authorization: Bearer {token}

Body:
{
  "tenantId": "tenant-uuid",
  "unitId": "unit-uuid",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "rentAmount": 50000,
  "depositAmount": 100000,
  "terms": ["No pets", "No smoking"]
}
```

### 8.2 Get Agreements
```http
GET /api/agreements
Authorization: Bearer {token}

Query:
?status=active&tenantId=xxx
```

### 8.3 Get Agreement by ID
```http
GET /api/agreements/:agreementId
Authorization: Bearer {token}
```

### 8.4 Send for Signature
```http
POST /api/agreements/:agreementId/send
Authorization: Bearer {token}
```

### 8.5 Sign Agreement (Tenant)
```http
POST /api/agreements/:agreementId/sign
Authorization: Bearer {token}

Body:
{
  "signatureData": "base64-encoded-signature"
}
```

### 8.6 Terminate Agreement
```http
PATCH /api/agreements/:agreementId/terminate
Authorization: Bearer {token}

Body:
{
  "terminationReason": "Tenant moving out",
  "terminationDate": "2025-06-30"
}
```

---

## 9. NOTIFICATION ENDPOINTS

### 9.1 Get Notifications
```http
GET /api/notifications
Authorization: Bearer {token}

Query:
?isRead=false&limit=20
```

### 9.2 Mark as Read
```http
PATCH /api/notifications/:notificationId/read
Authorization: Bearer {token}
```

### 9.3 Mark All as Read
```http
PATCH /api/notifications/read-all
Authorization: Bearer {token}
```

### 9.4 Delete Notification
```http
DELETE /api/notifications/:notificationId
Authorization: Bearer {token}
```

---

## 10. DOCUMENT ENDPOINTS

### 10.1 Upload Document
```http
POST /api/documents
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "document": File,
  "documentType": "id_card",
  "relatedPropertyId": "property-uuid"
}
```

### 10.2 Get Documents
```http
GET /api/documents
Authorization: Bearer {token}

Query:
?documentType=receipt&propertyId=xxx
```

### 10.3 Download Document
```http
GET /api/documents/:documentId/download
Authorization: Bearer {token}
```

### 10.4 Delete Document
```http
DELETE /api/documents/:documentId
Authorization: Bearer {token}
```

---

## 11. SUPPORT TICKET ENDPOINTS

### 11.1 Create Ticket
```http
POST /api/support/tickets
Authorization: Bearer {token}

Body:
{
  "subject": "Payment not reflecting",
  "description": "I paid rent but status still pending",
  "priority": "high",
  "category": "payment"
}
```

### 11.2 Get Tickets
```http
GET /api/support/tickets
Authorization: Bearer {token}

Query:
?status=open&priority=high
```

### 11.3 Get Ticket by ID
```http
GET /api/support/tickets/:ticketId
Authorization: Bearer {token}
```

### 11.4 Add Message
```http
POST /api/support/tickets/:ticketId/messages
Authorization: Bearer {token}

Body:
{
  "message": "Here's a screenshot",
  "attachments": [File]
}
```

### 11.5 Close Ticket
```http
PATCH /api/support/tickets/:ticketId/close
Authorization: Bearer {token}
```

---

## 12. ADMIN ENDPOINTS

### 12.1 Get All Users
```http
GET /api/admin/users
Authorization: Bearer {token} (Admin only)

Query:
?role=landlord&isVerified=true&page=1&limit=50
```

### 12.2 Get User Details
```http
GET /api/admin/users/:userId
Authorization: Bearer {token} (Admin only)
```

### 12.3 Suspend User
```http
PATCH /api/admin/users/:userId/suspend
Authorization: Bearer {token} (Admin only)

Body:
{
  "reason": "Fraudulent activity"
}
```

### 12.4 Activate User
```http
PATCH /api/admin/users/:userId/activate
Authorization: Bearer {token} (Admin only)
```

### 12.5 Delete User
```http
DELETE /api/admin/users/:userId
Authorization: Bearer {token} (Admin only)
```

### 12.6 Get Platform Analytics
```http
GET /api/admin/analytics
Authorization: Bearer {token} (Admin only)

Query:
?period=30d

Response:
{
  "totalUsers": 10000,
  "totalLandlords": 2000,
  "totalTenants": 8000,
  "totalProperties": 5000,
  "totalPayments": 100000,
  "totalRevenue": 5000000,
  "monthlyGrowth": 15.5
}
```

### 12.7 Get Revenue Stats
```http
GET /api/admin/revenue
Authorization: Bearer {token} (Admin only)
```

### 12.8 Flag Fraudulent Activity
```http
POST /api/admin/fraud/flag
Authorization: Bearer {token} (Admin only)

Body:
{
  "userId": "user-uuid",
  "reason": "Multiple failed payments",
  "severity": "high"
}
```

### 12.9 Get Audit Logs
```http
GET /api/admin/audit-logs
Authorization: Bearer {token} (Admin only)

Query:
?userId=xxx&action=payment&startDate=2024-01-01
```

### 12.10 Create Announcement
```http
POST /api/admin/announcements
Authorization: Bearer {token} (Admin only)

Body:
{
  "title": "System Maintenance",
  "message": "Platform will be down for 2 hours",
  "targetRole": "all",
  "priority": "high"
}
```

### 12.11 Get System Config
```http
GET /api/admin/config
Authorization: Bearer {token} (Admin only)
```

### 12.12 Update System Config
```http
PUT /api/admin/config
Authorization: Bearer {token} (Admin only)

Body:
{
  "maintenanceMode": false,
  "maxFileSize": 10485760,
  "allowedFileTypes": ["jpg", "png", "pdf"]
}
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { /* additional details */ }
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "totalPages": 10,
    "limit": 10
  }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Not logged in |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate resource |
| 422 | Validation Error - Invalid data |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error - Internal error |
| 503 | Service Unavailable - Maintenance mode |

---

**Total Endpoints**: 82  
**Authentication Required**: 76  
**Admin Only**: 12  
**Public**: 6

---

For complete implementation details, see the main guide!
