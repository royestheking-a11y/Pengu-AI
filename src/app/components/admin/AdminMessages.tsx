import { useState, useEffect } from "react";
import { Mail, Phone, Building, DollarSign, Trash2, Eye, CheckCircle, Clock, Search, MessageSquare } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  "Unread": { bg: "#4A2E1F", color: "#C4956A", label: "New" },
  "Read": { bg: "#FDF8F5", color: "#8B5E3C", label: "Read" },
  "Replied": { bg: "#e8f5e9", color: "#2e7d32", label: "Replied" },
  "Archived": { bg: "#f5f5f5", color: "#9e9e9e", label: "Archived" },
};

export function AdminMessages() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await api.get('messages');
      setContacts(data);
    } catch (err) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const filtered = contacts.filter((c) => {
    const matchesSearch = !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api.patch(`messages/${id}`, { status });
      setContacts(contacts.map((c) => c._id === id ? res : c));
      if (selected?._id === id) setSelected(res);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`messages/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const openMessage = (contact: any) => {
    setSelected(contact);
    if (contact.status === "Unread") updateStatus(contact._id, "Read");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Messages</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {contacts.filter((c) => c.status === "new").length} new messages
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4 h-[calc(100vh-220px)]">
        {/* Message list */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          {/* Filters */}
          <div className="p-3 space-y-2" style={{ borderBottom: "1px solid rgba(74,46,31,0.06)" }}>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B5E3C" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg outline-none"
                style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.1)", color: "#1a0f0a" }}
              />
            </div>
            <div className="flex gap-1.5">
              {["all", "new", "read", "replied", "archived"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="flex-1 text-xs py-1.5 rounded-lg transition-all duration-150 capitalize"
                  style={{
                    background: statusFilter === s ? "#4A2E1F" : "#FDF8F5",
                    color: statusFilter === s ? "#ffffff" : "#8B5E3C",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "rgba(74,46,31,0.05)" }}>
            {filtered.map((contact) => (
              <div
                key={contact._id}
                onClick={() => openMessage(contact)}
                className="px-4 py-3 cursor-pointer transition-colors duration-150"
                style={{
                  background: selected?._id === contact._id ? "#FDF8F5" : "transparent",
                  borderLeft: selected?._id === contact._id ? "3px solid #4A2E1F" : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (selected?._id !== contact._id)
                    (e.currentTarget as HTMLElement).style.background = "#FAFAF8";
                }}
                onMouseLeave={(e) => {
                  if (selected?._id !== contact._id)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm truncate" style={{ color: "#1a0f0a" }}>
                        {contact.name}
                      </span>
                       {contact.status === "Unread" && (
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#4A2E1F" }} />
                      )}
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#8B5E3C" }}>{contact.email}</p>
                    <p className="text-xs truncate mt-1" style={{ color: "#5A3A2B", opacity: 0.7 }}>{contact.message}</p>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: "#8B5E3C" }}>
                    {new Date(contact.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-sm" style={{ color: "#8B5E3C" }}>
                No messages found
              </div>
            )}
          </div>
        </div>

        {/* Message detail */}
        <div
          className="lg:col-span-3 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          {selected ? (
            <>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(74,46,31,0.06)" }}>
                <div>
                  <h2 className="font-bold" style={{ color: "#1a0f0a" }}>{selected.name}</h2>
                  <p className="text-xs mt-0.5" style={{ color: "#8B5E3C" }}>
                    {new Date(selected.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: statusColors[selected.status]?.bg, color: statusColors[selected.status]?.color }}
                  >
                    {statusColors[selected.status]?.label}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {/* Contact details */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { icon: Mail, label: "Email", value: selected.email },
                    { icon: Phone, label: "Phone", value: selected.phone || "—" },
                    { icon: Building, label: "Company", value: selected.company || "—" },
                    { icon: DollarSign, label: "Budget", value: selected.budget || "—" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="p-3 rounded-xl" style={{ background: "#FDF8F5" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={13} style={{ color: "#8B5E3C" }} />
                        <span className="text-xs font-medium" style={{ color: "#8B5E3C" }}>{label}</span>
                      </div>
                      <p className="text-sm font-medium truncate" style={{ color: "#1a0f0a" }}>{value}</p>
                    </div>
                  ))}
                </div>

                {selected.service && (
                  <div className="mb-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#4A2E1F", color: "#C4956A" }}
                    >
                      {selected.service}
                    </span>
                  </div>
                )}

                <div
                  className="p-4 rounded-xl mb-5"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#1a0f0a" }}>{selected.message}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ background: "#4A2E1F" }}
                  >
                    <Mail size={14} /> Reply via Email
                  </a>
                   <button
                    onClick={() => updateStatus(selected._id, "Replied")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: "#e8f5e9", color: "#2e7d32" }}
                  >
                    <CheckCircle size={14} /> Mark Replied
                  </button>
                  <button
                    onClick={() => updateStatus(selected._id, "Archived")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: "#FDF8F5", color: "#8B5E3C" }}
                  >
                    <Clock size={14} /> Archive
                  </button>
                  <button
                    onClick={() => deleteContact(selected._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: "#fff0f0", color: "#c62828" }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
                >
                  <MessageSquare size={28} style={{ color: "#C4956A" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#1a0f0a" }}>Select a Message</h3>
                <p className="text-sm" style={{ color: "#8B5E3C" }}>
                  Click on a message to view the full details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}