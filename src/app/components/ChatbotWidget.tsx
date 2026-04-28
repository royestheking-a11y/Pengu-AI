import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Minimize2 } from "lucide-react";
const penguLogo = "/pengulogo.png";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

const PENGU_RESPONSES: Record<string, string> = {
  greeting: "Hello! I'm Pengu AI, your intelligent assistant. I can help you with information about our services, pricing, portfolio, and more. What can I help you with today?",
  services: "We offer 6 core digital services:\n\n**Website Development** — Landing pages, business sites, e-commerce\n**Mobile App Development** — iOS & Android, SaaS apps\n**AI & Chatbots** — GPT-powered bots, LLM integrations\n**Automation Systems** — CRM automation, smart workflows\n**SaaS & Dashboards** — Analytics, admin systems\n**Branding & Design** — Logo, UI/UX, brand identity\n\nWhich service interests you most?",
  pricing: "Our pricing plans:\n\n**Starter** — $299/month\nBusiness website, AI chatbot, basic automation\n\n**Business** — $799/month\nWebsite + App, 5 AI chatbots, unlimited automations, CRM\n\n**Enterprise** — Custom pricing\nFull AI platform, dedicated team, white-label solutions\n\nWould you like more details on any plan?",
  contact: "You can reach us at:\n\nEmail: pengui.org@gmail.com\nPhone: 0134-3042761\nLocation: 221B Baker Street, London | Dhaka, Bangladesh\n\nVisit our Contact page to submit a project inquiry. We typically respond within 2 hours.",
  portfolio: "We've delivered 100+ successful projects including:\n\n**TechStore** — E-Commerce with 300% revenue increase\n**HealthTrack** — Mobile app with 50K+ users\n**SalesAI CRM** — Reduced manual work by 70%\n**RetailBot** — Handles 10K+ queries daily\n\nVisit our Portfolio page for the full showcase.",
  ai: "Our AI Platform includes:\n\n**AI Chatbot Builder** — GPT-4 powered\n**AI Content Generator** — Multi-language support\n**Automation Workflow Engine** — Visual builder\n**Real-time Analytics** — Smart business insights\n\nAll AI features are included in our Business and Enterprise plans.",
  timeline: "Our typical delivery timelines:\n\n**Landing Page:** 3–5 days\n**Business Website:** 1–2 weeks\n**Mobile App:** 3–6 weeks\n**AI Chatbot:** 5–7 days\n**Automation System:** 1–3 weeks\n\nWe pride ourselves on fast, quality delivery.",
  about: "Pengu is a no-human AI company that uses artificial intelligence to build, automate, and scale digital businesses. Founded in 2022, we've served 500+ clients worldwide and delivered 100+ successful projects.\n\nOur mission: Make enterprise-level AI accessible to every business.",
  default: "I'm here to help you learn about Pengu's services. You can ask me about:\n\n- Our **services** and what we offer\n- **Pricing** plans\n- **Portfolio** and case studies\n- **Contact** details\n- **Timelines** for delivery\n- Our **AI platform**\n\nWhat would you like to know?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (/^(hi|hello|hey|good|greet|sup|yo|howdy)/i.test(lower)) return PENGU_RESPONSES.greeting;
  if (/service|offer|what do you|build|develop|create/i.test(lower)) return PENGU_RESPONSES.services;
  if (/price|pricing|cost|how much|plan|package|rate|fee/i.test(lower)) return PENGU_RESPONSES.pricing;
  if (/contact|reach|email|phone|location|address|talk|speak/i.test(lower)) return PENGU_RESPONSES.contact;
  if (/portfolio|work|project|case|example|client|built|made/i.test(lower)) return PENGU_RESPONSES.portfolio;
  if (/ai|chatbot|automation|gpt|machine learning|artificial/i.test(lower)) return PENGU_RESPONSES.ai;
  if (/how long|timeline|when|delivery|deadline|fast|speed|quick/i.test(lower)) return PENGU_RESPONSES.timeline;
  if (/about|who|pengu|company|team|founded|history/i.test(lower)) return PENGU_RESPONSES.about;
  return PENGU_RESPONSES.default;
}

