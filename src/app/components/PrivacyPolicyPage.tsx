import { Shield, Lock, Eye, FileText } from "lucide-react";

export function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Eye,
      content: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, and any other information you choose to provide."
    },
    {
      title: "2. How We Use Your Information",
      icon: Shield,
      content: "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Pengu AI and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads."
    },
    {
      title: "3. Data Security",
      icon: Lock,
      content: "We work hard to protect Pengu AI and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We implement industry-standard security measures to ensure your data remains safe."
    },
    {
      title: "4. Your Privacy Rights",
      icon: FileText,
      content: "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete the data we hold about you. Please contact us to exercise these rights."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: "#FDF8F5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#4A2E1F" }}>Privacy Policy</h1>
          <p className="text-lg" style={{ color: "#8B5E3C" }}>Last updated: April 26, 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[rgba(74,46,31,0.08)]">
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#5A3A2B" }}>
            At Pengu AI, we take your privacy seriously. This policy explains what information we collect, why we collect it, and how we protect it. By using our platform, you agree to the collection and use of information in accordance with this policy.
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
            <h2 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>Contact Us</h2>
            <p style={{ color: "#5A3A2B" }}>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <span className="font-bold mt-2 inline-block" style={{ color: "#C4956A" }}>privacy@pengu.ai</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
