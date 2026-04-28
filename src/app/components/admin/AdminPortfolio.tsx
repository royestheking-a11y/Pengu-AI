import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Upload, Star } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

const categories = ["Website", "App", "AI", "Dashboard", "Branding", "E-Commerce"];

const emptyItem = {
  title: "",
  slug: "",
  category: "Website",
  description: "",
  tags: [],
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  featured: true,
};

export function AdminPortfolio() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const data = await api.get('projects');
      setPortfolio(data);
    } catch (err) {
      toast.error("Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing({ ...emptyItem, tags: [] });
  };

  const openEdit = (item: any) => {
    setEditing({ ...item, tags: item.tags || [] });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.upload(file);
      setEditing({ ...editing, image: res.url });
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!editing?.title) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const itemData = { ...editing, slug };

    try {
      if (editing._id) {
        const res = await api.patch(`projects/${editing._id}`, itemData);
        setPortfolio(portfolio.map((p) => p._id === editing._id ? res : p));
        toast.success("Project updated");
      } else {
        const res = await api.post('projects', itemData);
        setPortfolio([res, ...portfolio]);
        toast.success("Project created");
      }
      setEditing(null);
      setTagInput("");
    } catch (err) {
      toast.error("Failed to save project");
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setEditing({ ...editing, tags: editing.tags.filter((t: string) => t !== tag) });
  };

  const toggleFeatured = async (item: any) => {
    try {
      const res = await api.patch(`projects/${item._id}`, { featured: !item.featured });
      setPortfolio(portfolio.map((p) => p._id === item._id ? res : p));
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this portfolio item?")) return;
    try {
      await api.delete(`projects/${id}`);
      setPortfolio(portfolio.filter((p) => p._id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Portfolio</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {portfolio.filter((p) => p.published).length} active · {portfolio.length} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: "#4A2E1F" }}
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {portfolio.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
          >
            <div className="relative h-40 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div
                className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "#4A2E1F", color: "#C4956A" }}
              >
                {item.category}
              </div>
              <div
                className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: item.featured ? "rgba(76,175,80,0.9)" : "rgba(0,0,0,0.6)",
                  color: "#ffffff",
                }}
              >
                {item.featured ? "Featured" : "Regular"}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1" style={{ color: "#1a0f0a" }}>{item.title}</h3>
              <p className="text-xs mb-3 line-clamp-2" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(item.tags || []).map((tag: string) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: "#FDF8F5", color: "#8B5E3C" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: "#FDF8F5", color: "#4A2E1F" }}
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => toggleFeatured(item)}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: "#FDF8F5", color: "#8B5E3C" }}
                  title={item.featured ? "Remove Featured" : "Make Featured"}
                >
                  <Star size={12} fill={item.featured ? "#C4956A" : "none"} color={item.featured ? "#C4956A" : "currentColor"} />
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: "#fff0f0", color: "#c62828" }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: "#ffffff", maxHeight: "90vh" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.08)" }}>
              <h2 className="font-bold" style={{ color: "#1a0f0a" }}>
                {editing._id ? "Edit Project" : "New Project"}
              </h2>
              <button onClick={() => { setEditing(null); setTagInput(""); }} style={{ color: "#4A2E1F" }}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4" style={{ maxHeight: "calc(90vh - 120px)" }}>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Project Title *</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Featured Image</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editing.image}
                      onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                      placeholder="Image URL"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-2"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200"
                        style={{ background: "#4A2E1F", color: "#C4956A" }}
                      >
                        <Upload size={14} />
                        {uploading ? "Uploading..." : "Upload from Computer"}
                      </label>
                    </div>
                  </div>
                  {editing.image && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(74,46,31,0.1)" }}>
                      <img src={editing.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Description</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Project description..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Tags (press Enter to add)</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Add a tag and press Enter"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {(editing.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#FDF8F5", color: "#4A2E1F", border: "1px solid rgba(74,46,31,0.1)" }}
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} style={{ color: "#8B5E3C" }}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
               <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                <label htmlFor="pub" className="text-sm" style={{ color: "#4A2E1F" }}>Show in Featured Section</label>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: "1px solid rgba(74,46,31,0.08)" }}>
              <button onClick={() => { setEditing(null); setTagInput(""); }} className="px-5 py-2 rounded-xl text-sm" style={{ background: "#FDF8F5", color: "#4A2E1F" }}>
                Cancel
              </button>
              <button
                onClick={save}
                disabled={uploading}
                className="px-5 py-2 rounded-xl text-sm text-white disabled:opacity-50"
                style={{ background: "#4A2E1F" }}
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
