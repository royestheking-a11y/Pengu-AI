import { useState, useEffect } from "react";
import { Trash2, Search, Download, Mail } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

export function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const data = await api.get('subscribers');
      setSubscribers(data);
    } catch (err) {
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const filtered = subscribers.filter((s) => !search || s.email.toLowerCase().includes(search.toLowerCase()));

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    try {
      await api.delete(`subscribers/${id}`);
      setSubscribers(subscribers.filter((s) => s._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const exportCSV = () => {
    const csv = "Email,Date\n" + subscribers.map(s => `${s.email},${s.createdAt}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pengu_subscribers.csv";
    a.click();
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Newsletter Subscribers</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {subscribers.length} total subscribers
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "#FDF8F5", color: "#4A2E1F", border: "1px solid rgba(74,46,31,0.15)" }}
          >
            <Download size={16} /> Export CSV
          </button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B5E3C" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subscribers..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.12)", color: "#1a0f0a" }}
        />
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
      >
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={36} className="mx-auto mb-3" style={{ color: "#C4956A" }} />
            <h3 className="font-bold mb-1" style={{ color: "#1a0f0a" }}>No Subscribers Yet</h3>
            <p className="text-sm" style={{ color: "#8B5E3C" }}>
              Subscribers who sign up via the newsletter form will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.06)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>#</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(74,46,31,0.04)" }}>
               {filtered.map((sub, i) => (
                <tr key={sub._id} className="hover:bg-[#FAFAF8] transition-colors duration-100">
                  <td className="px-5 py-3 text-sm" style={{ color: "#8B5E3C" }}>{i + 1}</td>
                  <td className="px-5 py-3 text-sm font-medium" style={{ color: "#1a0f0a" }}>{sub.email}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${sub.email}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: "#FDF8F5", color: "#4A2E1F" }}
                      >
                        <Mail size={12} /> Email
                      </a>
                      <button
                        onClick={() => deleteSubscriber(sub._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                        style={{ background: "#fff0f0", color: "#c62828" }}
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
