import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight, Briefcase, MapPin, Clock, Users } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

const emptyJob = {
  title: "",
  department: "Engineering",
  location: "Remote",
  type: "Full-time",
  description: "",
  requirements: [],
  benefits: [],
  active: true,
};

export function AdminCareers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await api.get('jobs');
      setJobs(data);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => setEditing({ ...emptyJob });
  const openEdit = (j: any) => setEditing({ ...j });

  const save = async () => {
    if (!editing?.title) return;
    try {
      if (editing._id) {
        const res = await api.patch(`jobs/${editing._id}`, editing);
        setJobs(jobs.map((j) => j._id === editing._id ? res : j));
        toast.success("Job updated");
      } else {
        const res = await api.post('jobs', editing);
        setJobs([res, ...jobs]);
        toast.success("Job created");
      }
      setEditing(null);
    } catch (err) {
      toast.error("Failed to save job");
    }
  };

  const addItem = (field: "requirements" | "benefits", input: string, setInput: (v: string) => void) => {
    if (input.trim()) {
      setEditing({ ...editing, [field]: [...(editing[field] || []), input.trim()] });
      setInput("");
    }
  };

  const removeItem = (field: "requirements" | "benefits", val: string) => {
    setEditing({ ...editing, [field]: editing[field].filter((x: string) => x !== val) });
  };

  const toggleActive = async (job: any) => {
    try {
      const res = await api.patch(`jobs/${job._id}`, { active: !job.active });
      setJobs(jobs.map((j) => j._id === job._id ? res : j));
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm("Delete this job posting?")) return;
    try {
      await api.delete(`jobs/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Job Postings</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {jobs.filter((j) => j.active).length} active · {jobs.length} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: "#4A2E1F" }}
        >
          <Plus size={16} /> Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(74,46,31,0.08)",
              opacity: job.active ? 1 : 0.6,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FDF8F5" }}>
                <Briefcase size={22} style={{ color: "#4A2E1F" }} />
              </div>
              <div>
                <h3 className="font-bold" style={{ color: "#1a0f0a" }}>{job.title}</h3>
                <div className="flex flex-wrap gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#8B5E3C" }}>
                    <Users size={12} /> {job.department}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#8B5E3C" }}>
                    <MapPin size={12} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#8B5E3C" }}>
                    <Clock size={12} /> {job.type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(job)}
                className="px-4 py-2 rounded-lg text-xs font-medium"
                style={{ background: "#FDF8F5", color: "#4A2E1F" }}
              >
                Edit
              </button>
              <button
                onClick={() => toggleActive(job)}
                className="px-4 py-2 rounded-lg"
                style={{ background: "#FDF8F5", color: "#8B5E3C" }}
              >
                {job.active ? <ToggleRight size={20} style={{ color: "#4A2E1F" }} /> : <ToggleLeft size={20} />}
              </button>
              <button
                onClick={() => deleteJob(job._id)}
                className="px-4 py-2 rounded-lg"
                style={{ background: "#fff0f0", color: "#c62828" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: "#ffffff", maxHeight: "90vh" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.08)" }}>
              <h2 className="font-bold" style={{ color: "#1a0f0a" }}>{editing._id ? "Edit Job" : "New Job Posting"}</h2>
              <button onClick={() => setEditing(null)} style={{ color: "#4A2E1F" }}><X size={20} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4" style={{ maxHeight: "calc(90vh - 120px)" }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Job Title</label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Department</label>
                  <select
                    value={editing.department}
                    onChange={(e) => setEditing({ ...editing, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                  >
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Operations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Location</label>
                  <input
                    type="text"
                    value={editing.location}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Type</label>
                  <select
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Description</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Requirements</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem("requirements", requirementInput, setRequirementInput)}
                    placeholder="Add requirement..."
                    className="flex-1 px-4 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                  />
                  <button
                    onClick={() => addItem("requirements", requirementInput, setRequirementInput)}
                    className="px-4 py-2 rounded-xl text-white text-xs font-medium"
                    style={{ background: "#4A2E1F" }}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editing.requirements.map((r: string) => (
                    <span key={r} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full" style={{ background: "#FDF8F5", color: "#4A2E1F", border: "1px solid rgba(74,46,31,0.1)" }}>
                      {r} <button onClick={() => removeItem("requirements", r)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Benefits</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem("benefits", benefitInput, setBenefitInput)}
                    placeholder="Add benefit..."
                    className="flex-1 px-4 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)" }}
                  />
                  <button
                    onClick={() => addItem("benefits", benefitInput, setBenefitInput)}
                    className="px-4 py-2 rounded-xl text-white text-xs font-medium"
                    style={{ background: "#4A2E1F" }}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editing.benefits.map((b: string) => (
                    <span key={b} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full" style={{ background: "#FDF8F5", color: "#C4956A", border: "1px solid rgba(196,149,106,0.2)" }}>
                      {b} <button onClick={() => removeItem("benefits", b)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: "1px solid rgba(74,46,31,0.08)" }}>
              <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-xl text-sm" style={{ background: "#FDF8F5", color: "#4A2E1F" }}>
                Cancel
              </button>
              <button onClick={save} className="px-5 py-2 rounded-xl text-sm text-white" style={{ background: "#4A2E1F" }}>
                Save Posting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
