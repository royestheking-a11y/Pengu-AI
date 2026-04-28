import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Rocket, Globe } from "lucide-react";
import { api } from "../utils/api";
import { SEO } from "./SEO";

export function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.get('jobs');
        setJobs(data.filter((j: any) => j.active));
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: "#FDF8F5" }}>
      <SEO 
        title="Careers"
        description="Join the future of automated intelligence. Explore career opportunities at Pengu AI and help us build the next generation of enterprise-grade AI systems."
        keywords="AI Careers, Work at Pengu, Automated Jobs"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(74,46,31,0.05)", color: "#4A2E1F", border: "1px solid rgba(196,149,106,0.3)" }}>
            <Sparkles size={12} /> WE'RE HIRING
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6" style={{ color: "#1a0f0a", lineHeight: 1.1 }}>
            Build the future of <span style={{ color: "#C4956A" }}>Automated Intelligence</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.9 }}>
            Join a team of visionaries, engineers, and designers working to replace outdated software with intelligent, autonomous systems.
          </p>
        </div>

        {/* Culture / Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Remote-First", desc: "Work from anywhere in the world.", icon: Globe },
            { title: "AI-Native", desc: "We use the latest AI to build the latest AI.", icon: Rocket },
            { title: "High Growth", desc: "Join early and grow with the platform.", icon: Sparkles }
          ].map((item: any) => (
            <div key={item.title} className="p-8 rounded-3xl bg-white border border-[rgba(74,46,31,0.06)]">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#FDF8F5" }}>
                <item.icon size={24} style={{ color: "#4A2E1F" }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#4A2E1F" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8B5E3C" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black mb-10" style={{ color: "#1a0f0a" }}>Open Roles</h2>
          {jobs.length > 0 ? (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Link
                  key={job._id}
                  to={`/careers/${job._id}`}
                  className="group p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(74,46,31,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl hover:border-[#C4956A] hover:-translate-y-1"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: "#C4956A" }}>{job.department}</span>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#4A2E1F] transition-colors" style={{ color: "#1a0f0a" }}>{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#8B5E3C" }}>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "#4A2E1F" }}>
                    View Details <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-3xl bg-white border border-dashed border-[rgba(74,46,31,0.2)]">
              <p style={{ color: "#8B5E3C" }}>No open roles at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
