import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Landlord Pages
import LandlordDashboard from "./pages/landlord/Dashboard";
import PropertyManagement from "./pages/landlord/PropertyManagement";
import UnitManagement from "./pages/landlord/UnitManagement";
import RentCollection from "./pages/landlord/RentCollection";
import LandlordMaintenance from "./pages/landlord/Maintenance";
import TenancyAgreements from "./pages/landlord/TenancyAgreements";
import LandlordReports from "./pages/landlord/Reports";
import Subscription from "./pages/landlord/Subscription";
import AutomatedReminders from "./pages/landlord/AutomatedReminders";
import LandlordProfile from "./pages/landlord/Profile";

// Tenant Pages
import TenantDashboard from "./pages/tenant/Dashboard";
import PropertySearch from "./pages/tenant/PropertySearch";
import RentPayment from "./pages/tenant/RentPayment";
import TenantMaintenance from "./pages/tenant/Maintenance";
import TenantAgreements from "./pages/tenant/Agreements";
import TenantProfile from "./pages/tenant/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import PlatformAnalytics from "./pages/admin/PlatformAnalytics";
import SupportTickets from "./pages/admin/SupportTickets";
import SubscriptionManagement from "./pages/admin/SubscriptionManagement";
import SystemConfiguration from "./pages/admin/SystemConfiguration";
import AuditLog from "./pages/admin/AuditLog";
import PlatformAnnouncements from "./pages/admin/PlatformAnnouncements";
import AdminProfile from "./pages/admin/Profile";

// Shared Pages
import Settings from "./pages/shared/Settings";
import Documents from "./pages/shared/Documents";
import PaymentHistory from "./pages/shared/PaymentHistory";
import Help from "./pages/shared/Help";
import Notifications from "./pages/shared/Notifications";

// Public Pages
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Integrations from "./pages/Integrations";
import Changelog from "./pages/Changelog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Security from "./pages/Security";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/security" element={<Security />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Landlord Routes - Protected */}
          <Route path="/landlord/dashboard" element={<ProtectedRoute allowedRoles={['landlord']}><LandlordDashboard /></ProtectedRoute>} />
          <Route path="/landlord/properties" element={<ProtectedRoute allowedRoles={['landlord']}><PropertyManagement /></ProtectedRoute>} />
          <Route path="/landlord/units" element={<ProtectedRoute allowedRoles={['landlord']}><UnitManagement /></ProtectedRoute>} />
          <Route path="/landlord/rent-collection" element={<ProtectedRoute allowedRoles={['landlord']}><RentCollection /></ProtectedRoute>} />
          <Route path="/landlord/maintenance" element={<ProtectedRoute allowedRoles={['landlord']}><LandlordMaintenance /></ProtectedRoute>} />
          <Route path="/landlord/agreements" element={<ProtectedRoute allowedRoles={['landlord']}><TenancyAgreements /></ProtectedRoute>} />
          <Route path="/landlord/reports" element={<ProtectedRoute allowedRoles={['landlord']}><LandlordReports /></ProtectedRoute>} />
          <Route path="/landlord/subscription" element={<ProtectedRoute allowedRoles={['landlord']}><Subscription /></ProtectedRoute>} />
          <Route path="/landlord/reminders" element={<ProtectedRoute allowedRoles={['landlord']}><AutomatedReminders /></ProtectedRoute>} />
          <Route path="/landlord/profile" element={<ProtectedRoute allowedRoles={['landlord']}><LandlordProfile /></ProtectedRoute>} />
          
          {/* Tenant Routes - Protected */}
          <Route path="/tenant/dashboard" element={<ProtectedRoute allowedRoles={['tenant']}><TenantDashboard /></ProtectedRoute>} />
          <Route path="/tenant/search" element={<ProtectedRoute allowedRoles={['tenant']}><PropertySearch /></ProtectedRoute>} />
          <Route path="/tenant/rent" element={<ProtectedRoute allowedRoles={['tenant']}><RentPayment /></ProtectedRoute>} />
          <Route path="/tenant/maintenance" element={<ProtectedRoute allowedRoles={['tenant']}><TenantMaintenance /></ProtectedRoute>} />
          <Route path="/tenant/agreements" element={<ProtectedRoute allowedRoles={['tenant']}><TenantAgreements /></ProtectedRoute>} />
          <Route path="/tenant/profile" element={<ProtectedRoute allowedRoles={['tenant']}><TenantProfile /></ProtectedRoute>} />
          
          {/* Admin Routes - Protected */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><PlatformAnalytics /></ProtectedRoute>} />
          <Route path="/admin/support" element={<ProtectedRoute allowedRoles={['admin']}><SupportTickets /></ProtectedRoute>} />
          <Route path="/admin/subscriptions" element={<ProtectedRoute allowedRoles={['admin']}><SubscriptionManagement /></ProtectedRoute>} />
          <Route path="/admin/configuration" element={<ProtectedRoute allowedRoles={['admin']}><SystemConfiguration /></ProtectedRoute>} />
          <Route path="/admin/audit-log" element={<ProtectedRoute allowedRoles={['admin']}><AuditLog /></ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={['admin']}><PlatformAnnouncements /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
          
          {/* Shared Routes - Protected */}
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          
          {/* Legacy Routes (for backward compatibility) */}
          <Route path="/dashboard" element={<LandlordDashboard />} />
          <Route path="/tenant" element={<TenantDashboard />} />
          
          {/* 404 - Keep this last */}
          <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
