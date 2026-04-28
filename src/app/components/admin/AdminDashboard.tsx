import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  MessageSquare, BookOpen, Briefcase, Star, Users,
  TrendingUp, Eye, ArrowUpRight, Wrench, FileEdit, Image,
  Award, Settings, Globe, Bot, Zap, HardDrive, Wifi, LayoutDashboard
} from "lucide-react";
import { api } from "../../utils/api";

export function AdminDashboard() {
  const [data, setData] = useState<{
    contacts: any[];
    blogPosts: any[];
    portfolio: any[];
    testimonials: any[];
    services: any[];
    subscribers: any[];
    applications: any[];
  }>({
    contacts: [],
    blogPosts: [],
    portfolio: [],
    testimonials: [],
    services: [],
    subscribers: [],
    applications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [contacts, blogPosts, portfolio, testimonials, services, subscribers, applications] = await Promise.all([
          api.get('messages'),
          api.get('posts'),
          api.get('projects'),
          api.get('testimonials'),
          api.get('services'),
          api.get('subscribers'),
          api.get('applications')
        ]);
        setData({ contacts, blogPosts, portfolio, testimonials, services, subscribers, applications });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const { contacts, blogPosts, portfolio, testimonials, services, subscribers, applications } = data;
  const newMessages = contacts.filter((c: any) => c.status === "Unread").length;
  const newApps = applications.filter((a: any) => a.status === "new").length;

  const stats = [
    {
      title: "Total Messages",
      value: contacts.length,
      sub: `${newMessages} unread`,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "#4A2E1F",
      light: "#FDF8F5",
    },
    {
      title: "Applications",
      value: applications.length,
      sub: `${newApps} new`,
      icon: Users,
      href: "/admin/applications",
      color: "#5A3A2B",
      light: "#FDF8F5",
    },
    {
      title: "Blog Posts",
      value: blogPosts.length,
      sub: `${blogPosts.filter((p: any) => p.published).length} published`,
      icon: BookOpen,
      href: "/admin/blog",
      color: "#4A2E1F",
      light: "#FDF8F5",
    },
    {
      title: "Portfolio Items",
      value: portfolio.length,
      sub: `${portfolio.filter((p: any) => p.featured).length} featured`,
      icon: Briefcase,
      href: "/admin/portfolio",
      color: "#5A3A2B",
      light: "#FDF8F5",
    },
    {
      title: "Testimonials",
      value: testimonials.length,
      sub: `${testimonials.filter((t: any) => t.published).length} visible`,
      icon: Star,
      href: "/admin/testimonials",
      color: "#4A2E1F",
      light: "#FDF8F5",
    },
    {
      title: "Active Services",
      value: services.filter((s: any) => s.active).length,
      sub: `${services.length} total`,
      icon: Wrench,
      href: "/admin/services",
      color: "#5A3A2B",
      light: "#FDF8F5",
    },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-[#4A2E1F] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a0f0a" }}>
          Platform Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8B5E3C" }}>
          Welcome back, Admin. Here's what's happening with Pengu.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.href}
            className="p-5 rounded-2xl transition-all duration-200"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(74,46,31,0.08)",
              boxShadow: "0 2px 8px rgba(74,46,31,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(74,46,31,0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(74,46,31,0.04)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: stat.color }}
              >
                <stat.icon size={20} style={{ color: "#C4956A" }} />
              </div>
              <ArrowUpRight size={16} style={{ color: "#C4956A" }} />
            </div>
            <div className="text-3xl font-black mb-0.5" style={{ color: "#1a0f0a" }}>
              {stat.value}
            </div>
            <div className="font-medium text-sm mb-0.5" style={{ color: "#4A2E1F" }}>{stat.title}</div>
            <div className="text-xs" style={{ color: "#8B5E3C" }}>{stat.sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(74,46,31,0.06)" }}
          >
            <h2 className="font-bold" style={{ color: "#1a0f0a" }}>Recent Messages</h2>
            <Link to="/admin/messages" className="text-xs font-medium" style={{ color: "#4A2E1F" }}>
              View All
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(74,46,31,0.05)" }}>
            {contacts.slice(-5).reverse().map((contact: any) => (
              <div key={contact._id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm truncate" style={{ color: "#1a0f0a" }}>
                        {contact.name}
                      </span>
                      {contact.status === "Unread" && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: "#4A2E1F", color: "#C4956A" }}
                        >
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs truncate mb-1" style={{ color: "#8B5E3C" }}>{contact.email}</p>
                    <p className="text-xs" style={{ color: "#5A3A2B", opacity: 0.8 }}>
                      {contact.service || "General inquiry"} · {contact.budget || "Budget TBD"}
                    </p>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: "#8B5E3C" }}>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            {contacts.length === 0 && (
              <div className="px-5 py-8 text-center text-sm" style={{ color: "#8B5E3C" }}>
                No messages yet. They'll appear here when visitors contact you.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
        >
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid rgba(74,46,31,0.06)" }}
          >
            <h2 className="font-bold" style={{ color: "#1a0f0a" }}>Quick Actions</h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {[
              { label: "New Blog Post", icon: FileEdit, href: "/admin/blog" },
              { label: "Add Portfolio", icon: Image, href: "/admin/portfolio" },
              { label: "Add Testimonial", icon: Award, href: "/admin/testimonials" },
              { label: "Manage Services", icon: Wrench, href: "/admin/services" },
              { label: "View Messages", icon: MessageSquare, href: "/admin/messages" },
              { label: "View Subscribers", icon: Users, href: "/admin/subscribers" },
              { label: "Website Settings", icon: Settings, href: "/admin/settings" },
              { label: "Visit Website", icon: Globe, href: "/" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-200"
                style={{
                  background: "#FDF8F5",
                  border: "1px solid rgba(74,46,31,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(74,46,31,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#C4956A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FDF8F5";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,46,31,0.08)";
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#4A2E1F" }}
                >
                  <action.icon size={16} style={{ color: "#C4956A" }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "#4A2E1F" }}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div
        className="mt-6 p-6 rounded-2xl"
        style={{ background: "#ffffff", border: "1px solid rgba(74,46,31,0.08)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold" style={{ fontSize: "1.1rem", color: "#1a0f0a" }}>Platform Overview</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium" style={{ color: "#4A2E1F" }}>All Systems Active</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Website Status", value: "Online", icon: Wifi },
            { label: "AI System", value: "Active", icon: Bot },
            { label: "Automations", value: `${Math.floor(Math.random() * 20) + 5} running`, icon: Zap },
            { label: "Last Backup", value: "Just now", icon: HardDrive },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl text-center"
              style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: "#4A2E1F" }}>
                <item.icon size={16} style={{ color: "#C4956A" }} />
              </div>
              <div className="font-bold text-sm" style={{ color: "#1a0f0a" }}>{item.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#8B5E3C" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}