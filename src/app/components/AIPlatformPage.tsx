import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Bot, Zap, BarChart3, Globe, Mic, Brain, ArrowRight, Send, Sparkles, Play } from "lucide-react";
import { api } from "../utils/api";
const penguImg = "/penguimg.png";

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Chatbot Builder",
    desc: "Drag & drop chatbot builder powered by GPT-4. Train it with your website data, PDFs, and FAQs for perfectly accurate responses.",
    badge: "GPT-4 Powered",
    color: "#4A2E1F",
  },
  {
    icon: Brain,
    title: "AI Content Generator",
    desc: "Generate website copy, ads, social media posts, and marketing materials in seconds. Supports English, Bangla, and Arabic.",
    badge: "Multi-Language",
    color: "#5A3A2B",
  },
  {
    icon: Mic,
    title: "AI Voice Assistant",
    desc: "Voice-powered AI that understands commands like 'Show me last week's sales' or 'Send the weekly report'. Hands-free business control.",
    badge: "Voice Enabled",
    color: "#4A2E1F",
  },
  {
    icon: BarChart3,
    title: "AI Analytics Insights",
    desc: "AI explains your data in plain English. 'Sales dropped 15% because traffic decreased from Instagram' — real insights, not just numbers.",
    badge: "Smart Analytics",
    color: "#5A3A2B",
  },
  {
    icon: Zap,
    title: "Automation Engine",
    desc: "Visual workflow builder like Zapier, but smarter. AI-powered decision making that adapts to your business patterns.",
    badge: "AI-Powered",
    color: "#4A2E1F",
  },
  {
    icon: Globe,
    title: "API Integration Hub",
    desc: "Connect with 500+ tools including Stripe, PayPal, WhatsApp, Facebook, Google, and any custom API in minutes.",
    badge: "500+ Integrations",
    color: "#5A3A2B",
  },
];

const demoMessages = [
  { role: "user", content: "Show me this week's sales performance" },
  { role: "ai", content: "This week's sales: $24,580 (+18% vs last week)\n\nMonday: $3,200 — up\nTuesday: $4,100 — strong growth\nWednesday: $3,800 — steady\nThursday: $5,200 — best day\nFriday: $4,100 — up\n\nTop product: AI Dashboard Pro (47 sales)\nConversion rate: 3.8% (+0.5% vs last week)" },
  { role: "user", content: "Create a landing page for our new AI product" },
  { role: "ai", content: "Generating landing page for your AI product...\n\nI'll create a high-converting page with:\n- Hero section with value proposition\n- Feature showcase with animations\n- Social proof & testimonials\n- Pricing table\n- CTA sections\n\nPage generated! Preview is ready. Would you like me to publish it?" },
];

