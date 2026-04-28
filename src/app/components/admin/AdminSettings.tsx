import { useState, useEffect } from "react";
import { Save, Trash2, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

export function AdminSettings() {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.upload(file);
      setForm({ ...form, siteLogo: res.url });
      toast.success("Logo uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.get('settings');
      setForm(data || {});
    } catch (err) {
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.patch('settings', form);
      setSaved(true);
      toast.success("Settings saved");
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error("Failed to save settings");
    }
  };

  const clearAllData = async () => {
    if (confirm("⚠️ This will delete ALL database records. Are you sure?")) {
      if (confirm("Are you absolutely sure? This cannot be undone.")) {
        // Implementation for clearing all DB tables could be added to server
        toast.error("Nuke feature disabled for security. Delete items manually.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  const InputField = ({ label, field, type = "text", placeholder = "" }: any) => (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>{label}</label>
      <input
        type={type}
        value={form[field] || ""}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
        style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#4A2E1F")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(74,46,31,0.15)")}
      />
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Settings</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>Manage your website configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200"
          style={{ background: saved ? "#2e7d32" : "#4A2E1F" }}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* General */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>General Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <InputField label="Company Name" field="siteName" placeholder="Pengu AI" />
            <InputField label="Tagline" field="tagline" placeholder="Build. Automate. Scale." />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Website Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gray-50 border flex items-center justify-center overflow-hidden">
                {form.siteLogo ? (
                  <img src={form.siteLogo} className="w-full h-full object-contain p-2" alt="Logo" />
                ) : (
                  <Upload size={24} className="text-gray-300" />
                )}
              </div>
              <label className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:bg-gray-50" style={{ borderColor: "rgba(74,46,31,0.15)" }}>
                {uploading ? "Uploading..." : "Upload New Logo"}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Email" field="email" type="email" placeholder="pengui.org@gmail.com" />
            <InputField label="Phone" field="phone" placeholder="0134-3042761" />
            <InputField label="WhatsApp URL" field="whatsapp" placeholder="https://wa.me/message/CSYKXUISDAIVI1" />
            <InputField label="Location" field="location" placeholder="221B Baker Street, London | Dhaka, Bangladesh" />
          </div>
        </div>

        {/* Social Media */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>Social Media Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Twitter/X URL" field="twitter" placeholder="https://twitter.com/..." />
            <InputField label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/..." />
            <InputField label="Facebook URL" field="facebook" placeholder="https://facebook.com/..." />
            <InputField label="Instagram URL" field="instagram" placeholder="https://instagram.com/..." />
          </div>
        </div>

        {/* SEO */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>SEO Settings</h2>
          <div className="space-y-4">
            <InputField label="Meta Title" field="metaTitle" placeholder="Pengu AI — Build, Automate & Scale" />
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Meta Description</label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                placeholder="Short description for search engines..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>Announcement Bar</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="annActive"
                checked={form.announcementBarActive}
                onChange={(e) => setForm({ ...form, announcementBarActive: e.target.checked })}
              />
              <label htmlFor="annActive" className="text-sm" style={{ color: "#4A2E1F" }}>Enable announcement bar</label>
            </div>
            <InputField label="Announcement Text" field="announcementBar" placeholder="🚀 New feature launched! Check it out →" />
          </div>
        </div>
        {/* Page Content Specifics */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#1a0f0a" }}>Page Specific Settings</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#C4956A" }}>AI Platform Page</h3>
              <InputField 
                label="Demo Video URL (YouTube)" 
                field="aiPlatformDemoVideoUrl" 
                placeholder="https://www.youtube.com/watch?v=..." 
              />
              <p className="text-[10px] mt-1 opacity-60" style={{ color: "#5A3A2B" }}>
                This video will be displayed in the "View Demo" section of the AI Platform page.
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#fff8f8", border: "1px solid rgba(198,40,40,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} style={{ color: "#c62828" }} />
            <h2 className="font-bold" style={{ color: "#c62828" }}>Danger Zone</h2>
          </div>
          <p className="text-sm mb-4" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Clearing all data is irreversible. This will remove all messages, blog posts, portfolio items, testimonials, and settings.
          </p>
          <button
            onClick={clearAllData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "#c62828", color: "#ffffff" }}
          >
            <Trash2 size={16} /> Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
