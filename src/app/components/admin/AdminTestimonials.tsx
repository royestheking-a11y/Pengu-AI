import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Star, Upload } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

const emptyItem = {
  name: "",
  role: "",
  image: "",
  content: "",
  rating: 5,
  published: true,
};

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await api.get('testimonials');
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing({ ...emptyItem });
  };

  const openEdit = (item: any) => setEditing({ ...item });

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
    if (!editing?.name || !editing?.content) return;
    
    try {
      if (editing._id) {
        const res = await api.patch(`testimonials/${editing._id}`, editing);
        setTestimonials(testimonials.map((t) => t._id === editing._id ? res : t));
        toast.success("Testimonial updated");
      } else {
        const res = await api.post('testimonials', editing);
        setTestimonials([res, ...testimonials]);
        toast.success("Testimonial added");
      }
      setEditing(null);
    } catch (err) {
      toast.error("Failed to save testimonial");
    }
  };

  const togglePublish = async (item: any) => {
    try {
      const res = await api.patch(`testimonials/${item._id}`, { published: !item.published });
      setTestimonials(testimonials.map((t) => t._id === item._id ? res : t));
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`testimonials/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Testimonials</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {testimonials.filter((t) => t.published).length} visible · {testimonials.length} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: "#4A2E1F" }}
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="p-5 rounded-2xl"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(74,46,31,0.08)",
              opacity: item.published ? 1 : 0.6,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < item.rating ? "#C4956A" : "transparent"}
                  style={{ color: i < item.rating ? "#C4956A" : "rgba(74,46,31,0.2)" }}
                />
              ))}
            </div>
            <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: "#1a0f0a" }}>
              "{item.content}"
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-sm font-bold shrink-0 border"
                style={{ background: "#4A2E1F", color: "#C4956A" }}
              >
                {item.image ? (
                  <img src={item.image} className="w-full h-full object-cover" alt="" />
                ) : (
                  item.name.charAt(0)
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: "#1a0f0a" }}>{item.name}</div>
                <div className="text-xs truncate" style={{ color: "#8B5E3C" }}>{item.role}</div>
              </div>
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
                onClick={() => togglePublish(item)}
                className="flex items-center justify-center px-3 py-1.5 rounded-lg"
                style={{ background: "#FDF8F5", color: "#8B5E3C" }}
              >
                {item.published ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="flex items-center justify-center px-3 py-1.5 rounded-lg"
                style={{ background: "#fff0f0", color: "#c62828" }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: "#ffffff" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.08)" }}>
              <h2 className="font-bold" style={{ color: "#1a0f0a" }}>
                {editing._id ? "Edit Testimonial" : "New Testimonial"}
              </h2>
              <button onClick={() => setEditing(null)} style={{ color: "#4A2E1F" }}><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: "name", label: "Client Name *", placeholder: "John Smith" },
                { key: "role", label: "Role/Company", placeholder: "CEO, TechCorp" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>{label}</label>
                  <input
                    type="text"
                    value={editing[key]}
                    onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                  />
                </div>
              ))}

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Client Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border">
                    {editing.image ? (
                      <img src={editing.image} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Upload size={20} />
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:bg-gray-50">
                    {uploading ? "Uploading..." : "Upload Photo"}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setEditing({ ...editing, rating: r })}
                    >
                      <Star
                        size={22}
                        fill={r <= editing.rating ? "#C4956A" : "transparent"}
                        style={{ color: r <= editing.rating ? "#C4956A" : "rgba(74,46,31,0.2)" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Review *</label>
                <textarea
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  placeholder="Client's review..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                />
                <label htmlFor="pub" className="text-sm" style={{ color: "#4A2E1F" }}>Show on website</label>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: "1px solid rgba(74,46,31,0.08)" }}>
              <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-xl text-sm" style={{ background: "#FDF8F5", color: "#4A2E1F" }}>
                Cancel
              </button>
              <button onClick={save} className="px-5 py-2 rounded-xl text-sm text-white" style={{ background: "#4A2E1F" }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
