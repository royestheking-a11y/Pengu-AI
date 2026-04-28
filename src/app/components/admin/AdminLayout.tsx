import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet, Navigate } from "react-router";
import {
  LayoutDashboard, MessageSquare, BookOpen, Briefcase, Star,
  Settings, LogOut, Menu, X, ChevronRight, Wrench, Users, ShieldCheck
} from "lucide-react";
import { api } from "../../utils/api";
import { getFromStorage, saveToStorage } from "../../hooks/useLocalStorage";
const penguLogo = "/pengulogo.png";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages", badge: "pengu_contacts" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog Posts" },
  { href: "/admin/portfolio", icon: Briefcase, label: "Portfolio" },
  { href: "/admin/careers", icon: ShieldCheck, label: "Job Postings" },
  { href: "/admin/applications", icon: Users, label: "Applications" },
  { href: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { href: "/admin/services", icon: Wrench, label: "Services" },
  { href: "/admin/subscribers", icon: Users, label: "Subscribers" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

function useAdminAuth() {
  const auth = getFromStorage<any>("pengu_admin_auth", null);
  return auth?.authenticated === true;
}

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const isAuthenticated = useAdminAuth();

  useEffect(() => {
    api.get('settings').then(setSettings).catch(console.error);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    saveToStorage("pengu_admin_auth", null);
    navigate("/admin");
  };

  const getBadgeCount = (key: string) => {
    return 0; // Handled by individual pages or a global state in future
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#FDF8F5" }}>
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ background: "#ffffff", borderRight: "1px solid rgba(74,46,31,0.08)" }}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(74,46,31,0.08)" }}>
            <Link to="/" className="flex items-center gap-2">
              <img src={settings?.siteLogo || penguLogo} alt={settings?.siteName || "Pengu"} className="h-12 w-auto" />
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: "#C4956A" }}>
              <X size={18} />
            </button>
          </div>

          {/* Admin Badge */}
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(74,46,31,0.05)" }}>
            <div
              className="text-xs px-3 py-2 rounded-lg text-center flex items-center justify-center gap-1.5"
              style={{ background: "#FDF8F5", color: "#8B5E3C", border: "1px solid rgba(74,46,31,0.1)" }}
            >
              <ShieldCheck size={12} />
              Admin Control Panel
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const badgeCount = item.badge ? getBadgeCount(item.badge) : 0;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                    style={{
                      background: isActive ? "#FDF8F5" : "transparent",
                      color: isActive ? "#4A2E1F" : "#8B5E3C",
                      border: isActive ? "1px solid rgba(74,46,31,0.1)" : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "#FDF8F5";
                        (e.currentTarget as HTMLElement).style.color = "#4A2E1F";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#8B5E3C";
                      }
                    }}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {badgeCount > 0 && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                        style={{ background: "#C4956A", color: "#4A2E1F" }}
                      >
                        {badgeCount}
                      </span>
                    )}
                    {isActive && <ChevronRight size={14} />}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="px-3 pb-4" style={{ borderTop: "1px solid rgba(74,46,31,0.08)" }}>
            <div className="pt-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-2 transition-colors duration-150"
                style={{ color: "#8B5E3C" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4A2E1F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B5E3C")}
              >
                <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
                View Website
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                style={{ color: "#ef4444" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#fef2f2")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </aside>
      </>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-4 lg:px-6 py-4 sticky top-0 z-30"
          style={{ background: "#ffffff", borderBottom: "1px solid rgba(74,46,31,0.08)", boxShadow: "0 1px 4px rgba(74,46,31,0.06)" }}
        >
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setSidebarOpen(true)}
            style={{ color: "#4A2E1F" }}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-semibold" style={{ color: "#1a0f0a" }}>
              {navItems.find((n) => n.href === location.pathname)?.label || "Admin Panel"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "#4A2E1F", color: "#C4956A" }}
            >
              A
            </div>
            <span className="text-xs hidden sm:block" style={{ color: "#8B5E3C" }}>Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}