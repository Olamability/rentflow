import { Building2, UserPlus, Receipt, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Building2,
    step: "01",
    title: "List Your Properties",
    description: "Add your properties and units with photos, amenities, and rental terms. Set up rent amounts and deposit requirements.",
  },
  {
    icon: UserPlus,
    step: "02",
    title: "Onboard Tenants",
    description: "Invite tenants to apply, screen applicants, and send digital lease agreements for e-signature.",
  },
  {
    icon: Receipt,
    step: "03",
    title: "Automate Billing",
    description: "Set up recurring rent invoices with automatic reminders. Accept payments online and track everything.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Manage & Grow",
    description: "Handle maintenance requests, access reports, and scale your portfolio with confidence.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple setup, powerful results. Here's how RentFlow transforms your property management.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-accent/10 -translate-y-1/2" />
              )}
              
              <div className="text-center">
                {/* Step number & icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-card border border-border flex items-center justify-center shadow-soft">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
