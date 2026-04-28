import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Check, ArrowRight, Globe, Smartphone, Bot, Zap, BarChart3, Palette, ChevronRight } from "lucide-react";
import { api } from "../utils/api";

const serviceIconMap: Record<string, any> = {
  "🌐": Globe,
  "📱": Smartphone,
  "🤖": Bot,
  "⚡": Zap,
  "📊": BarChart3,
  "🎨": Palette,
};

export function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.get('services');
        setServices(data.filter((s: any) => s.active));
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "var(--pengu-grad)" }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Our Services
          </span>
          <h1 className="mt-4 mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "var(--pengu-text)", lineHeight: 1.15 }}>
            Digital Services That Scale
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
            Every service powered by AI. Every solution built to grow. No freelancers, no agencies — 
            just an intelligent platform delivering enterprise-grade results.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {services.map((service, i) => {
          const ServiceIcon = serviceIconMap[service.icon] || Globe;
          return (
          <section
            key={service._id}
            id={service.slug}
            className="py-16"
            style={{ borderBottom: i < services.length - 1 ? "1px solid var(--pengu-border)" : "none" }}
          >
            <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              {/* Content */}
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: service.color }}
                  >
                    <ServiceIcon size={26} style={{ color: "#C4956A" }} />
                  </div>
                  <div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
                      {service.tagline}
                    </span>
                    <h2 className="mt-1" style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--pengu-text)" }}>
                      {service.title}
                    </h2>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.85 }}>
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {(service.features || []).map((feature: string) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg"
                      style={{ background: "var(--pengu-surface)", color: "var(--pengu-heading)", border: "1px solid var(--pengu-border)" }}
                    >
                      <Check size={12} style={{ color: "#4A2E1F" }} />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-bold"
                    style={{ background: "#4A2E1F", color: "#ffffff" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#5A3A2B")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#4A2E1F")}
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-bold"
                    style={{ background: "transparent", color: "#4A2E1F", border: "1px solid #4A2E1F" }}
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>

              {/* Sub-services */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                {(service.subServices || []).map((sub: any) => (
                  <div
                    key={sub.name}
                    className="p-5 rounded-xl transition-all duration-200"
                    style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--pengu-card)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(74,46,31,0.1)";
                      (e.currentTarget as HTMLElement).style.borderColor = "#C4956A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--pengu-surface)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--pengu-border)";
                    }}
                  >
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: "var(--pengu-text)" }}>{sub.name}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          );
        })}
      </div>

      {/* CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 800 }}>
            Not Sure Where to Start?
          </h2>
          <p className="mb-8" style={{ color: "#C4956A" }}>
            Book a free 30-minute consultation and we'll map out the perfect digital strategy for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: "#C4956A", color: "#4A2E1F" }}
          >
            Book Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}