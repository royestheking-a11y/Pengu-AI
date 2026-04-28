import { useState, useEffect } from "react";
import { Mail, Phone, ExternalLink, Calendar, Trash2, CheckCircle2, XCircle, Clock, Search } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

export function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await api.get('applications');
      setApplications(data);
    } catch (err) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api.patch(`applications/${id}`, { status });
      setApplications(applications.map((a) => a._id === id ? res : a));
      toast.success("Status updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await api.delete(`applications/${id}`);
      setApplications(applications.filter((a) => a._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filtered = applications
    .filter((a) => filter === "all" || a.status === filter)
    .filter((a) => 
      a.name.toLowerCase().includes(search.toLowerCase()) || 
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
    );

  const statusColors: any = {
    new: { bg: "#FDF8F5", text: "#4A2E1F", icon: Clock },
    reviewed: { bg: "#e3f2fd", text: "#1565c0", icon: Search },
    interviewing: { bg: "#fff3e0", text: "#ef6c00", icon: Calendar },
    hired: { bg: "#e8f5e9", text: "#2e7d32", icon: CheckCircle2 },
    rejected: { bg: "#ffebee", text: "#c62828", icon: XCircle },
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Applications</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {applications.length} total candidates
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.15)" }}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewing">Interviewing</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl text-sm outline-none w-48 lg:w-64"
              style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.15)" }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((app) => {
          const status = statusColors[app.status] || statusColors.new;
          const StatusIcon = status.icon;
          return (
            <div
              key={app._id}
              className="p-6 rounded-2xl transition-all duration-200"
              style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: "#1a0f0a" }}>{app.name}</h3>
                    <span 
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: status.bg, color: status.text }}
                    >
                      <StatusIcon size={12} />
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-3" style={{ color: "#C4956A" }}>
                    Applying for: <span className="text-[#4A2E1F]">{app.jobTitle}</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#8B5E3C" }}>
                    <span className="flex items-center gap-1.5"><Mail size={14} /> {app.email}</span>
                    <span className="flex items-center gap-1.5"><Phone size={14} /> {app.phone}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{ background: "#FDF8F5", color: "#4A2E1F" }}
                  >
                    View Resume <ExternalLink size={14} />
                  </a>
                  
                  <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "#FDF8F5" }}>
                    {Object.keys(statusColors).map((s) => {
                      const StatusBtnIcon = statusColors[s].icon;
                      return (
                        <button
                          key={s}
                          onClick={() => updateStatus(app._id, s)}
                          title={s.toUpperCase()}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${app.status === s ? 'shadow-sm' : 'opacity-40 hover:opacity-100'}`}
                          style={{ background: app.status === s ? "#4A2E1F" : "transparent" }}
                        >
                          <StatusBtnIcon size={14} style={{ color: app.status === s ? "#C4956A" : "#4A2E1F" }} />
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => deleteApplication(app._id)}
                    className="p-2.5 rounded-xl transition-all duration-200"
                    style={{ background: "#fff0f0", color: "#c62828" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {app.message && (
                <div className="mt-6 p-4 rounded-xl text-sm italic" style={{ background: "#FDF8F5", color: "#5A3A2B", border: "1px solid rgba(74,46,31,0.05)" }}>
                  "{app.message}"
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
