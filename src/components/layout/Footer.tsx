import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-semibold">RentFlow</span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              The modern way to manage properties, collect rent, and keep tenants happy.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Integrations</Link></li>
              <li><Link to="/changelog" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/help" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} RentFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm">Twitter</a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
