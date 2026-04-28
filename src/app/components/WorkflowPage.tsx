import { Link } from "react-router";
import {
  ArrowRight, Play, CheckCircle, Zap, Clock, BarChart3,
  Target, MousePointerClick, TrendingUp, ShoppingCart, HeadphonesIcon,
  Share2, FileText, Bot, MessageSquare, Database, Mail, Bell, Users
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    icon: Target,
    title: "Trigger",
    desc: "Define what starts your workflow",
    examples: ["New form submission", "Purchase completed", "User signed up", "API event received", "Scheduled time"],
    color: "#C4956A",
  },
  {
    step: "02",
    icon: Zap,
    title: "Action",
    desc: "What happens automatically",
    examples: ["Send WhatsApp message", "Add to CRM", "Send email", "Update database", "Generate PDF report"],
    color: "#8B5E3C",
  },
  {
    step: "03",
    icon: CheckCircle,
    title: "Result",
    desc: "The outcome for your business",
    examples: ["Lead nurtured", "Customer retained", "Data synced", "Team notified", "Revenue tracked"],
    color: "#4A2E1F",
  },
];

const automationTemplates = [
  {
    title: "Lead Generation Pipeline",
    icon: Target,
    steps: ["Visitor fills contact form", "Pengu AI qualifies lead", "WhatsApp message sent", "Added to CRM", "Follow-up email sequence started"],
    time: "2 minutes setup",
  },
  {
    title: "E-Commerce Automation",
    icon: ShoppingCart,
    steps: ["Order placed", "Payment confirmed via Stripe", "Invoice generated", "Shipping notification sent", "Follow-up review request"],
    time: "5 minutes setup",
  },
  {
    title: "Customer Support",
    icon: HeadphonesIcon,
    steps: ["Customer sends message", "AI chatbot responds instantly", "Complex issues escalated", "Ticket created in CRM", "Resolution confirmed"],
    time: "3 minutes setup",
  },
  {
    title: "Social Media Scheduler",
    icon: Share2,
    steps: ["AI generates content", "Images created", "Posts scheduled", "Published to all platforms", "Analytics tracked"],
    time: "1 minute setup",
  },
];

const flowSteps = [
  { icon: FileText, label: "TRIGGER", title: "New Contact Form Submitted", desc: "When visitor fills the contact form on pengu.ai", color: "#C4956A" },
  { icon: Bot, label: "ACTION 1", title: "AI Qualifies the Lead", desc: "Pengu AI analyzes the lead and scores them (High/Medium/Low)", color: "#8B5E3C" },
  { icon: MessageSquare, label: "ACTION 2", title: "Send WhatsApp Message", desc: "Auto-send personalized WhatsApp within 2 minutes of form submission", color: "#5A3A2B" },
  { icon: Database, label: "ACTION 3", title: "Add to CRM Pipeline", desc: "Create contact record and move to 'New Leads' pipeline stage", color: "#4A2E1F" },
  { icon: Mail, label: "ACTION 4", title: "Start Email Sequence", desc: "Begin 5-day automated follow-up email sequence", color: "#4A2E1F" },
  { icon: CheckCircle, label: "RESULT", title: "Lead Nurtured Automatically", desc: "Sales team receives notification only when lead shows buying intent", color: "#4A2E1F" },
];

const stats = [
  { icon: Clock, value: "40hrs", label: "Avg. hours saved per week" },
  { icon: Zap, value: "10x", label: "Faster task completion" },
  { icon: CheckCircle, value: "99.9%", label: "Automation reliability" },
  { icon: BarChart3, value: "250%", label: "Average productivity boost" },
];