export function AIPlatformPage() {
  const [chatMessages, setChatMessages] = useState(demoMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.get('settings').then(setSettings).catch(console.error);
  }, []);

  const videoUrl = settings.aiPlatformDemoVideoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  // Helper to convert YouTube URL to Embed URL
  const getEmbedUrl = (url: string) => {
    try {
      let videoId = "";
      if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("embed/")) {
        return url;
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) {
      return url;
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = { role: "user", content: inputValue };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        role: "ai",
        content: `Processing your request: "${inputValue.slice(0, 40)}..."\n\nPengu AI is analyzing your business data and generating the optimal response. This is a demo — in your actual account, I'll have full access to your business data, CRM, and analytics to give you precise answers.`,
      };
      setChatMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #FDF8F5 0%, #ffffff 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full mb-4"
                style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}
              >
                <Sparkles size={14} style={{ color: "#C4956A" }} />
                AI Platform
              </span>
              <h1 className="mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "#1a0f0a", lineHeight: 1.15 }}>
                Meet <span style={{ color: "#4A2E1F" }}>Pengu Brain</span> —
                <br />Your AI Business Engine
              </h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                The most advanced AI platform for business automation. Pengu Brain learns your business,
                handles operations, generates content, and gives you real-time intelligence — all from one dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white"
                  style={{ background: "#4A2E1F" }}
                >
                  Get Early Access <ArrowRight size={16} />
                </Link>
                <a
                  href="#demo"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200"
                  style={{ color: "#4A2E1F", border: "2px solid #4A2E1F" }}
                >
                  Try Live Demo
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-15"
                  style={{ background: "#4A2E1F", transform: "scale(0.9)" }}
                />
                <img
                  src={penguImg}
                  alt="Pengu AI"
                  className="relative z-10 w-64 drop-shadow-2xl"
                />
                {/* Stats around the image */}
                <div
                  className="absolute -top-4 -right-12 px-3 py-2 rounded-xl z-20"
                  style={{ background: "#4A2E1F", boxShadow: "0 4px 20px rgba(74,46,31,0.3)" }}
                >
                  <div className="text-xs" style={{ color: "#C4956A" }}>Tasks Automated</div>
                  <div className="font-bold text-white text-lg">1.2M+</div>
                </div>
                <div
                  className="absolute -bottom-4 -left-12 px-3 py-2 rounded-xl z-20"
                  style={{ background: "var(--pengu-card)", boxShadow: "0 4px 20px rgba(74,46,31,0.15)", border: "1px solid var(--pengu-border)" }}
                >
                  <div className="text-xs" style={{ color: "var(--pengu-muted)" }}>AI Accuracy</div>
                  <div className="font-bold text-lg" style={{ color: "#4A2E1F" }}>99.2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Pengu AI */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0f0a" }}>
            What is Pengu AI?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Pengu AI is the brain behind your business. It combines the power of large language models, 
            automation engines, and business intelligence into one unified platform that anyone can use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#ffffff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(74,46,31,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "#C4956A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FDF8F5";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,46,31,0.08)";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: feature.color }}
                >
                  <feature.icon size={20} style={{ color: "#C4956A" }} />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(74,46,31,0.08)", color: "#8B5E3C" }}
                >
                  {feature.badge}
                </span>
              </div>
              <h3 className="font-bold mb-2" style={{ color: "#1a0f0a" }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* View Demo Video Section */}
      <section id="demo-video" className="py-20 px-4" style={{ background: "var(--pengu-surface)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="premium-shimmer inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-4" 
                style={{ background: "rgba(74,46,31,0.1)", color: "#C4956A" }}>
              Experience the Future
            </h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6" style={{ color: "var(--pengu-heading)", fontFamily: "Outfit, sans-serif" }}>
              Watch Pengu AI in Action
            </h3>
            <p className="max-w-2xl mx-auto" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
              See how our AI Brain manages complex workflows, automates client communication, 
              and delivers deep business insights in real-time.
            </p>
          </div>

          <div className="relative group">
            {/* Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#4A2E1F] to-[#C4956A] rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4" 
                 style={{ borderColor: "var(--pengu-border-mid)", background: "#000" }}>
              <iframe
                src={getEmbedUrl(videoUrl)}
                title="Pengu AI Demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-10 opacity-60">
            <div className="flex items-center gap-2"><Play size={16} /> 4K Resolution</div>
            <div className="flex items-center gap-2"><Play size={16} /> Live UI Tour</div>
            <div className="flex items-center gap-2"><Play size={16} /> Feature Deep-dive</div>
          </div>
        </div>
      </section>

      {/* Live Demo Chat */}
      <section
        id="demo"
        style={{ background: "#4A2E1F" }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span
              className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(196,149,106,0.2)", color: "#C4956A", border: "1px solid rgba(196,149,106,0.3)" }}
            >
              <Bot size={14} />
              Live Demo
            </span>
            <h2 className="text-white" style={{ fontSize: "2rem", fontWeight: 800 }}>
              Chat with Pengu Brain
            </h2>
            <p className="mt-2" style={{ color: "#C4956A" }}>
              Try our AI assistant — ask anything about your business
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--pengu-card)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
          >
            {/* Chat header */}
            <div
              className="px-5 py-3 flex items-center gap-3"
              style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.1)" }}
            >
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium" style={{ color: "#4A2E1F" }}>Pengu Brain — AI Active</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-5 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-2 shrink-0"
                      style={{ background: "#4A2E1F" }}
                    >
                      <Bot size={16} style={{ color: "#C4956A" }} />
                    </div>
                  )}
                  <div
                    className="max-w-sm px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap"
                    style={{
                      background: msg.role === "user" ? "#4A2E1F" : "#FDF8F5",
                      color: msg.role === "user" ? "#ffffff" : "#1a0f0a",
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                    style={{ background: "#4A2E1F" }}
                  >
                    <Bot size={16} style={{ color: "#C4956A" }} />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{ background: "#FDF8F5", borderRadius: "18px 18px 18px 4px" }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{ background: "#8B5E3C", animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ borderTop: "1px solid rgba(74,46,31,0.1)" }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Pengu Brain anything... 'Show my sales this week', 'Create a landing page'"
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#1a0f0a" }}
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: "#4A2E1F" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#5A3A2B")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#4A2E1F")}
              >
                <Send size={16} style={{ color: "#C4956A" }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ background: "#FDF8F5" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0f0a" }}>
            Ready to Put AI to Work?
          </h2>
          <p className="mt-3 mb-8" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Join businesses already running on Pengu AI. Start free, scale as you grow.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white"
            style={{ background: "#4A2E1F" }}
          >
            Get Early Access <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}