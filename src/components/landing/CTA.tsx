import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-info/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Simplify Your Property Management?
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Join thousands of landlords who've streamlined their operations with RentFlow. Start your free trial today.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-primary-foreground/80">
                <Check className="w-5 h-5 text-accent" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button variant="accent" size="xl" asChild className="group">
            <Link to="/register">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
