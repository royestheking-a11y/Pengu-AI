import { motion } from "framer-motion";
import { 
  Rocket, Bot, Cpu, MessageSquare, FileText, GraduationCap, 
  Chrome, Layout, ArrowRight, ExternalLink, Sparkles, Shield,
  CheckCircle2, AppWindow, Globe, Users, Zap, Search, Brain,
  Headphones, BarChart
} from "lucide-react";
import { Link } from "react-router";

const products = [
  {
    id: "flagship",
    title: "Pengu — Autonomous AI Career Agency & Academic OS",
    type: "AI Ecosystem",
    status: "Flagship Platform",
    desc: "This is not just one app. This is your AI company system. An integrated career and education operating system designed for the future workforce.",
    features: ["AI Workforce", "AI Automation", "Career + Education OS"],
    color: "#4A2E1F",
    icon: Layout,
    link: "http://pengui.tech/"
  },
  {
    id: "copilot",
    title: "Pengu Co-Pilot",
    type: "Autonomous AI Career Agency",
    status: "Active",
    desc: "Automates job searching and applications using a specialized team of AI agents that handle every step of your career journey.",
    agentTeam: [
      { name: "Team Lead", role: "Coordination" },
      { name: "CEO", role: "Strategy" },
      { name: "PENGURI", role: "Search Agent" },
      { name: "RUBI", role: "Optimization" },
      { name: "PANDU", role: "Automation" },
      { name: "Chairman", role: "Governance" },
      { name: "RuBI HR", role: "Compliance" }
    ],
    features: ["Job market scanning", "ATS optimization", "CV generation", "Cover letter creation", "Application automation", "Interview simulation"],
    tech: ["AI agents", "Browser automation", "Resume optimization"],
    color: "#C4956A",
    icon: Rocket
  },
  {
    id: "core-ai",
    title: "Pengu AI",
    type: "Core AI Engine",
    status: "Active",
    desc: "The powerhouse behind the entire Pengu ecosystem. Provides advanced intelligence and decision-making capabilities to all modules.",
    features: ["Chat AI", "Voice AI", "Automation AI", "Decision AI"],
    color: "#8B5E3C",
    icon: Brain
  },
  {
    id: "voca",
    title: "Voca Messenger",
    type: "Messaging Application",
    status: "Built / Prototype",
    desc: "Real-time communication system with a professional interface for team collaboration and customer engagement.",
    features: ["Real-time chat", "Messaging interface", "Communication system"],
    color: "#5A3A2B",
    icon: MessageSquare
  },
  {
    id: "elevate",
    title: "Elevate CV",
    type: "Resume Builder",
    status: "Planned",
    desc: "AI-powered CV generator designed to pass through ATS filters and catch the eye of recruiters with professional templates.",
    features: ["Resume creation", "ATS optimization", "Template system"],
    color: "#C4956A",
    icon: FileText,
    link: "https://elevatecvs.vercel.app/"
  },
  {
    id: "admission",
    title: "Admission Bondhu",
    type: "Admission Assistant",
    status: "Planned",
    desc: "A dedicated assistant to help students navigate the complex world of university applications with ease and precision.",
    features: ["University suggestions", "Application tracking", "Deadline reminders"],
    color: "#4A2E1F",
    icon: GraduationCap,
    link: "https://admissionbondu.me/"
  },
  {
    id: "edu",
    title: "Pengu Education System",
    type: "Academic Platform",
    status: "Core Module",
    desc: "Connects students with academic experts globally to provide high-quality tutoring and study management support.",
    features: ["Academic help system", "Assignment support", "Tutor marketplace", "Study management"],
    color: "#8B5E3C",
    icon: GraduationCap
  },
  {
    id: "extension",
    title: "Pengu Chrome Extension",
    type: "Browser Tool",
    status: "Active",
    desc: "Automatically capture job leads and streamline your application process directly from your browser.",
    features: ["Job scraping", "Data extraction", "Auto submission"],
    platform: "Chrome browser",
    color: "#C4956A",
    icon: Chrome
  }
];

