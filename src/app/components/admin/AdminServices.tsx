import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight, Globe, Smartphone, Bot, Zap, BarChart3, Palette, Link2, Lightbulb, Shield, Mail, Target, Rocket } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

// Map from emoji key → Lucide icon + label (preserves backward compat with stored data)
const ICON_MAP: Record<string, { Icon: any; label: string }> = {
  "🌐": { Icon: Globe, label: "Globe" },
  "📱": { Icon: Smartphone, label: "Mobile" },
  "🤖": { Icon: Bot, label: "AI Bot" },
  "⚡": { Icon: Zap, label: "Zap" },
  "📊": { Icon: BarChart3, label: "Chart" },
  "🎨": { Icon: Palette, label: "Design" },
  "🔗": { Icon: Link2, label: "Link" },
  "💡": { Icon: Lightbulb, label: "Idea" },
  "🛡️": { Icon: Shield, label: "Shield" },
  "📧": { Icon: Mail, label: "Email" },
  "🎯": { Icon: Target, label: "Target" },
  "🚀": { Icon: Rocket, label: "Rocket" },
};

const emptyService = {
  slug: "",
  icon: "🌐",
  title: "",
  tagline: "",
  description: "",
  longDescription: "",
  features: [],
  active: true,
};

const iconOptions = [
  { emoji: "🌐", label: "Globe" },
  { emoji: "📱", label: "Mobile" },
  { emoji: "🤖", label: "AI Bot" },
  { emoji: "⚡", label: "Zap" },
  { emoji: "📊", label: "Chart" },
  { emoji: "🎨", label: "Design" },
  { emoji: "🔗", label: "Link" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🛡️", label: "Shield" },
  { emoji: "📧", label: "Email" },
  { emoji: "🎯", label: "Target" },
  { emoji: "🚀", label: "Rocket" },
];

export function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.get('services');
      setServices(data);
    } catch (err) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => setEditing({ ...emptyService, features: [] });
  const openEdit = (s: any) => setEditing({ ...s, features: s.features || [] });

  const save = async () => {
    if (!editing?.title) return;
    try {
      if (editing._id) {
        const res = await api.patch(`services/${editing._id}`, editing);
        setServices(services.map((s) => s._id === editing._id ? res : s));
        toast.success("Service updated");
      } else {
        const res = await api.post('services', editing);
        setServices([...services, res]);
        toast.success("Service created");
      }
      setEditing(null);
      setFeatureInput("");
    } catch (err) {
      toast.error("Failed to save service");
    }
  };

  const addFeature = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && featureInput.trim()) {
      setEditing({ ...editing, features: [...(editing.features || []), featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (f: string) => {
    setEditing({ ...editing, features: editing.features.filter((x: string) => x !== f) });
  };

  const toggleActive = async (s: any) => {
    try {
      const res = await api.patch(`services/${s._id}`, { active: !s.active });
      setServices(services.map((prev) => prev._id === s._id ? res : prev));
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteService = async (id: string) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`services/${id}`);
      setServices(services.filter((s) => s._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Services</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {services.filter((s) => s.active).length} active · {services.length} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: "#4A2E1F" }}
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const iconInfo = ICON_MAP[service.icon] || { Icon: Globe, label: "Globe" };
          const ServiceIcon = iconInfo.Icon;
          return (
            <div
              key={service._id}
              className="p-5 rounded-2xl"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(74,46,31,0.08)",
                opacity: service.active ? 1 : 0.6,
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#4A2E1F" }}
                >
                  <ServiceIcon size={22} style={{ color: "#C4956A" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold" style={{ color: "#1a0f0a" }}>{service.title}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        background: service.active ? "#4A2E1F" : "#f5f5f5",
                        color: service.active ? "#C4956A" : "#9e9e9e",
                      }}
                    >
                      {service.active ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-xs mt-1 line-clamp-2" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(service.features || []).map((f: string) => (
                  <span key={f} className="text-xs px-2 py-0.5 rounded" style={{ background: "#FDF8F5", color: "#8B5E3C" }}>
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(service)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: "#FDF8F5", color: "#4A2E1F" }}
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => toggleActive(service)}
                  className="flex items-center justify-center px-3 py-1.5 rounded-lg"
                  style={{ background: "#FDF8F5", color: "#8B5E3C" }}
                >
                  {service.active ? <ToggleRight size={16} style={{ color: "#4A2E1F" }} /> : <ToggleLeft size={16} />}
                </button>
                <button
                  onClick={() => deleteService(service._id)}
                  className="flex items-center justify-center px-3 py-1.5 rounded-lg"
                  style={{ background: "#fff0f0", color: "#c62828" }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: "#ffffff", maxHeight: "90vh" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.08)" }}>
              <h2 className="font-bold" style={{ color: "#1a0f0a" }}>
                {editing._id ? "Edit Service" : "New Service"}
              </h2>
              <button onClick={() => { setEditing(null); setFeatureInput(""); }} style={{ color: "#4A2E1F" }}><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4" style={{ maxHeight: "calc(90vh - 120px)" }}>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "#4A2E1F" }}>Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((icon) => {
                    const { Icon } = ICON_MAP[icon.emoji] || { Icon: Globe };
                    const isSelected = editing.icon === icon.emoji;
                    return (
                      <button
                        key={icon.emoji}
                        onClick={() => setEditing({ ...editing, icon: icon.emoji })}
                        title={icon.label}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150"
                        style={{
                          background: isSelected ? "#4A2E1F" : "#FDF8F5",
                          border: isSelected ? "2px solid #C4956A" : "1px solid rgba(74,46,31,0.1)",
                        }}
                      >
                        <Icon size={18} style={{ color: isSelected ? "#C4956A" : "#8B5E3C" }} />
                      </button>
                    );
                  })}
                </div>
              </div>
              {[
                { key: "title", label: "Service Name *", placeholder: "Website Development" },
                { key: "slug", label: "URL Slug * (e.g. website-development)", placeholder: "website-development" },
                { key: "tagline", label: "Tagline", placeholder: "Your digital HQ — built to convert" },
                { key: "description", label: "Short Description (for cards)", placeholder: "Short description...", multi: true },
                { key: "longDescription", label: "Detailed Description (for individual page)", placeholder: "Long detailed description...", multi: true },
              ].map(({ key, label, placeholder, multi }: any) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>{label}</label>
                  {multi ? (
                    <textarea
                      value={editing[key]}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      placeholder={placeholder}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editing[key]}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Features (press Enter to add)</label>
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={addFeature}
                  placeholder="Add feature and press Enter"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {(editing.features || []).map((f: string) => (
                    <span
                      key={f}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#FDF8F5", color: "#4A2E1F", border: "1px solid rgba(74,46,31,0.1)" }}
                    >
                      {f}
                      <button onClick={() => removeFeature(f)} style={{ color: "#8B5E3C" }}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                <label htmlFor="active" className="text-sm" style={{ color: "#4A2E1F" }}>Show this service</label>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: "1px solid rgba(74,46,31,0.08)" }}>
              <button onClick={() => { setEditing(null); setFeatureInput(""); }} className="px-5 py-2 rounded-xl text-sm" style={{ background: "#FDF8F5", color: "#4A2E1F" }}>
                Cancel
              </button>
              <button onClick={save} className="px-5 py-2 rounded-xl text-sm text-white" style={{ background: "#4A2E1F" }}>
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}