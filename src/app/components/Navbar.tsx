import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, Moon, Sun, Megaphone } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { api } from "../utils/api";
import { Drawer } from "vaul";

const penguLogo = "/pengulogo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    Promise.all([
      api.get('services'),
      api.get('settings')
    ]).then(([sData, setts]) => {
      setServices(sData.filter((s: any) => s.active));
      setSettings(setts);
    }).catch(console.error);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: "Services", 
      href: "/services",
      children: services.map(s => ({
        label: s.title,
        href: `/services/${s.slug}`
      }))
    },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Partner Program", href: "/partner" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Announcement bar from settings
  const showAnnouncement = settings?.announcementBarActive && settings?.announcementBar;
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && !announcementDismissed && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white"
          style={{ background: "#4A2E1F" }}
        >
          <Megaphone size={13} style={{ color: "#C4956A", flexShrink: 0 }} />
          <span>{settings.announcementBar}</span>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={13} />
          </button>
        </div>
      )}

    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: showAnnouncement && !announcementDismissed ? "32px" : "0",
        background: scrolled
          ? isDark ? "rgba(15,8,6,0.92)" : "rgba(255,255,255,0.92)"
          : "transparent",
        boxShadow: scrolled ? "var(--pengu-shadow-md)" : "none",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,149,106,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Increased height for premium feel */}
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={settings?.siteLogo || penguLogo}
              alt={settings?.siteName || "Pengu"}
              className="h-16 w-auto"
              style={{ filter: isDark && !settings?.siteLogo ? "brightness(0) invert(1)" : "none" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm transition-all duration-300"
                    style={{ color: "var(--pengu-heading)" }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div
                    className="absolute top-full left-0 mt-2 w-56 rounded-2xl overflow-hidden transition-all duration-400"
                    style={{
                      background: "var(--pengu-bg)",
                      boxShadow: "var(--pengu-shadow-lg)",
                      border: "1px solid var(--pengu-border)",
                      opacity: servicesOpen ? 1 : 0,
                      transform: servicesOpen ? "translateY(0)" : "translateY(-12px)",
                      pointerEvents: servicesOpen ? "auto" : "none",
                    }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="p-1.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm rounded-xl transition-all duration-200"
                          style={{ color: "var(--pengu-heading)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "var(--pengu-surface)";
                            (e.currentTarget as HTMLElement).style.color = "#C4956A";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--pengu-heading)";
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-2 rounded-xl text-sm transition-all duration-300"
                  style={{
                    color: location.pathname === link.href ? "#ffffff" : "var(--pengu-heading)",
                    background: location.pathname === link.href ? "#4A2E1F" : "transparent",
                    fontWeight: location.pathname === link.href ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.href) {
                      (e.currentTarget as HTMLElement).style.background = "var(--pengu-surface)";
                      (e.currentTarget as HTMLElement).style.color = "#C4956A";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.href) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--pengu-heading)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Dark Mode Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                color: "var(--pengu-muted)",
                border: "1px solid var(--pengu-border)",
                background: "var(--pengu-bg)",
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#4A2E1F";
                (e.currentTarget as HTMLElement).style.color = "#4A2E1F";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--pengu-shadow-sm)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--pengu-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--pengu-muted)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/contact"
              className="premium-shimmer px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: "#4A2E1F" }}
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile: Dark mode toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg"
              style={{ color: "var(--pengu-heading)" }}
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: "var(--pengu-heading)" }}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Vaul) */}
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
          <Drawer.Content 
            className="fixed bottom-0 left-0 right-0 z-[101] flex flex-col rounded-t-[32px] outline-none"
            style={{ background: "var(--pengu-bg)", borderTop: "1px solid var(--pengu-border)" }}
          >
            <div className="flex-1 overflow-y-auto p-6 pb-10">
              <div className="mx-auto mb-6 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <div key={link.label} className="py-1">
                    <Link
                      to={link.href}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200"
                      style={{
                        background: location.pathname === link.href ? "var(--pengu-surface)" : "transparent",
                        color: location.pathname === link.href ? "#4A2E1F" : "var(--pengu-heading)",
                        fontWeight: location.pathname === link.href ? 700 : 500,
                        fontSize: "1.05rem"
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      {location.pathname === link.href && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C4956A" }} />}
                    </Link>
                    
                    {link.children && (
                      <div className="mt-2 pl-4 grid grid-cols-1 gap-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="px-4 py-2 text-sm rounded-xl"
                            style={{ color: "var(--pengu-muted)" }}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-dashed" style={{ borderColor: "var(--pengu-border)" }}>
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full py-4 rounded-2xl text-white font-bold shadow-lg"
                  style={{ background: "#4A2E1F" }}
                  onClick={() => setIsOpen(false)}
                >
                  Get Started Free
                </Link>
                <div className="mt-4 flex items-center justify-between px-4">
                  <span className="text-sm font-medium" style={{ color: "var(--pengu-muted)" }}>Appearance</span>
                  <button
                    onClick={toggle}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                    style={{
                      color: "var(--pengu-heading)",
                      border: "1px solid var(--pengu-border)",
                      background: "var(--pengu-surface)",
                    }}
                  >
                    {isDark ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
                  </button>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </nav>
    </>
  );
}