export function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "var(--pengu-bg)" }}>
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
            style={{ background: "var(--pengu-surface)", border: "1px solid #C4956A", color: "var(--pengu-heading)" }}
          >
            <Sparkles size={14} style={{ color: "#C4956A" }} />
            <span>The Pengu Ecosystem</span>
          </div>
          <h1
            className="mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              color: "var(--pengu-text)",
              lineHeight: 1.1,
            }}
          >
            AI-Powered <span style={{ color: "var(--pengu-heading)" }}>Products</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
            Explore our comprehensive suite of AI solutions designed to automate your career, 
            education, and business operations.
          </p>
        </motion.div>
      </section>

      {/* Flagship Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {products.filter(p => p.id === "flagship").map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 lg:p-16 border"
            style={{ 
              background: "linear-gradient(135deg, #4A2E1F 0%, #1a0f0a 100%)",
              borderColor: "rgba(196,149,106,0.3)",
              boxShadow: "var(--pengu-shadow-premium)"
            }}
          >
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase" style={{ background: "#C4956A", color: "#4A2E1F" }}>
                    {product.status}
                  </span>
                  <span className="text-sm font-medium text-[#C4956A]">{product.type}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {product.title}
                </h2>
                <p className="text-lg text-[#C4956A] mb-8 leading-relaxed opacity-90">
                  {product.desc}
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  {product.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80">
                      <CheckCircle2 size={18} className="text-[#C4956A]" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C4956A] text-[#4A2E1F] font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                >
                  Visit Platform <ExternalLink size={18} />
                </a>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#C4956A] blur-[100px] opacity-20 animate-pulse" />
                  <product.icon size={300} className="text-[#C4956A]/20 relative z-10" />
                </div>
              </div>
            </div>
            
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ 
                backgroundImage: "radial-gradient(#C4956A 1px, transparent 1px)", 
                backgroundSize: "30px 30px" 
              }} 
            />
          </motion.div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => p.id !== "flagship").map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="premium-card p-8 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ background: `${product.color}15`, border: `1px solid ${product.color}30` }}
                >
                  <product.icon size={28} style={{ color: product.color }} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-1" style={{ color: "var(--pengu-muted)" }}>
                    {product.status}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ background: "var(--pengu-surface)", color: product.color }}>
                    {product.type}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-[#C4956A] transition-colors duration-300" style={{ color: "var(--pengu-text)" }}>
                {product.title}
              </h3>
              
              <p className="text-sm mb-6 leading-relaxed flex-1" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                {product.desc}
              </p>

              {product.agentTeam && (
                <div className="mb-6 p-4 rounded-xl" style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60" style={{ color: "var(--pengu-muted)" }}>Agent Team</p>
                  <div className="flex flex-wrap gap-2">
                    {product.agentTeam.map(agent => (
                      <span key={agent.name} className="text-[10px] px-2 py-1 rounded-full bg-white/50 border border-black/5 shadow-sm" title={agent.role}>
                        {agent.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-8">
                {product.features.slice(0, 4).map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--pengu-text-2)" }}>
                    <Zap size={12} style={{ color: product.color }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {product.link ? (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 text-white shadow-lg hover:shadow-xl active:scale-95"
                  style={{ background: product.color }}
                >
                  Explore <ExternalLink size={16} />
                </a>
              ) : (
                <div className="mt-auto py-3 text-center text-xs font-bold opacity-40 uppercase tracking-widest">
                  Coming Soon
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-12 md:p-20 rounded-[3rem] relative overflow-hidden"
          style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8" style={{ color: "var(--pengu-text)" }}>
              Ready to power up <br /> with <span style={{ color: "var(--pengu-heading)" }}>Pengu?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-10 py-4 rounded-2xl bg-[#4A2E1F] text-white font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/ai-platform"
                className="px-10 py-4 rounded-2xl border-2 border-[#4A2E1F] text-[#4A2E1F] font-bold text-lg hover:bg-[#4A2E1F] hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4956A] opacity-[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A2E1F] opacity-[0.03] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </section>
    </div>
  );
}
