import { useState } from "react";
import { Link } from "react-router";
import { Check, X, ArrowRight, HelpCircle, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 299,
    yearlyPrice: 249,
    desc: "Perfect for small businesses launching online",
    color: "#8B5E3C",
    popular: false,
    features: [
      { name: "Business Website (5 pages)", included: true },
      { name: "Mobile Responsive Design", included: true },
      { name: "Basic SEO Setup", included: true },
      { name: "1 AI Chatbot", included: true },
      { name: "5 Automation Flows", included: true },
      { name: "Monthly Analytics Report", included: true },
      { name: "Email Support", included: true },
      { name: "Mobile App", included: false },
      { name: "CRM System", included: false },
      { name: "Custom AI Training", included: false },
      { name: "Dedicated Account Manager", included: false },
      { name: "White-label Solution", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Business",
    monthlyPrice: 799,
    yearlyPrice: 649,
    desc: "For growing companies that need full digital power",
    color: "#4A2E1F",
    popular: true,
    features: [
      { name: "Business Website (unlimited pages)", included: true },
      { name: "Mobile Responsive Design", included: true },
      { name: "Advanced SEO + Blog", included: true },
      { name: "5 AI Chatbots", included: true },
      { name: "Unlimited Automation Flows", included: true },
      { name: "Real-time Analytics Dashboard", included: true },
      { name: "Priority Support (24h response)", included: true },
      { name: "Mobile App (iOS + Android)", included: true },
      { name: "CRM System", included: true },
      { name: "Custom AI Training", included: false },
      { name: "Dedicated Account Manager", included: false },
      { name: "White-label Solution", included: false },
    ],
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    desc: "Full AI business engine for scale",
    color: "#5A3A2B",
    popular: false,
    features: [
      { name: "Everything in Business", included: true },
      { name: "Unlimited Everything", included: true },
      { name: "Full AI System + Custom LLMs", included: true },
      { name: "Complete SaaS Platform", included: true },
      { name: "Custom AI Training on your data", included: true },
      { name: "Dedicated Account Manager", included: true },
      { name: "24/7 Priority Support", included: true },
      { name: "White-label Solution", included: true },
      { name: "Custom Integrations", included: true },
      { name: "SLA Guarantee", included: true },
      { name: "Custom Analytics & Reporting", included: true },
      { name: "On-site Training", included: true },
    ],
    cta: "Contact Sales",
  },
];

const faqs = [
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a free 30-minute consultation to assess your needs. For startups, we have special pricing — just reach out.",
  },
  {
    q: "What's included in the setup?",
    a: "All plans include onboarding, initial setup, and training. We make sure you're fully operational from day one.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all plans if you're not satisfied with our service.",
  },
  {
    q: "What kind of support do you provide?",
    a: "Starter gets email support, Business gets priority support with 24h response, and Enterprise gets 24/7 dedicated support.",
  },
];

export function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "linear-gradient(135deg, #FDF8F5 0%, #ffffff 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Pricing
          </span>
          <h1 className="mt-4 mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "#1a0f0a", lineHeight: 1.15 }}>
            Invest in Growth. Not Complexity.
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Transparent pricing with no hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl" style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}>
            <button
              onClick={() => setBilling("monthly")}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: billing === "monthly" ? "#4A2E1F" : "transparent",
                color: billing === "monthly" ? "#ffffff" : "#4A2E1F",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
              style={{
                background: billing === "yearly" ? "#4A2E1F" : "transparent",
                color: billing === "yearly" ? "#ffffff" : "#4A2E1F",
              }}
            >
              Yearly
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: billing === "yearly" ? "#C4956A" : "#C4956A", color: "#4A2E1F" }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: plan.popular ? "#4A2E1F" : "#ffffff",
                border: plan.popular ? "none" : "1px solid rgba(74,46,31,0.12)",
                boxShadow: plan.popular ? "0 20px 60px rgba(74,46,31,0.3)" : "0 2px 12px rgba(74,46,31,0.06)",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
              }}
            >
              {plan.popular && (
                <div
                  className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold flex items-center justify-center gap-1.5"
                  style={{ background: "#C4956A", color: "#4A2E1F" }}
                >
                  <Crown size={12} />
                  MOST POPULAR
                </div>
              )}
              <div className={`p-6 ${plan.popular ? "pt-10" : ""}`}>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: plan.popular ? "#C4956A" : "#1a0f0a" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-xs mb-5"
                  style={{ color: plan.popular ? "rgba(196,149,106,0.8)" : "#8B5E3C" }}
                >
                  {plan.desc}
                </p>

                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <>
                      <span
                        className="text-4xl font-black"
                        style={{ color: plan.popular ? "#ffffff" : "#1a0f0a" }}
                      >
                        ${billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-sm" style={{ color: plan.popular ? "#C4956A" : "#8B5E3C" }}>
                        /month
                      </span>
                      {billing === "yearly" && (
                        <p className="text-xs mt-1" style={{ color: plan.popular ? "#C4956A" : "#8B5E3C" }}>
                          Billed annually
                        </p>
                      )}
                    </>
                  ) : (
                    <span
                      className="text-4xl font-black"
                      style={{ color: plan.popular ? "#ffffff" : "#1a0f0a" }}
                    >
                      Custom
                    </span>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold mb-6 transition-all duration-200"
                  style={{
                    background: plan.popular ? "#C4956A" : "#4A2E1F",
                    color: plan.popular ? "#4A2E1F" : "#ffffff",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-2.5 text-sm">
                      {feature.included ? (
                        <Check
                          size={15}
                          style={{ color: plan.popular ? "#C4956A" : "#4A2E1F", flexShrink: 0 }}
                        />
                      ) : (
                        <X size={15} style={{ color: "rgba(74,46,31,0.3)", flexShrink: 0 }} />
                      )}
                      <span
                        style={{
                          color: feature.included
                            ? plan.popular ? "rgba(255,255,255,0.9)" : "#1a0f0a"
                            : "rgba(90,58,43,0.4)",
                          textDecoration: !feature.included ? "line-through" : "none",
                        }}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-center mb-10" style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0f0a" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{ border: "1px solid var(--pengu-border)", background: "var(--pengu-card)" }}
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm" style={{ color: "#1a0f0a" }}>
                    {faq.q}
                  </span>
                  <HelpCircle
                    size={18}
                    style={{ color: "#8B5E3C", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm" style={{ color: "#5A3A2B", opacity: 0.85 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 800 }}>
            Not Sure Which Plan Is Right?
          </h2>
          <p className="mb-8" style={{ color: "#C4956A" }}>
            Talk to our team and we'll help you pick the perfect plan for your business needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: "#C4956A", color: "#4A2E1F" }}
          >
            Talk to Sales <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}