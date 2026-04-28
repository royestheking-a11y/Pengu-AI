import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Clock, ArrowLeft, Calendar, User, Tag, ArrowRight, Share2, BookOpen, Rocket } from "lucide-react";
import { api } from "../utils/api";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [postData, allPosts] = await Promise.all([
          api.get(`posts/slug/${slug}`),
          api.get('posts')
        ]);
        setPost(postData);
        
        // Related posts logic
        const published = allPosts.filter((p: any) => p.published && p._id !== postData._id);
        const related = published.filter((p: any) => p.category === postData.category);
        const others = published.filter((p: any) => p.category !== postData.category);
        setRelatedPosts([...related, ...others].slice(0, 3));
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 pt-16" style={{ background: "var(--pengu-bg)" }}>
        <div>
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
          >
            <BookOpen size={36} style={{ color: "#C4956A" }} />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--pengu-heading)" }}>Article Not Found</h1>
          <p className="mt-2 mb-8 text-sm" style={{ color: "var(--pengu-text-2)" }}>
            This blog post doesn't exist or may have been removed.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-xl text-white inline-flex items-center gap-2 text-sm"
            style={{ background: "#4A2E1F" }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* Hero Image */}
      <div className="w-full relative" style={{ height: "420px", background: "#1a0f0a" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,15,10,0.2) 0%, rgba(26,15,10,0.85) 100%)" }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 mb-5 text-sm transition-opacity hover:opacity-80"
              style={{ color: "#C4956A" }}
            >
              <ArrowLeft size={15} /> Back to Blog
            </button>
            {/* Category badge */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: "#C4956A", color: "#1a0f0a" }}
            >
              {post.category}
            </span>
            <h1
              className="mb-4"
              style={{ fontSize: "2.2rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "rgba(196,149,106,0.85)" }}>
              <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Excerpt highlight */}
            <div
              className="px-5 py-4 rounded-xl mb-8"
              style={{
                background: "var(--pengu-surface)",
                borderLeft: "4px solid #C4956A",
                color: "var(--pengu-text-2)",
              }}
            >
              <p className="text-sm leading-relaxed italic">{post.excerpt}</p>
            </div>

            {/* Main content */}
            <div
              className="text-sm leading-relaxed mb-10"
              style={{ color: "var(--pengu-text)" }}
            >
              {/* Generate multi-paragraph content from the stored content field */}
              {post.content.split(". ").reduce((acc: string[][], sentence: string, i: number) => {
                const paraIndex = Math.floor(i / 3);
                if (!acc[paraIndex]) acc[paraIndex] = [];
                acc[paraIndex].push(sentence);
                return acc;
              }, []).map((sentences: string[], i: number) => (
                <p key={i} className="mb-5 leading-loose">
                  {sentences.join(". ")}{sentences.length > 0 && !sentences[sentences.length - 1].endsWith(".") ? "." : ""}
                </p>
              ))}

              {/* Extended content blocks */}
              <div
                className="my-8 p-5 rounded-xl"
                style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
              >
                <h3
                  className="mb-3 flex items-center gap-2"
                  style={{ color: "var(--pengu-heading)", fontSize: "1.05rem", fontWeight: 700 }}
                >
                  <BookOpen size={18} style={{ color: "#C4956A" }} />
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {[
                    "AI-powered solutions reduce operational costs by up to 60%",
                    "Businesses with digital presence grow 2.8x faster on average",
                    "Automation frees your team to focus on high-value creative work",
                    "Early adopters of AI gain a significant competitive advantage",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--pengu-text-2)" }}>
                      <span className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-xs" style={{ background: "#4A2E1F", fontSize: "9px" }}>✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="leading-loose" style={{ color: "var(--pengu-text)" }}>
                At Pengu, we believe every business deserves access to cutting-edge AI tools — not just the enterprise giants. Our platform is built to democratize AI, helping small and mid-sized businesses compete at the highest level without requiring a large in-house tech team.
              </p>

              <p className="mt-5 leading-loose" style={{ color: "var(--pengu-text)" }}>
                The future belongs to businesses that embrace digital transformation today. Whether you need a stunning website, a powerful mobile app, or an intelligent AI system, Pengu is your all-in-one partner for digital success.
              </p>
            </div>

            {/* Tags & Share */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 pt-6"
              style={{ borderTop: "1px solid var(--pengu-border)" }}
            >
              <div className="flex items-center gap-2">
                <Tag size={14} style={{ color: "var(--pengu-muted)" }} />
                <span className="text-xs" style={{ color: "var(--pengu-muted)" }}>Category:</span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: "var(--pengu-surface)", color: "#4A2E1F", border: "1px solid var(--pengu-border)" }}
                >
                  {post.category}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#4A2E1F", border: "1px solid var(--pengu-border)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#4A2E1F";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#4A2E1F";
                }}
              >
                <Share2 size={13} /> Share Article
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author card */}
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "#4A2E1F" }}
                >
                  <User size={20} style={{ color: "#C4956A" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--pengu-text)" }}>{post.author}</p>
                  <p className="text-xs" style={{ color: "var(--pengu-muted)" }}>AI Content Team</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--pengu-text-2)" }}>
                Our AI-powered editorial team crafts insightful content on AI, automation, and digital business growth.
              </p>
            </div>

            {/* CTA Card */}
            <div
              className="rounded-xl p-5 text-center"
              style={{ background: "#4A2E1F" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(196,149,106,0.2)" }}
              >
                <Rocket size={22} style={{ color: "#C4956A" }} />
              </div>
              <h4 className="text-white font-bold mb-2" style={{ fontSize: "0.95rem" }}>
                Ready to Transform Your Business?
              </h4>
              <p className="text-xs mb-4" style={{ color: "#C4956A" }}>
                Get a free consultation with our AI experts and see what Pengu can do for you.
              </p>
              <Link
                to="/contact"
                className="block text-xs font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
                style={{ background: "#C4956A", color: "#4A2E1F" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Get Free Consultation
              </Link>
            </div>

            {/* Quick stats */}
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--pengu-surface)", border: "1px solid var(--pengu-border)" }}
            >
              <h4 className="text-sm font-semibold mb-3" style={{ color: "var(--pengu-heading)" }}>About This Article</h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--pengu-muted)" }}>Reading Time</span>
                  <span style={{ color: "var(--pengu-text)" }}>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--pengu-muted)" }}>Category</span>
                  <span style={{ color: "var(--pengu-text)" }}>{post.category}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--pengu-muted)" }}>Published</span>
                  <span style={{ color: "var(--pengu-text)" }}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--pengu-heading)" }}
              >
                Related Articles
              </h2>
              <Link
                to="/blog"
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: "#4A2E1F" }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((rp: any) => (
                <Link
                  key={rp._id}
                  to={`/blog/${rp.slug}`}
                  className="group rounded-xl overflow-hidden block transition-all duration-300"
                  style={{
                    background: "var(--pengu-card)",
                    border: "1px solid var(--pengu-border)",
                    boxShadow: "0 2px 8px rgba(74,46,31,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(74,46,31,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(74,46,31,0.06)";
                  }}
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-2"
                      style={{ background: "var(--pengu-surface)", color: "#8B5E3C", border: "1px solid var(--pengu-border)" }}
                    >
                      {rp.category}
                    </span>
                    <h3
                      className="text-sm font-bold leading-snug mb-2"
                      style={{ color: "var(--pengu-text)" }}
                    >
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--pengu-muted)" }}>
                      <Clock size={11} />
                      <span>{rp.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}