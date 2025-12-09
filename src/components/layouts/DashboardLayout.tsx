import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Building2, 
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface NavLink {
  icon: any;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navLinks: NavLink[];
  userName?: string;
  pageTitle?: string;
  pageDescription?: string;
  headerActions?: ReactNode;
  showBackButton?: boolean;
  backButtonPath?: string;
}

const DashboardLayout = ({
  children,
  navLinks,
  userName = "User",
  pageTitle = "Dashboard",
  pageDescription,
  headerActions,
  showBackButton = false,
  backButtonPath,
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Determine profile URL based on user role
  const getProfileUrl = () => {
    if (!user) return "/settings";
    switch (user.role) {
      case 'tenant':
        return '/tenant/profile';
      case 'landlord':
        return '/landlord/profile';
      case 'admin':
        return '/admin/profile';
      default:
        return '/settings';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar text-sidebar-foreground flex-shrink-0 transition-all duration-300 fixed lg:relative h-full z-50",
          sidebarOpen ? 'w-64' : 'w-20',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              {sidebarOpen && <span className="text-xl font-semibold">RentFlow</span>}
            </Link>
            
            {/* Mobile close button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActiveLink(link.href)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Collapse button - desktop only */}
          <button 
            className="hidden lg:flex items-center justify-center p-2 mt-4 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="ml-2">Collapse</span>}
              </>
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Back button */}
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => backButtonPath ? navigate(backButtonPath) : navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            <div>
              <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
              {pageDescription && (
                <p className="text-sm text-muted-foreground">{pageDescription}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {headerActions}
            <Link 
              to="/notifications"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:opacity-80 transition-opacity">
                  <span className="text-sm font-semibold text-accent-foreground">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">Manage your account</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getProfileUrl()} className="cursor-pointer">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
