import { useState } from "react";
import { 
  Users, DollarSign, Zap, Rocket, CheckCircle2, 
  MessageSquare, Globe, Smartphone, Bot, BarChart3, 
  Target, Briefcase, TrendingUp, HandshakeIcon, ShieldCheck,
  SmartphoneIcon, Laptop, Palette, Search, Megaphone,
  Store, Building2, GraduationCap, Utensils, HeartPulse
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { api } from "../utils/api";
import { toast } from "sonner";

const targetIndustries = [
  { icon: Utensils, name: "Restaurants" },
  { icon: HeartPulse, name: "Clinics & Hospitals" },
  { icon: GraduationCap, name: "Schools & Coaching" },
  { icon: Store, name: "Fashion & Shops" },
  { icon: Building2, name: "Real Estate" },
  { icon: Globe, name: "Travel Agencies" },
  { icon: SmartphoneIcon, name: "Ecommerce" },
  { icon: Briefcase, name: "Local Businesses" },
];

const partnerServices = [
  { icon: Globe, name: "Website Development" },
  { icon: Smartphone, name: "App Development" },
  { icon: Bot, name: "AI Chatbots" },
  { icon: Zap, name: "Business Automation" },
  { icon: Laptop, name: "SaaS & Software" },
  { icon: Palette, name: "Branding & Design" },
  { icon: Search, name: "SEO Optimization" },
  { icon: Megaphone, name: "Digital Marketing" },
];

export function PartnerProgramPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    profession: "",
    experience: "",
    services: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('applications', {
        ...formData,
        jobTitle: "Growth Partner",
        resumeUrl: "N/A", // Not required for partner program
      });
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--pengu-bg)" }}>
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-[#4A2E1F]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl bg-[#C4956A]" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                  style={{ background: "var(--pengu-surface)", color: "#C4956A", border: "1px solid rgba(196,149,106,0.3)" }}>
              <DollarSign size={14} />
              Earn Commission with Every Lead
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ color: "var(--pengu-text)", fontFamily: "Outfit, sans-serif" }}>
              Become a Pengu <span style={{ color: "#C4956A" }}>Growth Partner</span> <br />
              & Earn From Every Project
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl mb-10 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
              No coding. No investment. No office required. Just connect businesses with Pengu 
              and earn high commissions from websites, apps, AI systems, and digital solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a 
                href="#apply-form"
                className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ background: "#4A2E1F", color: "white" }}
              >
                Start Earning Today
              </a>
              <a 
                href="https://wa.me/yournumber"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ border: "2px solid #4A2E1F", color: "#4A2E1F" }}
              >
                <MessageSquare size={20} /> Talk on WhatsApp
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium" style={{ color: "var(--pengu-muted)" }}>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} /> No investment</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} /> No coding required</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} /> Work from anywhere</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#4A2E1F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>How You Make Money</h2>
            <p style={{ color: "#C4956A" }}>The simplest way to build a high-income sales career.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Find Leads", desc: "Find a business that needs a website, app, software, or AI chatbot." },
              { step: "02", title: "Connect Us", desc: "Introduce the business owner to the Pengu team." },
              { step: "03", title: "We Close", desc: "Our experts handle meetings, proposals, and development." },
              { step: "04", title: "Get Paid", desc: "When the client pays, your commission is sent instantly." },
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-4xl font-black mb-4 opacity-20">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-sm opacity-70">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMISSION EXAMPLE */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--pengu-text)", fontFamily: "Outfit, sans-serif" }}>Potential Earnings</h2>
            <p style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>The bigger the project, the bigger your reward.</p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: "var(--pengu-border)", background: "white" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "var(--pengu-surface)" }}>
                    <th className="px-6 py-4 font-bold" style={{ color: "var(--pengu-heading)" }}>Project Type</th>
                    <th className="px-6 py-4 font-bold text-right" style={{ color: "var(--pengu-heading)" }}>Project Value</th>
                    <th className="px-6 py-4 font-bold text-right" style={{ color: "#C4956A" }}>Your Earning</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-t" style={{ borderColor: "var(--pengu-border)" }}>
                  {[
                    { type: "Business Website", val: "$300", earn: "$30–$60" },
                    { type: "Ecommerce Website", val: "$700", earn: "$70–$140" },
                    { type: "Mobile App", val: "$1,500", earn: "$150–$300" },
                    { type: "AI Chatbot", val: "$800", earn: "$80–$160" },
                    { type: "Full Software System", val: "$3,000+", earn: "$300–$600+" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium" style={{ color: "var(--pengu-text)" }}>{row.type}</td>
                      <td className="px-6 py-4 text-right" style={{ color: "var(--pengu-text-2)" }}>{row.val}</td>
                      <td className="px-6 py-4 text-right font-bold" style={{ color: "#4A2E1F" }}>{row.earn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 text-center text-sm italic" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)" }}>
              "One successful project can pay more than a small monthly job. No earning limits."
            </div>
          </div>
        </div>
      </section>

      {/* WHY EASY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--pengu-surface)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--pengu-text)", fontFamily: "Outfit, sans-serif" }}>
              You Don’t Need to <br /> Build Anything
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
              Pengu provides all the technical muscle. You only focus on finding interested clients and building connections.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Website Portfolio", "Service Details", "Proposal Support", 
                "Pricing Guidance", "Meeting Support", "Full Tech Team",
                "Project Delivery", "Post-Launch Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ShieldCheck size={18} style={{ color: "#C4956A" }} />
                  <span className="font-medium" style={{ color: "var(--pengu-heading)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#4A2E1F] p-8 rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp /> Motivation
            </h3>
            <div className="space-y-6">
              <p className="text-lg opacity-80">"Even 1–2 successful projects per month can create strong income."</p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold mb-2">Example Scenario:</div>
                <ul className="space-y-2 opacity-70 text-sm">
                  <li>• Bring 2 Small Websites: $120</li>
                  <li>• Bring 1 App Project: $300</li>
                  <li className="pt-2 border-t border-white/20 font-bold text-white text-base">Total Monthly Earn: $420+</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES & SERVICES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2" style={{ color: "var(--pengu-text)", fontFamily: "Outfit, sans-serif" }}>
              <Target style={{ color: "#C4956A" }} /> Where to Find Clients?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {targetIndustries.map((ind, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--pengu-border)", background: "white" }}>
                  <div className="p-2 rounded-lg" style={{ background: "var(--pengu-surface)" }}>
                    <ind.icon size={18} style={{ color: "#4A2E1F" }} />
                  </div>
                  <span className="font-medium text-sm" style={{ color: "var(--pengu-text)" }}>{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2" style={{ color: "var(--pengu-text)", fontFamily: "Outfit, sans-serif" }}>
              <Rocket style={{ color: "#C4956A" }} /> What Can You Sell?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {partnerServices.map((ser, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--pengu-border)", background: "white" }}>
                  <div className="p-2 rounded-lg" style={{ background: "var(--pengu-surface)" }}>
                    <ser.icon size={18} style={{ color: "#4A2E1F" }} />
                  </div>
                  <span className="font-medium text-sm" style={{ color: "var(--pengu-text)" }}>{ser.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS & RULES */}
      <section className="py-20 px-4" style={{ background: "var(--pengu-surface)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="p-8 rounded-3xl bg-white shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: "var(--pengu-text)" }}>
              <Users style={{ color: "#C4956A" }} /> What We Expect
            </h3>
            <ul className="space-y-4">
              {[
                "Good communication skills",
                "Honest client handling",
                "Basic understanding of digital services",
                "Ability to find business owners",
                "Regular follow-up with leads",
                "Professional behavior"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--pengu-text-2)" }}>
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#C4956A" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-white shadow-xl border-l-4 border-red-500">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: "var(--pengu-text)" }}>
              <HandshakeIcon style={{ color: "#C4956A" }} /> Simple Rules
            </h3>
            <ul className="space-y-4">
              {[
                "Do not make fake promises to clients.",
                "Do not give pricing without team confirmation.",
                "Do not collect money personally from clients.",
                "Always update Pengu before final discussions.",
                "Commission is paid after client payment is confirmed.",
                "Do not misrepresent the brand."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--pengu-text-2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply-form" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {formSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-3xl bg-white shadow-2xl border"
              style={{ borderColor: "#C4956A" }}
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--pengu-heading)" }}>Application Received!</h2>
              <p className="mb-8" style={{ color: "var(--pengu-text-2)" }}>Our growth team will review your details and contact you via WhatsApp/Email within 24-48 hours.</p>
              <Link 
                to="/"
                className="px-8 py-3 rounded-xl font-bold text-white inline-block"
                style={{ background: "#4A2E1F" }}
              >
                Back to Home
              </Link>
            </motion.div>
          ) : (
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border" style={{ borderColor: "var(--pengu-border)" }}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--pengu-text)", fontFamily: "Outfit, sans-serif" }}>Apply as Growth Partner</h2>
                <p style={{ color: "var(--pengu-text-2)", opacity: 0.7 }}>Fill out the form below and start your journey with Pengu.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Location</label>
                    <input
                      type="text"
                      required
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Current Profession</label>
                    <select
                      required
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                    >
                      <option value="">Select Option</option>
                      <option>Student</option>
                      <option>Freelancer</option>
                      <option>Sales Professional</option>
                      <option>Job Seeker</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Experience Level</label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                    >
                      <option value="">Select Option</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Expert (Sales)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Which services can you promote best?</label>
                  <input
                    type="text"
                    placeholder="e.g. Websites, Mobile Apps"
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                    className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                    style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold" style={{ color: "var(--pengu-heading)" }}>Why do you want to join Pengu?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your network or interest..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
                    style={{ borderColor: "var(--pengu-border)", background: "var(--pengu-surface)", "--tw-ring-color": "#4A2E1F" } as any}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 rounded-xl font-bold text-lg text-white transition-all hover:brightness-110"
                  style={{ background: "#4A2E1F" }}
                >
                  Submit Application
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-[#4A2E1F] text-center text-white">
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>Ready to Start Earning?</h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg opacity-80">
          Become a Lead Partner today. Bring leads, build connections, and grow your income with Pengu AI.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#apply-form" className="px-10 py-4 rounded-xl font-bold text-lg" style={{ background: "#C4956A", color: "#4A2E1F" }}>
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
