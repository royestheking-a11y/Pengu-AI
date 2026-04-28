import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Clock, ArrowRight, Search, FileSearch } from "lucide-react";
import { api } from "../utils/api";

const categories = ["All", "Business", "AI & Automation", "Marketing", "Technology"];

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.get('posts');
        setPosts(data.filter((p: any) => p.published));
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((post: any) => {
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [featured, ...rest] = filtered;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#C4956A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "var(--pengu-grad)" }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Blog & Resources
          </span>
          <h1 className="mt-4 mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "var(--pengu-text)", lineHeight: 1.15 }}>
            Insights from the AI Frontier
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
            Actionable strategies, AI trends, and business growth tips from the Pengu team.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--pengu-muted)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-xl outline-none text-sm"
              style={{
                background: "var(--pengu-card)",
                border: "1px solid var(--pengu-border-mid)",
                color: "var(--pengu-text)",
              }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "#4A2E1F" : "var(--pengu-surface)",
                color: activeCategory === cat ? "#ffffff" : "var(--pengu-heading)",
                border: `1px solid ${activeCategory === cat ? "#4A2E1F" : "var(--pengu-border)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
            >
              <FileSearch size={28} style={{ color: "var(--pengu-muted)" }} />
            </div>
            <h3 className="font-bold mb-2" style={{ color: "var(--pengu-text)" }}>No articles found</h3>
            <p style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>Try a different search term or category</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div
                className="group rounded-2xl overflow-hidden mb-10 grid lg:grid-cols-2 transition-all duration-300"
                style={{
                  background: "var(--pengu-card)",
                  border: "1px solid var(--pengu-border)",
                  boxShadow: "0 4px 24px rgba(74,46,31,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(74,46,31,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(74,46,31,0.07)";
                }}
              >
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#4A2E1F", color: "#C4956A" }}
                  >
                    Featured
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-4 w-fit"
                    style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid var(--pengu-border)" }}
                  >
                    {featured.category}
                  </span>
                  <h2 className="mb-3" style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--pengu-text)" }}>
                    {featured.title}
                  </h2>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs" style={{ color: "var(--pengu-muted)" }}>
                      <span>{featured.author}</span>
                      <span>·</span>
                      <Clock size={12} />
                      <span>{featured.readTime}</span>
                      <span>·</span>
                      <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="flex items-center gap-1 text-sm font-medium transition-colors duration-150"
                      style={{ color: "#4A2E1F" }}
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post: any) => (
                <div
                  key={post._id}
                  className="group rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "var(--pengu-card)",
                    border: "1px solid var(--pengu-border)",
                    boxShadow: "0 2px 12px rgba(74,46,31,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(74,46,31,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(74,46,31,0.05)";
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#4A2E1F", color: "#C4956A" }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-2 leading-snug" style={{ color: "var(--pengu-text)" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs" style={{ color: "var(--pengu-muted)" }}>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-1 font-medium transition-colors duration-150"
                        style={{ color: "#4A2E1F" }}
                      >
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4" style={{ fontSize: "1.8rem", fontWeight: 800 }}>
            Want AI Growth Tips in Your Inbox?
          </h2>
          <p className="mb-6" style={{ color: "#C4956A" }}>
            Join 10,000+ business owners getting weekly AI and automation insights.
          </p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(196,149,106,0.4)", color: "#ffffff" }}
            />
            <button
              className="px-5 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "#C4956A", color: "#4A2E1F" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}