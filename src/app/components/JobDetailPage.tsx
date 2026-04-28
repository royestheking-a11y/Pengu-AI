import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { 
  Briefcase, MapPin, Clock, ArrowLeft, CheckCircle, 
  Send, FileText, User, Mail, Phone, MessageSquare, Link as LinkIcon 
} from "lucide-react";
import { api } from "../utils/api";
import { toast } from "sonner";

export function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.upload(file);
      setFormData({ ...formData, resumeUrl: res.url });
      toast.success("Resume uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await api.get(`jobs/${id}`);
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#4A2E1F" }}>Job not found</h2>
          <Link to="/careers" className="text-[#C4956A] font-medium">Back to Careers</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('applications', {
        ...formData,
        jobId: job._id,
        jobTitle: job.title,
      });
      setSubmitted(true);
      toast.success("Application submitted!");
      setTimeout(() => navigate("/careers"), 3000);
    } catch (err) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: "#FDF8F5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/careers" 
          className="inline-flex items-center gap-2 text-sm font-bold mb-10 transition-colors"
          style={{ color: "#8B5E3C" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4A2E1F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8B5E3C")}
        >
          <ArrowLeft size={16} /> ALL POSITIONS
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[rgba(74,46,31,0.08)] mb-10">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: "#C4956A" }}>{job.department}</span>
            <h1 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: "#1a0f0a" }}>{job.title}</h1>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#5A3A2B" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FDF8F5" }}>
                  <MapPin size={14} style={{ color: "#4A2E1F" }} />
                </div>
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#5A3A2B" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FDF8F5" }}>
                  <Clock size={14} style={{ color: "#4A2E1F" }} />
                </div>
                {job.type}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>About the Role</h3>
              <p className="leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.9 }}>{job.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>Requirements</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {job.requirements.map((req: string) => (
                  <li key={req} className="flex items-start gap-3 text-sm" style={{ color: "#5A3A2B" }}>
                    <div className="mt-1 shrink-0"><CheckCircle size={14} style={{ color: "#C4956A" }} /></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>Benefits</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {job.benefits.map((benefit: string) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm" style={{ color: "#5A3A2B" }}>
                    <div className="mt-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: "#C4956A" }} /></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[rgba(74,46,31,0.08)]">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#FDF8F5" }}>
                <CheckCircle size={40} style={{ color: "#4A2E1F" }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#4A2E1F" }}>Application Received!</h2>
              <p style={{ color: "#8B5E3C" }}>We'll review your details and get back to you soon.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black mb-8" style={{ color: "#1a0f0a" }}>Apply for this position</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4A2E1F" }}>Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all"
                        style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4A2E1F" }}>Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all"
                        style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4A2E1F" }}>Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all"
                        style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4A2E1F" }}>Resume (PDF/Doc)</label>
                    <div className="relative">
                      <label className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl cursor-pointer transition-all border border-dashed hover:bg-[#fffcf9]" 
                             style={{ background: "#FDF8F5", borderColor: "rgba(74,46,31,0.2)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: formData.resumeUrl ? "#4A2E1F" : "#ffffff" }}>
                          <FileText size={18} style={{ color: formData.resumeUrl ? "#C4956A" : "#8B5E3C" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: "#4A2E1F" }}>
                            {uploading ? "Uploading..." : formData.resumeUrl ? "Resume Attached" : "Click to Upload Resume"}
                          </p>
                          <p className="text-[10px]" style={{ color: "#8B5E3C" }}>{formData.resumeUrl ? "Successfully uploaded to Cloud" : "PDF, DOCX, or SVG up to 10MB"}</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx" 
                          onChange={handleFileUpload} 
                          disabled={uploading}
                          required={!formData.resumeUrl}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4A2E1F" }}>Cover Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-5 text-gray-400" size={16} />
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all resize-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)" }}
                      placeholder="Tell us why you're a great fit..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-black transition-all duration-300"
                  style={{ background: "#4A2E1F", boxShadow: "0 10px 30px rgba(74,46,31,0.2)" }}
                >
                  Submit Application <Send size={20} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
