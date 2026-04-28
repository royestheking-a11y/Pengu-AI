import { Link } from "react-router";
import { Target, Eye, Zap, Bot, Globe, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "./SEO";
const penguImg = "/penguimg.png";
const penguLogo = "/pengulogo.png";

const milestones = [
  { year: "2022", title: "Pengu Founded", desc: "Started with a vision to make AI accessible for every business." },
  { year: "2023", title: "100+ Projects", desc: "Delivered over 100 successful digital projects across industries." },
  { year: "2023", title: "AI Platform Launch", desc: "Launched our flagship AI platform powering smart automations." },
  { year: "2024", title: "500+ Clients", desc: "Serving 500+ businesses worldwide with AI-driven solutions." },
];

const values = [
  { icon: Bot, title: "AI-First Thinking", desc: "We approach every problem with AI at the core, not as an afterthought." },
  { icon: Zap, title: "Speed & Excellence", desc: "Fast delivery without compromising the quality of our work." },
  { icon: Shield, title: "Reliability", desc: "Rock-solid systems that you can depend on, 24/7." },
  { icon: TrendingUp, title: "Growth Mindset", desc: "We measure success by the growth we drive for our clients." },
  { icon: Globe, title: "Global Reach", desc: "Serving businesses from Silicon Valley to Southeast Asia." },
  { icon: Users, title: "Partnership", desc: "We're not vendors — we're your long-term digital partner." },
];

const teamMembers = [
  { name: "The Chairman", role: "AI Intelligence (Company Control)", img: "/teammember/chairman.png", bio: "The core intelligence system overseeing all operations and strategic decisions." },
  { name: "CEO", role: "Chief Executive Officer", img: "/teammember/CEO.png", bio: "Driving vision and growth at the intersection of humanity and AI." },
  { name: "Penguri", role: "Managing Director", img: "/teammember/PENGURI.png", bio: "Bridging the gap between software development and business operations." },
  { name: "RUBI", role: "HR & Operations Manager", img: "/teammember/RUBI HR.png", bio: "Ensuring excellence in team culture and operational efficiency." },
  { name: "Siri", role: "Lead UI/UX Designer", img: "/teammember/SIRI.png", bio: "Crafting the premium visual languages of the future." },
  { name: "Dev Alpha", role: "Full Stack Developer", img: "/teammember/developer.png", bio: "Architecting the robust systems that power our AI platform." },
  { name: "Pandu", role: "Marketing Lead", img: "/teammember/Pandu.png", bio: "Spreading the vision of Pengu to businesses worldwide." },
];

export function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      <SEO 
        title="About Us"
        description="Learn about Pengu AI, the first 100% automated AI digital solution company. Discover our mission to drive no-human intelligence enterprise-grade transformation."
        keywords="About Pengu AI, AI Mission, Automated Future"
      />
      {/* Hero */}
      <section
        className="pt-28 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "var(--pengu-grad)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
                About Pengu
              </span>
              <h1 className="mt-4 mb-6" style={{ fontSize: "3rem", fontWeight: 800, color: "var(--pengu-text)", lineHeight: 1.15 }}>
                The No-Human AI Company
              </h1>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.85 }}>
                Pengu is not a traditional agency. We are an AI software company, automation platform, 
                and digital infrastructure partner — all in one. Our systems run on intelligence, not headcount.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                Founded on the belief that every business deserves enterprise-grade AI, Pengu was built 
                to level the playing field. We use artificial intelligence to deliver results that previously 
                required teams of 50+ people.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white"
                style={{ background: "#4A2E1F" }}
              >
                Work With Us
              </Link>
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
                  className="relative z-10 w-72 drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(74,46,31,0.25))" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="p-8 rounded-2xl"
            style={{ background: "#4A2E1F" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(196,149,106,0.2)" }}>
              <Target size={24} style={{ color: "#C4956A" }} />
            </div>
            <h2 className="text-white mb-4" style={{ fontSize: "1.6rem", fontWeight: 700 }}>Our Mission</h2>
            <p style={{ color: "#C4956A", lineHeight: 1.8 }}>
              Build smart businesses with AI + automation. We empower entrepreneurs and enterprises 
              to operate at full efficiency by replacing manual work with intelligent systems that 
              learn, adapt, and grow with your business.
            </p>
          </div>
          <div
            className="p-8 rounded-2xl"
            style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "#4A2E1F" }}>
              <Eye size={24} style={{ color: "#C4956A" }} />
            </div>
            <h2 style={{ color: "var(--pengu-text)", fontSize: "1.6rem", fontWeight: 700 }} className="mb-4">Our Vision</h2>
            <p style={{ color: "var(--pengu-text-2)", lineHeight: 1.8, opacity: 0.85 }}>
              Zero human effort digital systems. A world where any business, regardless of size or budget, 
              can run sophisticated digital operations powered entirely by AI — freeing humans to 
              focus on what matters most: creativity and strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "var(--pengu-surface)" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--pengu-text)" }}>Our Journey</h2>
            <p className="mt-2" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>From idea to AI-powered reality</p>
          </div>
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
              style={{ background: "var(--pengu-border-mid)" }}
            />
            <div className="space-y-8">
              {milestones.map((item, i) => (
                <div key={item.year} className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1 text-right md:text-right">
                    {i % 2 === 0 && (
                      <div
                        className="inline-block p-6 rounded-2xl"
                        style={{ background: "var(--pengu-card)", border: "1px solid var(--pengu-border)", boxShadow: "0 2px 12px rgba(74,46,31,0.06)" }}
                      >
                        <h3 className="font-bold mb-2" style={{ color: "var(--pengu-text)" }}>{item.title}</h3>
                        <p className="text-sm" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>{item.desc}</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 z-10"
                    style={{ background: "#4A2E1F" }}
                  >
                    {item.year}
                  </div>
                  <div className="flex-1">
                    {i % 2 === 1 && (
                      <div
                        className="inline-block p-6 rounded-2xl"
                        style={{ background: "var(--pengu-card)", border: "1px solid var(--pengu-border)", boxShadow: "0 2px 12px rgba(74,46,31,0.06)" }}
                      >
                        <h3 className="font-bold mb-2" style={{ color: "var(--pengu-text)" }}>{item.title}</h3>
                        <p className="text-sm" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>{item.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Our Ecosystem
          </span>
          <h2 className="mt-4 mb-4" style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--pengu-text)" }}>
            The Minds Behind the Machine
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
            A hybrid team of AI intelligence and expert humans working together to redefine digital business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div 
                className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-5 border border-transparent transition-all duration-300 group-hover:border-[#C4956A]"
                style={{ background: "var(--pengu-surface)" }}
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--pengu-text)" }}>{member.name}</h3>
              <p className="text-sm font-semibold mb-2" style={{ color: "#C4956A" }}>{member.role}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.7 }}>{member.bio}</p>
            </motion.div>
          ))}

          {/* Hiring Boxes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`hiring-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (teamMembers.length + i) * 0.1 }}
              className="group"
            >
              <div 
                className="relative aspect-[4/5] rounded-3xl mb-5 border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all duration-300"
                style={{ background: "var(--pengu-surface)", borderColor: "rgba(74,46,31,0.15)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(74,46,31,0.05)" }}>
                  <Users size={24} style={{ color: "#8B5E3C" }} />
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ color: "#4A2E1F" }}>Hiring Soon</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#C4956A" }}>Future Employee</p>
                
                <Link 
                  to="/careers" 
                  className="mt-6 text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-lg bg-white border border-[rgba(74,46,31,0.1)] transition-all hover:bg-[#4A2E1F] hover:text-white"
                  style={{ color: "#4A2E1F" }}
                >
                  Join Us
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--pengu-text)" }}>Our Core Values</h2>
          <p className="mt-2" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>The principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-2xl transition-all duration-200"
              style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--pengu-card)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(74,46,31,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--pengu-surface)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "#4A2E1F" }}
              >
                <value.icon size={20} style={{ color: "#C4956A" }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: "var(--pengu-text)" }}>{value.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <img src={penguLogo} alt="Pengu" className="h-16 mx-auto mb-6 brightness-0 invert" />
          <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 800 }}>
            Ready to Go AI-First?
          </h2>
          <p className="mb-8" style={{ color: "#C4956A" }}>
            Join 500+ businesses that have already transformed their operations with Pengu AI.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: "#C4956A", color: "#4A2E1F" }}
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}