const QUICK_REPLIES = ["Services", "Pricing", "Portfolio", "Contact Us", "Timelines"];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hello! I'm **Pengu AI**, your intelligent assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Pulse notification after 5s if not opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setUnread(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botText = getResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: botText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      if (!isOpen) setUnread((n) => n + 1);
    }, 1000 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Render text with simple bold markdown
  const renderText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div
      className="fixed z-[9999]"
      style={{ bottom: "24px", right: "24px" }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div
          className="mb-4 rounded-2xl overflow-hidden flex flex-col"
          style={{
            width: "360px",
            height: isMinimized ? "60px" : "500px",
            background: "var(--pengu-bg)",
            border: "1px solid var(--pengu-border-mid)",
            boxShadow: "0 20px 60px rgba(74,46,31,0.25)",
            transition: "height 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "#4A2E1F" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img src={penguLogo} alt="Pengu" className="h-10 w-10 rounded-full brightness-0 invert object-contain" />
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: "#4ade80", borderColor: "#4A2E1F" }}
                />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">Pengu AI</p>
                <p className="text-xs" style={{ color: "#C4956A" }}>Always online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized((m) => !m)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "#C4956A" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(196,149,106,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "#C4956A" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(196,149,106,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
                style={{ background: "var(--pengu-surface)" }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "bot" && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "#4A2E1F" }}
                      >
                        <Bot size={14} className="text-white" />
                      </div>
                    )}
                    <div
                      className="max-w-[78%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed"
                      style={{
                        background: msg.role === "user" ? "#4A2E1F" : "var(--pengu-card)",
                        color: msg.role === "user" ? "#ffffff" : "var(--pengu-text)",
                        borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        border: msg.role === "bot" ? "1px solid var(--pengu-border)" : "none",
                      }}
                    >
                      {renderText(msg.text)}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#4A2E1F" }}
                    >
                      <Bot size={14} className="text-white" />
                    </div>
                    <div
                      className="px-3 py-2.5 rounded-2xl"
                      style={{
                        background: "var(--pengu-card)",
                        border: "1px solid var(--pengu-border)",
                        borderRadius: "18px 18px 18px 4px",
                      }}
                    >
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "#8B5E3C",
                              animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              <div
                className="px-3 py-2 flex gap-1.5 overflow-x-auto shrink-0"
                style={{
                  background: "var(--pengu-surface)",
                  borderTop: "1px solid var(--pengu-border)",
                }}
              >
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="shrink-0 text-xs px-2.5 py-1 rounded-full transition-all duration-150 whitespace-nowrap"
                    style={{
                      background: "var(--pengu-bg)",
                      color: "#4A2E1F",
                      border: "1px solid var(--pengu-border-mid)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#4A2E1F";
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--pengu-bg)";
                      (e.currentTarget as HTMLElement).style.color = "#4A2E1F";
                    }}
                  >
                    {qr}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-3 py-3 shrink-0"
                style={{
                  background: "var(--pengu-bg)",
                  borderTop: "1px solid var(--pengu-border)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "var(--pengu-surface)",
                    border: "1px solid var(--pengu-border)",
                    color: "var(--pengu-text)",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150"
                  style={{
                    background: input.trim() ? "#4A2E1F" : "var(--pengu-surface)",
                    color: input.trim() ? "#ffffff" : "var(--pengu-muted)",
                    border: "1px solid var(--pengu-border)",
                  }}
                >
                  <Send size={13} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* FAB Toggle Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative ml-auto"
        style={{
          background: "#4A2E1F",
          transform: isOpen ? "scale(0.9)" : "scale(1)",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
        {!isOpen && unread > 0 && (
          <div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white animate-pulse"
            style={{ background: "#C4956A", fontSize: "10px", fontWeight: 700 }}
          >
            {unread}
          </div>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}