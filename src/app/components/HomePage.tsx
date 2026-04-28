import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowRight, Play, Check, Zap, Globe, Smartphone, Bot, BarChart3,
  Palette, Star, ChevronRight, Sparkles, Shield, Clock, HeadphonesIcon,
  TrendingUp, Users, Rocket, Search, Lock, Link2
} from "lucide-react";
const penguImg = "/penguimg.png";
import { getFromStorage } from "../hooks/useLocalStorage";
import { initialTestimonials, initialServices } from "../data/initialData";
import { motion } from "framer-motion";

const trustLogos = [
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Shopify_Logo.png" },
  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Zoom", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
  { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_with_text.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_logo.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
  { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
];

const whyPengu = [
  { icon: Rocket, title: "All-in-One Platform", desc: "No need for multiple agencies. Website, app, AI, automation — all in one place." },
  { icon: Bot, title: "AI-First Solutions", desc: "Every solution is powered by cutting-edge AI that learns and improves over time." },
  { icon: Zap, title: "Fast Delivery", desc: "We ship fast without compromising quality. Your MVP in days, not months." },
  { icon: Shield, title: "Long-term Support", desc: "We don't just build and leave. We're your digital partner for the long run." },
  { icon: TrendingUp, title: "Proven Results", desc: "Our clients see an average of 250% growth within 6 months of working with us." },
  { icon: Users, title: "Dedicated Team", desc: "A full team of AI specialists, developers, and designers working for your success." },
];

const features = [
  { icon: BarChart3, title: "Real-time Dashboard", desc: "Monitor all your business metrics in one beautiful, unified dashboard." },
  { icon: Search, title: "Analytics Tracking", desc: "Deep insights into user behavior, sales funnels, and growth opportunities." },
  { icon: Zap, title: "Automation Workflows", desc: "Build powerful automations that run your business while you sleep." },
  { icon: Link2, title: "API Integrations", desc: "Connect with 500+ tools including Stripe, PayPal, WhatsApp, and more." },
  { icon: Bot, title: "AI Assistant", desc: "Your smart AI assistant that manages tasks, generates content, and more." },
  { icon: Lock, title: "Enterprise Security", desc: "Bank-level encryption, role-based access, and automatic backups." },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    desc: "Perfect for small businesses",
    features: ["Business Website", "Basic SEO", "1 AI Chatbot", "5 Automation Flows", "Monthly Reports", "Email Support"],
    color: "#8B5E3C",
    popular: false,
  },
  {
    name: "Business",
    price: "$799",
    period: "/month",
    desc: "For growing companies",
    features: ["Website + Mobile App", "Advanced SEO", "5 AI Chatbots", "Unlimited Automations", "CRM System", "Real-time Analytics", "Priority Support"],
    color: "#4A2E1F",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full AI business engine",
    features: ["Full AI System", "SaaS Platform", "Custom Integrations", "White-label Solution", "Dedicated Account Manager", "24/7 Support", "Custom Analytics"],
    color: "#5A3A2B",
    popular: false,
  },
];

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "250%", label: "Avg. Revenue Growth" },
  { value: "24/7", label: "AI-Powered Support" },
];

import { api } from "../utils/api";

