import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, User, AlertTriangle, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { saveToStorage } from "../../hooks/useLocalStorage";
const penguLogo = "/pengulogo.png";
const penguImg = "/penguimg.png";

// Credentials are now managed via Environment Variables: VITE_ADMIN_USER & VITE_ADMIN_PASS
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "pengu2024";

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        saveToStorage("pengu_admin_auth", { authenticated: true, loginTime: Date.now() });
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ background: "linear-gradient(135deg, #FDF8F5 0%, #ffffff 100%)", overflow: "hidden" }}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px]"
          style={{ background: "#4A2E1F" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[150px]"
          style={{ background: "#C4956A" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(74,46,31,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,46,31,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ 
          background: "rgba(255, 255, 255, 0.8)", 
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(74, 46, 31, 0.08)",
          boxShadow: "0 40px 100px rgba(74,46,31,0.12), inset 0 1px 1px rgba(255,255,255,1)" 
        }}
      >
        {/* Top glowing line */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #4A2E1F, #C4956A, #4A2E1F)" }} />

        {/* Back to Website */}
        <div className="absolute top-6 left-6 z-10">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200"
            style={{ color: "#C4956A" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4A2E1F")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#C4956A")}
          >
            <ArrowLeft size={14} />
            Back to Website
          </Link>
        </div>

        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src={penguLogo} alt="Pengu" className="h-14 w-auto drop-shadow-sm" />
            </div>
            <div
              className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ background: "#FDF8F5", color: "#8B5E3C", border: "1px solid rgba(196,149,106,0.3)" }}
            >
              <ShieldCheck size={12} style={{ color: "#C4956A" }} />
              <span className="font-medium tracking-wide">SECURE ADMIN PORTAL</span>
            </div>
          </div>

          <h2 className="text-center mb-2" style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1a0f0a", letterSpacing: "-0.02em" }}>
            Welcome Back
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "#8B5E3C" }}>
            Enter your credentials to access the platform
          </p>

          {error && (
            <div
              className="mb-6 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
              style={{ background: "#fff0f0", border: "1px solid #ffcdd2", color: "#c62828" }}
            >
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold mb-2 tracking-wide" style={{ color: "#4A2E1F" }}>
                USERNAME
              </label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: "#8B5E3C" }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "#FDF8F5",
                    border: "1px solid rgba(74,46,31,0.15)",
                    color: "#1a0f0a",
                    boxShadow: "inset 0 2px 4px rgba(74,46,31,0.02)"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#4A2E1F";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(74,46,31,0.15)";
                    e.currentTarget.style.background = "#FDF8F5";
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2 tracking-wide" style={{ color: "#4A2E1F" }}>
                PASSWORD
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: "#8B5E3C" }} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "#FDF8F5",
                    border: "1px solid rgba(74,46,31,0.15)",
                    color: "#1a0f0a",
                    boxShadow: "inset 0 2px 4px rgba(74,46,31,0.02)"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#4A2E1F";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(74,46,31,0.15)";
                    e.currentTarget.style.background = "#FDF8F5";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200 hover:text-black"
                  style={{ color: "#8B5E3C" }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-2xl font-bold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{ 
                background: "linear-gradient(135deg, #4A2E1F 0%, #2d1a10 100%)",
                boxShadow: "0 8px 20px rgba(74,46,31,0.25)"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(74,46,31,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(74,46,31,0.25)";
                }
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
              
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <Lock size={16} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

        </div>
      </div>
      
      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}