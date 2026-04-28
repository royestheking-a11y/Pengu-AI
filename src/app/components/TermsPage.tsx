import { FileText, CheckCircle, AlertTriangle, Scale } from "lucide-react";

export function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: CheckCircle,
      content: "By accessing and using Pengu AI, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
      title: "2. Use License",
      icon: FileText,
      content: "Permission is granted to temporarily download one copy of the materials on Pengu AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "3. Disclaimer",
      icon: AlertTriangle,
      content: "The materials on Pengu AI's website are provided on an 'as is' basis. Pengu AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability."
    },
    {
      title: "4. Governing Law",
      icon: Scale,
      content: "These terms and conditions are governed by and construed in accordance with the laws of California, USA and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: "#FDF8F5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#4A2E1F" }}>Terms of Service</h1>
          <p className="text-lg" style={{ color: "#8B5E3C" }}>Last updated: April 26, 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[rgba(74,46,31,0.08)]">
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#5A3A2B" }}>
            Please read these Terms of Service carefully before using our platform. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
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
            <h2 className="text-xl font-bold mb-4" style={{ color: "#4A2E1F" }}>Questions?</h2>
            <p style={{ color: "#5A3A2B" }}>
              If you have any questions about these Terms, please contact us at:
              <br />
              <span className="font-bold mt-2 inline-block" style={{ color: "#C4956A" }}>legal@pengu.ai</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