export function HomePage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tData, sData] = await Promise.all([
          api.get('testimonials'),
          api.get('services')
        ]);
        setTestimonials(tData.filter((t: any) => t.published));
        setServices(sData.filter((s: any) => s.active));
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const serviceIconMap: Record<string, any> = {
    "🌐": Globe, "📱": Smartphone, "🤖": Bot, "⚡": Zap, "📊": BarChart3, "🎨": Palette
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #4A2E1F, transparent)" }}
          />
          <div
            className="absolute bottom-20 -left-20 w-80 h-80 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #8B5E3C, transparent)" }}
          />
          {/* Floating dots */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 3,
                height: Math.random() * 6 + 3,
                background: "#C4956A",
                opacity: 0.3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
          {/* Premium Animated Glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, #C4956A, transparent)" }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.12, 0.08] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[140px]"
            style={{ background: "radial-gradient(circle, #4A2E1F, transparent)" }}
          />
          
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#4A2E1F 1px, transparent 1px), linear-gradient(90deg, #4A2E1F 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
                style={{ background: "var(--pengu-surface)", border: "1px solid #C4956A", color: "var(--pengu-heading)" }}
              >
                <Sparkles size={14} style={{ color: "#C4956A" }} />
                <span>AI-Powered Digital Solutions</span>
              </div>

              <h1
                className="mb-6 leading-tight"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  fontWeight: 800,
                  color: "var(--pengu-text)",
                  lineHeight: 1.15,
                }}
              >
                Build. Automate.{" "}
                <span style={{ color: "var(--pengu-heading)", position: "relative" }}>
                  Scale
                  <span
                    className="absolute bottom-0 left-0 w-full h-1 rounded-full"
                    style={{ background: "#C4956A", opacity: 0.6 }}
                  />
                </span>
                {" "}Your Business.
              </h1>

              <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                Websites, Apps, AI & Automation — All in One Platform.
                Pengu replaces multiple tools with one intelligent AI system that runs your business.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/contact"
                  className="relative group flex items-center gap-2 px-6 py-3.5 rounded-xl text-white transition-all duration-300 shadow-lg overflow-hidden"
                  style={{ background: "#4A2E1F", boxShadow: "0 4px 20px rgba(74,46,31,0.35)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(74,46,31,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(74,46,31,0.35)";
                  }}
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                  />
                  <Rocket size={18} className="relative z-10" />
                  <span className="relative z-10">Get Started Free</span>
                </Link>
                <Link
                  to="/ai-platform"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300"
                  style={{
                    color: "#4A2E1F",
                    border: "2px solid #4A2E1F",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#4A2E1F";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#4A2E1F";
                  }}
                >
                  <Play size={18} />
                  View Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "var(--pengu-heading)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--pengu-muted)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Pengu Image + UI Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              <div className="relative" style={{ isolation: "isolate" }}>
                {/* Glow behind pengu */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-20"
                  style={{ background: "#4A2E1F", transform: "scale(0.8) translateY(10%)" }}
                />
                <img
                  src={penguImg}
                  alt="Pengu AI"
                  className="w-full max-w-sm mx-auto drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 60px rgba(74,46,31,0.3))", position: "relative", zIndex: 1 }}
                />

                {/* Floating card 1 */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 left-4 md:-left-4 px-5 py-4 rounded-2xl z-50 backdrop-blur-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 10px 40px rgba(74,46,31,0.12)",
                    border: "1px solid rgba(196,149,106,0.2)",
                    zIndex: 100,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "#4A2E1F" }}>Live Performance</span>
                  </div>
                  <div className="text-xl font-black" style={{ color: "#1a0f0a" }}>+247% ROI</div>
                  <div className="text-[10px] mt-1 opacity-60" style={{ color: "#5A3A2B" }}>Average client growth</div>
                </motion.div>

                {/* Floating card 2 */}
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 right-4 md:-right-4 px-5 py-4 rounded-2xl z-50 backdrop-blur-md"
                  style={{
                    background: "rgba(74, 46, 31, 0.9)",
                    boxShadow: "0 15px 50px rgba(74,46,31,0.3)",
                    border: "1px solid rgba(196,149,106,0.3)",
                    zIndex: 100,
                  }}
                >
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1.5" style={{ color: "#C4956A" }}>Active Workflows</div>
                  <div className="text-xl font-black text-white">1,247 <span className="text-xs font-medium opacity-60">Tasks</span></div>
                  <div className="flex gap-1.5 mt-2.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-1.5 rounded-full" style={{ background: i < 4 ? "#C4956A" : "rgba(196,149,106,0.2)" }} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ background: "var(--pengu-surface)", borderTop: "1px solid var(--pengu-border)", borderBottom: "1px solid var(--pengu-border)", overflow: "hidden" }}>
        <div className="py-10">
          <p className="text-center text-sm mb-10" style={{ color: "var(--pengu-muted)" }}>
            Trusted by forward-thinking businesses worldwide
          </p>
          
          <div className="relative flex overflow-hidden">
            <motion.div 
              className="flex items-center gap-16 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {/* Double the logos for seamless loop */}
              {[...trustLogos, ...trustLogos].map((logo, idx) => (
                <div 
                  key={`${logo.name}-${idx}`} 
                  className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110"
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://placehold.co/200x80/4A2E1F/C4956A?text=${logo.name}`;
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Core Services
          </span>
          <h2 className="mt-4 mb-3" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--pengu-text)" }}>
            Everything Your Business Needs
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
            From idea to scale — we handle every layer of your digital infrastructure with AI-powered precision.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service: any, i: number) => {
            const ServiceIcon = serviceIconMap[service.icon] || Globe;
            return (
            <div
              key={service._id}
              className="group rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                background: "var(--pengu-card)",
                border: "1px solid var(--pengu-border)",
                boxShadow: "0 2px 12px rgba(74,46,31,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(74,46,31,0.15)";
                (e.currentTarget as HTMLElement).style.borderColor = "#C4956A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(74,46,31,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--pengu-border)";
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={service.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ background: "#4A2E1F", marginTop: "-40px", position: "relative", zIndex: 1, border: "3px solid var(--pengu-card)" }}
                >
                  <ServiceIcon size={22} style={{ color: "#C4956A" }} />
                </div>
              <h3 className="font-bold mb-2" style={{ color: "var(--pengu-text)" }}>{service.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {(service.features || []).slice(0, 3).map((f: string) => (
                  <span key={f} className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)" }}>
                    {f}
                  </span>
                ))}
              </div>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium transition-colors duration-150"
                style={{ color: "#4A2E1F" }}
              >
                Learn more <ChevronRight size={14} />
              </Link>
            </div>
            </div>
            );
          })}
        </motion.div>
      </section>

      {/* WHY PENGU */}
      <section style={{ background: "#4A2E1F" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "rgba(196,149,106,0.2)", color: "#C4956A", border: "1px solid rgba(196,149,106,0.3)" }}>
              Why Choose Pengu
            </span>
            <h2 className="mt-4 mb-3 text-white" style={{ fontSize: "2.2rem", fontWeight: 800 }}>
              The Smart Choice for Modern Business
            </h2>
            <p style={{ color: "#C4956A" }}>
              We're not just a service provider — we're your AI-powered business partner.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyPengu.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(196,149,106,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,149,106,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,149,106,0.2)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(196,149,106,0.2)" }}
                >
                  <item.icon size={20} style={{ color: "#C4956A" }} />
                </div>
                <h3 className="font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#C4956A", opacity: 0.9 }}>{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
              Platform Features
            </span>
            <h2 className="mt-4 mb-4" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--pengu-text)" }}>
              One Platform.
              <br />
              <span style={{ color: "var(--pengu-heading)" }}>Infinite Possibilities.</span>
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
              The Pengu platform brings together AI, automation, analytics, and business tools 
              into a single, powerful system that grows with your business.
            </p>
            <Link
              to="/ai-platform"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-200"
              style={{ background: "#4A2E1F" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#5A3A2B")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#4A2E1F")}
            >
              Explore AI Platform <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-xl transition-all duration-200"
                style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--pengu-card)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(74,46,31,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--pengu-surface)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "rgba(74,46,31,0.08)" }}
                >
                  <feature.icon size={18} style={{ color: "#4A2E1F" }} />
                </div>
                <h4 className="font-semibold mb-1 text-sm" style={{ color: "var(--pengu-text)" }}>{feature.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING PREVIEW */}
      <section style={{ background: "var(--pengu-surface)" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
              Pricing
            </span>
            <h2 className="mt-4 mb-3" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--pengu-text)" }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
              Choose the plan that fits your business. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: plan.popular ? "#4A2E1F" : "var(--pengu-card)",
                  border: plan.popular ? "none" : "1px solid var(--pengu-border)",
                  boxShadow: plan.popular ? "0 20px 60px rgba(74,46,31,0.3)" : "0 2px 12px rgba(74,46,31,0.06)",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#C4956A", color: "#4A2E1F" }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold mb-1" style={{ color: plan.popular ? "#C4956A" : "var(--pengu-muted)" }}>
                  {plan.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: plan.popular ? "rgba(196,149,106,0.7)" : "var(--pengu-muted)", opacity: 0.8 }}>
                  {plan.desc}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-black" style={{ color: plan.popular ? "#ffffff" : "var(--pengu-text)" }}>
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: plan.popular ? "#C4956A" : "var(--pengu-muted)" }}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={14} style={{ color: plan.popular ? "#C4956A" : "#4A2E1F" }} />
                      <span style={{ color: plan.popular ? "rgba(255,255,255,0.9)" : "var(--pengu-heading)" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="block text-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: plan.popular ? "#C4956A" : "#4A2E1F",
                    color: plan.popular ? "#4A2E1F" : "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
              style={{ color: "#4A2E1F" }}
            >
              View Full Pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Testimonials
          </span>
          <h2 className="mt-4 mb-3" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--pengu-text)" }}>
            What Our Clients Say
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t: any, i: number) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{
                background: i === activeTestimonial % testimonials.length ? "#4A2E1F" : "var(--pengu-card)",
                border: "1px solid var(--pengu-border)",
                boxShadow: "0 2px 12px rgba(74,46,31,0.06)",
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="#C4956A" style={{ color: "#C4956A" }} />
                ))}
              </div>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: i === activeTestimonial % testimonials.length ? "rgba(255,255,255,0.9)" : "var(--pengu-heading)" }}
              >
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "#C4956A", color: "#4A2E1F" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: i === activeTestimonial % testimonials.length ? "#ffffff" : "var(--pengu-text)" }}>
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: "#C4956A" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
            style={{ background: "rgba(196,149,106,0.2)", color: "#C4956A", border: "1px solid rgba(196,149,106,0.3)" }}
          >
            <Sparkles size={14} />
            Ready to Transform?
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "2.5rem", fontWeight: 800 }}
          >
            Let Pengu Build Your Digital Future.
          </h2>
          <p className="mb-8 text-lg" style={{ color: "#C4956A" }}>
            "We don't just build websites… We build systems that run your business."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
              style={{ background: "#C4956A", color: "#4A2E1F" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(196,149,106,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Rocket size={20} /> Start Now
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
              style={{ color: "#ffffff", border: "2px solid rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <HeadphonesIcon size={20} /> Free Consultation
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}