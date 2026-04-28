import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Upload } from "lucide-react";
import { api } from "../../utils/api";
import { toast } from "sonner";

const categories = ["Business", "AI & Automation", "Marketing", "Technology", "Case Study"];

const emptyPost = {
  title: "",
  slug: "",
  category: "Business",
  excerpt: "",
  content: "",
  author: "Pengu AI",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  published: true,
};

export function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.get('posts');
      setPosts(data);
    } catch (err) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const filtered = posts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing({ ...emptyPost });
  };

  const openEdit = (post: any) => {
    setEditing({ ...post });
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
    const postData = { ...editing, slug };
    
    try {
      if (editing._id) {
        const res = await api.patch(`posts/${editing._id}`, postData);
        setPosts(posts.map((p) => p._id === editing._id ? res : p));
        toast.success("Post updated");
      } else {
        const res = await api.post('posts', postData);
        setPosts([res, ...posts]);
        toast.success("Post created");
      }
      setEditing(null);
    } catch (err) {
      toast.error("Failed to save post");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (post: any) => {
    try {
      const res = await api.patch(`posts/${post._id}`, { published: !post.published });
      setPosts(posts.map((p) => p._id === post._id ? res : p));
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a0f0a" }}>Blog Posts</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8B5E3C" }}>
            {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: "#4A2E1F" }}
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B5E3C" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.12)", color: "#1a0f0a" }}
        />
      </div>

      {/* Posts table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.06)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#8B5E3C" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(74,46,31,0.04)" }}>
              {filtered.map((post) => (
                <tr key={post._id} className="hover:bg-[#FAFAF8] transition-colors duration-100">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={post.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <div>
                        <p className="font-medium text-sm" style={{ color: "#1a0f0a" }}>{post.title}</p>
                        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#8B5E3C" }}>{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#FDF8F5", color: "#8B5E3C", border: "1px solid rgba(74,46,31,0.08)" }}>
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#8B5E3C" }}>
                    {new Date(post.createdAt || post.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        background: post.published ? "#4A2E1F" : "#FDF8F5",
                        color: post.published ? "#C4956A" : "#8B5E3C",
                      }}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(post)}
                        className="p-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: "#4A2E1F" }}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => togglePublish(post)}
                        className="p-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: post.published ? "#8B5E3C" : "#4A2E1F" }}
                        title={post.published ? "Unpublish" : "Publish"}
                      >
                        {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => remove(post._id)}
                        className="p-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: "#c62828" }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm" style={{ color: "#8B5E3C" }}>
                    No posts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: "#ffffff", maxHeight: "90vh" }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: "#FDF8F5", borderBottom: "1px solid rgba(74,46,31,0.08)" }}
            >
              <h2 className="font-bold" style={{ color: "#1a0f0a" }}>
                {editing._id ? "Edit Post" : "New Blog Post"}
              </h2>
              <button onClick={() => setEditing(null)} style={{ color: "#4A2E1F" }}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Title *</label>
                    <input
                      type="text"
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                      placeholder="Article title"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
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
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Read Time</label>
                    <input
                      type="text"
                      value={editing.readTime}
                      onChange={(e) => setEditing({ ...editing, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
                  </div>
                  <div className="col-span-2">
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
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Excerpt</label>
                    <textarea
                      value={editing.excerpt}
                      onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                      placeholder="Short description..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#4A2E1F" }}>Content</label>
                    <textarea
                      value={editing.content}
                      onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                      placeholder="Full article content..."
                      rows={6}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.15)", color: "#1a0f0a" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={editing.published}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    />
                    <label htmlFor="published" className="text-sm" style={{ color: "#4A2E1F" }}>Publish immediately</label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="px-6 py-4 flex justify-end gap-3"
              style={{ borderTop: "1px solid rgba(74,46,31,0.08)" }}
            >
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded-xl text-sm"
                style={{ background: "#FDF8F5", color: "#4A2E1F" }}
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-5 py-2 rounded-xl text-sm text-white"
                style={{ background: "#4A2E1F" }}
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