export function WorkflowPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--pengu-bg)" }}>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "linear-gradient(135deg, #FDF8F5 0%, #ffffff 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "var(--pengu-bg)", color: "var(--pengu-muted)", border: "1px solid #C4956A" }}>
            Workflow & Automation
          </span>
          <h1 className="mt-4 mb-4" style={{ fontSize: "3rem", fontWeight: 800, color: "#1a0f0a", lineHeight: 1.15 }}>
            Automate Everything.
            <br />
            <span style={{ color: "#4A2E1F" }}>Focus on What Matters.</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Build powerful automation workflows in minutes with our visual builder.
            No code required. Just drag, drop, and let Pengu handle the rest.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl"
              style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: "#4A2E1F" }}>
                <stat.icon size={20} style={{ color: "#C4956A" }} />
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: "#4A2E1F" }}>{stat.value}</div>
              <div className="text-xs" style={{ color: "#8B5E3C" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0f0a" }}>
            How Automation Works
          </h2>
          <p className="mt-3" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Every automation follows a simple 3-step flow: Trigger → Action → Result
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div
            className="absolute top-16 left-[20%] right-[20%] h-0.5 hidden lg:block"
            style={{ background: "linear-gradient(90deg, #C4956A, #8B5E3C, #4A2E1F)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step, i) => (
              <div key={step.step} className="relative">
                {/* Step card */}
                <div
                  className="p-6 rounded-2xl text-center"
                  style={{ background: "#4A2E1F" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{ background: step.color, boxShadow: `0 0 0 4px ${step.color}30` }}
                  >
                    <step.icon size={24} style={{ color: "#4A2E1F" }} />
                  </div>
                  <div className="text-xs font-bold mb-1" style={{ color: step.color }}>
                    STEP {step.step}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm mb-4" style={{ color: "rgba(196,149,106,0.8)" }}>{step.desc}</p>

                  <ul className="space-y-2">
                    {step.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-sm text-left">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                        <span style={{ color: "rgba(255,255,255,0.85)" }}>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                {i < workflowSteps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <ArrowRight size={24} style={{ color: "#C4956A", transform: "rotate(90deg)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Workflow */}
      <section style={{ background: "#FDF8F5" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0f0a" }}>
              Real Example Workflow
            </h2>
            <p className="mt-3" style={{ color: "#5A3A2B", opacity: 0.8 }}>
              New lead → Auto message → CRM entry → Email follow-up
            </p>
          </div>

          {/* Visual flow */}
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--pengu-border)", background: "var(--pengu-card)" }}
            >
              {/* Header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: "#4A2E1F" }}
              >
                <div className="flex items-center gap-2">
                  <Zap size={18} style={{ color: "#C4956A" }} />
                  <span className="font-semibold text-white">Lead Generation Automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm" style={{ color: "#C4956A" }}>Active</span>
                </div>
              </div>

              {/* Flow steps */}
              <div className="p-6 space-y-3">
                {flowSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                    >
                      <step.icon size={18} style={{ color: step.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${step.color}15`, color: step.color }}>
                          {step.label}
                        </span>
                        <span className="font-semibold text-sm" style={{ color: "#1a0f0a" }}>{step.title}</span>
                      </div>
                      <p className="text-xs" style={{ color: "#5A3A2B", opacity: 0.8 }}>{step.desc}</p>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <div style={{ color: "#C4956A" }} className="shrink-0 mt-3">
                        <div className="w-0.5 h-4 mx-auto" style={{ background: "#C4956A", opacity: 0.4 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0f0a" }}>
            Ready-to-Use Templates
          </h2>
          <p className="mt-3" style={{ color: "#5A3A2B", opacity: 0.8 }}>
            Start with a template and customize it for your business in minutes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automationTemplates.map((template) => (
            <div
              key={template.title}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{ background: "#FDF8F5", border: "1px solid rgba(74,46,31,0.08)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#ffffff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(74,46,31,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "#C4956A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FDF8F5";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,46,31,0.08)";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#4A2E1F" }}
                  >
                    <template.icon size={20} style={{ color: "#C4956A" }} />
                  </div>
                  <h3 className="font-bold" style={{ color: "#1a0f0a" }}>{template.title}</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(74,46,31,0.08)", color: "#8B5E3C" }}>
                  {template.time}
                </span>
              </div>
              <div className="space-y-2">
                {template.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "#4A2E1F", color: "#C4956A" }}
                    >
                      {i + 1}
                    </div>
                    <span style={{ color: "#4A2E1F" }}>{step}</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 flex items-center gap-2 text-sm font-medium transition-colors duration-150"
                style={{ color: "#4A2E1F" }}
              >
                <Play size={14} /> Use Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4A2E1F" }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 800 }}>
            Start Automating Your Business
          </h2>
          <p className="mb-8" style={{ color: "#C4956A" }}>
            Build your first automation in under 5 minutes. No code, no complexity.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: "#C4956A", color: "#4A2E1F" }}
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
