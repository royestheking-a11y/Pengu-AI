import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import { api } from "../utils/api";
import { toast } from "sonner";
import { SEO } from "./SEO";

const services = [
  "Website Development",
  "Mobile App Development",
  "AI & Chatbots",
  "Automation Systems",
  "SaaS & Dashboards",
  "Branding & Design",
  "Full Platform",
  "Other",
];

const budgets = [
  "Under $500",
  "$500 - $1,500",
  "$1,500 - $5,000",
  "$5,000 - $15,000",
  "$15,000+",
  "Let's discuss",
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.get('settings').then(setSettings).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    try {
      await api.post('messages', form);
      setSubmitted(true);
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      <SEO 
        title="Contact Us"
        description="Get a free project consultation from the world's first 100% automated AI company. Let's build your enterprise-grade digital future today."
        keywords="Contact Pengu AI, AI Consultation, Business Automation"
      />
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "linear-gradient(135deg, #FDF8F5 0%, #ffffff 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Contact Us
          </span>
          <h1 className="mt-4 mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "#1a0f0a", lineHeight: 1.15 }}>
            Let's Build Something <span style={{ color: "#4A2E1F" }}>Amazing</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Tell us about your project and we'll get back to you within 24 hours with a customized plan.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-2" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1a0f0a" }}>
                Get in Touch
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                We're a no-human AI company, but we love connecting with humans. Our AI team reviews every inquiry.
              </p>
            </div>

            {[
              { Icon: Mail, label: "Email", value: settings?.email || "pengui.org@gmail.com", sub: "We reply within 24 hours" },
              { Icon: Phone, label: "Phone/WhatsApp", value: settings?.phone || "0134-3042761", sub: "Available 24/7" },
              { Icon: MapPin, label: "Location", value: settings?.location || "221B Baker Street, London | Dhaka, Bangladesh", sub: "Global Infrastructure" },
              { Icon: Clock, label: "Response Time", value: "< 24 hours", sub: "Usually within 2 hours" },
            ].map(({ Icon, label, value, sub }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#4A2E1F" }}
                >
                  <Icon size={18} style={{ color: "#C4956A" }} />
                </div>
                <div>
                  <div className="text-xs font-medium mb-0.5" style={{ color: "#8B5E3C" }}>{label}</div>
                  <div className="font-semibold text-sm" style={{ color: "#1a0f0a" }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#8B5E3C" }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={settings?.whatsapp || "https://wa.me/message/CSYKXUISDAIVI1"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200"
              style={{
                background: "#25D366",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <MessageCircle size={22} />
              <div>
                <div className="font-semibold text-sm">Chat on WhatsApp</div>
                <div className="text-xs opacity-90">Instant response from our AI assistant</div>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl"
                style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "#4A2E1F" }}
                >
                  <CheckCircle size={32} style={{ color: "#C4956A" }} />
                </div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a0f0a" }}>
                  Message Received!
                </h2>
                <p className="mt-3 mb-6 max-w-md" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                  Thank you! We've received your inquiry and will get back to you within 24 hours with a customized proposal.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" }); }}
                  className="px-6 py-2.5 rounded-xl text-white text-sm"
                  style={{ background: "#4A2E1F" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl"
                style={{ background: "var(--pengu-card)", border: "1px solid var(--pengu-border)", boxShadow: "0 4px 24px rgba(74,46,31,0.06)" }}
              >
                <h2 className="mb-6" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--pengu-text)" }}>
                  Free Project Consultation
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { key: "name", label: "Full Name *", placeholder: "John Smith", type: "text" },
                    { key: "email", label: "Email Address *", placeholder: "john@company.com", type: "email" },
                    { key: "phone", label: "Phone/WhatsApp", placeholder: "+1 (555) 000-0000", type: "tel" },
                    { key: "company", label: "Company Name", placeholder: "Your Company", type: "text" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full text-sm px-4 py-2.5 rounded-xl outline-none transition-all duration-200"
                        style={{
                          background: "#FDF8F5",
                          border: "1px solid rgba(74,46,31,0.15)",
                          color: "#1a0f0a",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#4A2E1F")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(74,46,31,0.15)")}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>
                      Service Interested In
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl outline-none appearance-none transition-all duration-200"
                      style={{
                        background: "#FDF8F5",
                        border: "1px solid rgba(74,46,31,0.15)",
                        color: form.service ? "#1a0f0a" : "#8B5E3C",
                      }}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>
                      Budget Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl outline-none appearance-none transition-all duration-200"
                      style={{
                        background: "#FDF8F5",
                        border: "1px solid rgba(74,46,31,0.15)",
                        color: form.budget ? "#1a0f0a" : "#8B5E3C",
                      }}
                    >
                      <option value="">Select budget</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>
                    Project Details *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={5}
                    className="w-full text-sm px-4 py-3 rounded-xl outline-none resize-none transition-all duration-200"
                    style={{
                      background: "#FDF8F5",
                      border: "1px solid rgba(74,46,31,0.15)",
                      color: "#1a0f0a",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#4A2E1F")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(74,46,31,0.15)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold transition-all duration-200"
                  style={{ background: "#4A2E1F" }}
                  onMouseEnter={(e) => !loading && ((e.currentTarget as HTMLElement).style.background = "#5A3A2B")}
                  onMouseLeave={(e) => !loading && ((e.currentTarget as HTMLElement).style.background = "#4A2E1F")}
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message — Get Free Consultation
                    </>
                  )}
                </button>
                <p className="text-center text-xs mt-3" style={{ color: "#8B5E3C" }}>
                  No spam. We reply within 24 hours. 100% free consultation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}