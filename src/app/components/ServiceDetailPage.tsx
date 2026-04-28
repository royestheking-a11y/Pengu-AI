import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { 
  Globe, Smartphone, Bot, Zap, BarChart3, Palette, 
  Check, ArrowRight, ChevronRight, LayoutGrid, Sparkles 
} from "lucide-react";
import { api } from "../utils/api";

const serviceIconMap: Record<string, any> = {
  "🌐": Globe,
  "📱": Smartphone,
  "🤖": Bot,
  "⚡": Zap,
  "📊": BarChart3,
  "🎨": Palette,
};

export function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await api.get(`services/slug/${slug}`);
        setService(data);
      } catch (err) {
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#4A2E1F" }}>Service Not Found</h1>
          <Link to="/services" className="text-sm font-medium" style={{ color: "#C4956A" }}>
            View all services
          </Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = serviceIconMap[service.icon] || Globe;

  return (
    <div className="min-h-screen pt-20" style={{ background: "#FDF8F5" }}>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ background: "#ffffff", borderColor: "rgba(74,46,31,0.05)" }}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-xs font-medium" style={{ color: "#8B5E3C" }}>
            <Link to="/" className="hover:text-[#4A2E1F] transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/services" className="hover:text-[#4A2E1F] transition-colors">Services</Link>
            <ChevronRight size={10} />
            <span style={{ color: "#4A2E1F" }}>{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: "#4A2E1F" }}
                >
                  <ServiceIcon size={32} style={{ color: "#C4956A" }} />
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#FDF8F5", color: "#8B5E3C", border: "1px solid rgba(196,149,106,0.3)" }}>
                  {service.tagline?.toUpperCase() || 'CORE SERVICE'}
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-6" style={{ color: "#1a0f0a", lineHeight: 1.1 }}>
                {service.title}
              </h1>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#5A3A2B", opacity: 0.9 }}>
                {service.longDescription || service.description}
              </p>
            </div>
            
            <div className="lg:w-1/3">
              <div className="p-8 rounded-3xl" style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}>
                <h3 className="font-bold mb-4" style={{ color: "#4A2E1F" }}>Ready to start?</h3>
                <p className="text-sm mb-6" style={{ color: "#8B5E3C" }}>
                  Get a free consultation for your project and see how our AI solutions can help you scale.
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold transition-all duration-300"
                  style={{ background: "#4A2E1F", boxShadow: "0 8px 20px rgba(74,46,31,0.2)" }}
                >
                  Book a Consultation <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Detailed Features */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <LayoutGrid size={20} style={{ color: "#C4956A" }} />
                  <h2 className="text-2xl font-extrabold" style={{ color: "#1a0f0a" }}>Key Features</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(service.features || []).map((feature: string) => (
                    <div 
                      key={feature} 
                      className="p-5 rounded-2xl flex items-start gap-3 transition-all duration-300"
                      style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.06)" }}
                    >
                      <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(74,46,31,0.05)" }}>
                        <Check size={12} style={{ color: "#4A2E1F" }} />
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#1a0f0a" }}>{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles size={20} style={{ color: "#C4956A" }} />
                  <h2 className="text-2xl font-extrabold" style={{ color: "#1a0f0a" }}>Our Specialized Offerings</h2>
                </div>
                <div className="space-y-4">
                  {(service.subServices || []).map((sub: any) => (
                    <div 
                      key={sub.name}
                      className="p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300"
                      style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.06)" }}
                    >
                      <div className="flex-1">
                        <h4 className="font-bold mb-1" style={{ color: "#4A2E1F" }}>{sub.name}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>{sub.desc}</p>
                      </div>
                      <div className="shrink-0">
                        <Link to="/contact" className="text-xs font-bold flex items-center gap-1 group" style={{ color: "#C4956A" }}>
                          LEARN MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sidebar / Trust Elements */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl" style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}>
                <h3 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>Why Pengu for {service.title}?</h3>
                <ul className="space-y-4">
                  {[
                    "AI-driven optimization",
                    "Rapid deployment timeline",
                    "Enterprise-grade security",
                    "Dedicated support team"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#5A3A2B" }}>
                      <Check size={14} style={{ color: "#C4956A" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-video group">
                <img 
                  src={service.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1F]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold">{service.title} Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ background: "#4A2E1F" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-6">Transform Your Business with {service.title}</h2>
          <p className="text-lg mb-10" style={{ color: "rgba(196,149,106,0.9)" }}>
            Let our AI specialists build the infrastructure your business deserves.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-[#4A2E1F] font-black transition-all duration-300"
            style={{ background: "#C4956A" }}
          >
            Start Your Journey <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
