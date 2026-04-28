import { Cookie, Info, Settings, Trash2 } from "lucide-react";

export function CookiePolicyPage() {
  const sections = [
    {
      title: "1. What are Cookies?",
      icon: Info,
      content: "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site."
    },
    {
      title: "2. How We Use Cookies",
      icon: Cookie,
      content: "We use cookies to understand how you use our website and to improve your experience. This includes keeping you logged in, remembering your preferences, and providing you with relevant content and advertising."
    },
    {
      title: "3. Managing Cookies",
      icon: Settings,
      iconColor: "#4A2E1F",
      content: "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly."
    },
    {
      title: "4. Deleting Cookies",
      icon: Trash2,
      content: "You can delete cookies already stored on your device at any time. Most browsers allow you to clear your cookies and other site data through the settings or history menu."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: "#FDF8F5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#4A2E1F" }}>Cookie Policy</h1>
          <p className="text-lg" style={{ color: "#8B5E3C" }}>Last updated: April 26, 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[rgba(74,46,31,0.08)]">
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#5A3A2B" }}>
            This Cookie Policy explains how Pengu AI uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them.
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FDF8F5", border: "1px solid rgba(196,149,106,0.3)" }}>
                  <section.icon size={16} style={{ color: "#4A2E1F" }} />
                </div>
                <h2 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>{section.title}</h2>
                <p className="leading-relaxed" style={{ color: "#5A3A2B", opacity: 0.9 }}>{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-[rgba(74,46,31,0.08)]">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>More Information</h2>
            <p style={{ color: "#5A3A2B" }}>
              If you want to learn more about how we use cookies, please contact us at:
              <br />
              <span className="font-bold mt-2 inline-block" style={{ color: "#C4956A" }}>cookies@pengu.ai</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
