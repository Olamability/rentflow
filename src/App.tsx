import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          
          {/* Landlord Routes */}
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord/properties" element={<PropertyManagement />} />
          <Route path="/landlord/units" element={<UnitManagement />} />
          <Route path="/landlord/rent-collection" element={<RentCollection />} />
          <Route path="/landlord/maintenance" element={<LandlordMaintenance />} />
          <Route path="/landlord/agreements" element={<TenancyAgreements />} />
          <Route path="/landlord/reports" element={<LandlordReports />} />
          <Route path="/landlord/subscription" element={<Subscription />} />
          <Route path="/landlord/reminders" element={<AutomatedReminders />} />
          
          {/* Tenant Routes */}
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/tenant/search" element={<PropertySearch />} />
          <Route path="/tenant/rent" element={<RentPayment />} />
          <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
          <Route path="/tenant/agreements" element={<TenantAgreements />} />
          <Route path="/tenant/profile" element={<TenantProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/analytics" element={<PlatformAnalytics />} />
          <Route path="/admin/support" element={<SupportTickets />} />
          <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
          <Route path="/admin/configuration" element={<SystemConfiguration />} />
          <Route path="/admin/audit-log" element={<AuditLog />} />
          <Route path="/admin/announcements" element={<PlatformAnnouncements />} />
          
          {/* Shared Routes */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/help" element={<Help />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Legacy Routes (for backward compatibility) */}
          <Route path="/dashboard" element={<LandlordDashboard />} />
          <Route path="/tenant" element={<TenantDashboard />} />
          
          {/* 404 - Keep this last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
