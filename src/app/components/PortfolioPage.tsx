import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ExternalLink, ArrowRight } from "lucide-react";
import { api } from "../utils/api";
import { SEO } from "./SEO";



export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const data = await api.get('projects');
      setPortfolio(data);
      
      // Get unique categories from data
      const uniqueCats = ["All", ...new Set(data.map((p: any) => p.category).filter(Boolean) as string[])];
      setCategories(uniqueCats);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeCategory === "All"
    ? portfolio
    : portfolio.filter((p: any) => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      <SEO 
        title="Portfolio"
        description="See our latest AI-powered projects. From automated websites to enterprise applications, discover how Pengu AI transforms businesses."
        keywords="AI Portfolio, Automated Projects, Case Studies"
      />
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "var(--pengu-grad)" }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Our Portfolio
          </span>
          <h1 className="mt-4 mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "var(--pengu-text)", lineHeight: 1.15 }}>
            Work That Speaks for Itself
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
            Real projects. Real results. See how Pengu has transformed businesses across industries with AI-powered solutions.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "#4A2E1F" : "#FDF8F5",
                color: activeCategory === cat ? "#ffffff" : "#4A2E1F",
                border: `1px solid ${activeCategory === cat ? "#4A2E1F" : "rgba(74,46,31,0.15)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--pengu-text-2)" }}>No projects found in this category.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
          {filtered.map((project: any) => (
            <div
              key={project._id}
              className="group rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "var(--pengu-card)",
                border: "1px solid var(--pengu-border)",
                boxShadow: "0 2px 12px rgba(74,46,31,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(74,46,31,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(74,46,31,0.05)";
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(74,46,31,0.6)" }}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <ExternalLink size={20} style={{ color: "#4A2E1F" }} />
                  </div>
                </div>
                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "#4A2E1F", color: "#C4956A" }}
                >
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold mb-2" style={{ color: "var(--pengu-text)", fontSize: "1.1rem" }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--pengu-text-2)", opacity: 0.8 }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{ background: "var(--pengu-surface)", color: "var(--pengu-muted)", border: "1px solid var(--pengu-border)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 800 }}>
            Your Project Could Be Next
          </h2>
          <p className="mb-8" style={{ color: "#C4956A" }}>
            Ready to build something amazing? Let's discuss your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: "#C4956A", color: "#4A2E1F" }}
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}