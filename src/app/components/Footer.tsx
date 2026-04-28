import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram,
  ArrowRight, Globe, Sparkles, Shield, Heart
} from "lucide-react";
import { api } from "../utils/api";
import { toast } from "sonner";

const penguLogo = "/pengulogo.png";

const services = [
  { label: "Website Development", href: "/services" },
  { label: "Mobile App Development", href: "/services" },
  { label: "AI & Chatbots", href: "/services" },
  { label: "Automation Systems", href: "/services" },
  { label: "SaaS & Dashboards", href: "/services" },
  { label: "Branding & Design", href: "/services" },
];

const company = [
  { label: "About Pengu", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Workflow", href: "/workflow" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "AI Platform", href: "/ai-platform" },
  { label: "Partner Program", href: "/partner" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.get('settings').then(setSettings).catch(console.error);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('subscribers', { email });
      setSubscribed(true);
      setEmail("");
      toast.success("Subscribed to newsletter!");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err: any) {
      if (err.message === "Already subscribed") {
        toast.info("You are already subscribed!");
      } else {
        toast.error("Subscription failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer>
      {/* Top decorative bar */}
      <div style={{ background: "linear-gradient(90deg, #4A2E1F 0%, #C4956A 50%, #4A2E1F 100%)", height: "3px" }} />

      {/* Main Footer — white/cream background */}
      <div style={{ background: "#FDF8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
                <img 
                  src={settings?.siteLogo || penguLogo} 
                  alt={settings?.siteName || "Pengu"} 
                  className="h-14 w-auto" 
                  style={{ filter: "none" }} 
                />
              </Link>

              <p className="text-sm mb-6 leading-relaxed max-w-xs" style={{ color: "#8B5E3C" }}>
                The all-in-one AI platform that replaces multiple tools with one intelligent system.
                We build, automate, and scale your digital business — no humans required.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: Shield, label: "SOC2 Compliant" },
                  { icon: Globe, label: "Global Infrastructure" },
                  { icon: Sparkles, label: "AI-Powered" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                    style={{ background: "rgba(74,46,31,0.07)", color: "#8B5E3C", border: "1px solid rgba(74,46,31,0.1)" }}
                  >
                    <Icon size={11} style={{ color: "#C4956A" }} />
                    {label}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-2.5">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(74,46,31,0.08)", color: "#8B5E3C" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#4A2E1F";
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(74,46,31,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "#8B5E3C";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold mb-5 pb-2 relative" style={{ color: "#4A2E1F" }}>
                Services
                <span
                  className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full"
                  style={{ background: "#C4956A" }}
                />
              </h4>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm transition-all duration-150 flex items-center gap-1.5 group"
                      style={{ color: "#8B5E3C" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4A2E1F")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B5E3C")}
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0 transition-all duration-150"
                        style={{ background: "#C4956A" }}
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold mb-5 pb-2 relative" style={{ color: "#4A2E1F" }}>
                Company
                <span
                  className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full"
                  style={{ background: "#C4956A" }}
                />
              </h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm transition-all duration-150 flex items-center gap-1.5"
                      style={{ color: "#8B5E3C" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4A2E1F")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B5E3C")}
                    >
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#C4956A" }} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-sm font-bold mb-5 pb-2 relative" style={{ color: "#4A2E1F" }}>
                Get in Touch
                <span
                  className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full"
                  style={{ background: "#C4956A" }}
                />
              </h4>
              <ul className="space-y-3 mb-7">
                {[
                  { icon: Mail, text: settings?.email || "pengui.org@gmail.com" },
                  { icon: Phone, text: settings?.phone || "0134-3042761" },
                  { icon: MapPin, text: settings?.location || "221B Baker Street, London | Dhaka, Bangladesh" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#4A2E1F" }}
                    >
                      <Icon size={13} style={{ color: "#C4956A" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#8B5E3C" }}>{text}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-sm font-bold mb-3" style={{ color: "#4A2E1F" }}>
                Newsletter
              </h4>
              {subscribed ? (
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
                  style={{ background: "rgba(74,46,31,0.07)", border: "1px solid rgba(74,46,31,0.1)", color: "#4A2E1F" }}
                >
                  <Sparkles size={14} style={{ color: "#C4956A" }} />
                  Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full text-sm px-3 py-2.5 rounded-xl outline-none"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(74,46,31,0.15)",
                      color: "#1a0f0a",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C4956A")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(74,46,31,0.15)")}
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
                    style={{ background: "#4A2E1F" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#5A3A2B")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#4A2E1F")}
                  >
                    Subscribe <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ height: "1px", background: "rgba(74,46,31,0.1)" }} />
        </div>

        {/* Bottom credits within light section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs flex items-center gap-1.5" style={{ color: "#8B5E3C" }}>
            <Heart size={11} style={{ color: "#C4956A" }} fill="#C4956A" />
            Built by AI, for the future · © {new Date().getFullYear()} Pengu AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-xs transition-colors duration-150"
                style={{ color: "#8B5E3C" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4A2E1F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B5E3C")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Deep brown bottom accent strip */}
      <div style={{ background: "#4A2E1F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center">
          <p className="text-xs" style={{ color: "rgba(196,149,106,0.7)" }}>
            Pengu AI — No-Human Intelligence. 100% Automated. Enterprise-Grade.
          </p>
        </div>
      </div>
    </footer>
  );
}
