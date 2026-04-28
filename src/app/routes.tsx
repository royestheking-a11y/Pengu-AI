import { createBrowserRouter } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollTopBehavior } from "./components/ScrollTopBehavior";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ServicesPage } from "./components/ServicesPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { PricingPage } from "./components/PricingPage";
import { ProductsPage } from "./components/ProductsPage";
import { AIPlatformPage } from "./components/AIPlatformPage";
import { WorkflowPage } from "./components/WorkflowPage";
import { ContactPage } from "./components/ContactPage";
import { BlogPage } from "./components/BlogPage";
import { BlogPostPage } from "./components/BlogPostPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { CareersPage } from "./components/CareersPage";
import { JobDetailPage } from "./components/JobDetailPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsPage } from "./components/TermsPage";
import { CookiePolicyPage } from "./components/CookiePolicyPage";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminMessages } from "./components/admin/AdminMessages";
import { AdminBlog } from "./components/admin/AdminBlog";
import { AdminPortfolio } from "./components/admin/AdminPortfolio";
import { AdminTestimonials } from "./components/admin/AdminTestimonials";
import { AdminServices } from "./components/admin/AdminServices";
import { AdminCareers } from "./components/admin/AdminCareers";
import { AdminApplications } from "./components/admin/AdminApplications";
import { AdminSubscribers } from "./components/admin/AdminSubscribers";
import { AdminSettings } from "./components/admin/AdminSettings";
import { PartnerProgramPage } from "./components/PartnerProgramPage";
const penguImg = "/penguimg.png";

// Main website layout wrapper
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollTopBehavior />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidget />
      <ScrollToTop />
    </div>
  );
}

function NotFoundPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center text-center px-4 pt-16" style={{ background: "var(--pengu-bg)" }}>
        <div>
          <div className="relative inline-block mb-6">
            <img src={penguImg} alt="Pengu" className="w-32 mx-auto drop-shadow-xl opacity-80" />
            <div
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: "#4A2E1F" }}
            >
              404
            </div>
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "var(--pengu-heading)" }}>Page Not Found</h1>
          <p className="text-lg mb-8 mt-2" style={{ color: "var(--pengu-text-2)" }}>
            Oops! Even Pengu AI couldn't find this page.
          </p>
          <a
            href="/"
            className="px-8 py-3.5 rounded-xl text-white inline-block font-semibold transition-all duration-200"
            style={{ background: "#4A2E1F" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#5A3A2B")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#4A2E1F")}
          >
            Return Home
          </a>
        </div>
      </div>
    </MainLayout>
  );
}

export const router = createBrowserRouter([
  // Public Website Routes
  {
    path: "/",
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: "/about",
    element: <MainLayout><AboutPage /></MainLayout>,
  },
  {
    path: "/services",
    element: <MainLayout><ServicesPage /></MainLayout>,
  },
  {
    path: "/services/:slug",
    element: <MainLayout><ServiceDetailPage /></MainLayout>,
  },
  {
    path: "/portfolio",
    element: <MainLayout><PortfolioPage /></MainLayout>,
  },
  {
    path: "/pricing",
    element: <MainLayout><PricingPage /></MainLayout>,
  },
  {
    path: "/products",
    element: <MainLayout><ProductsPage /></MainLayout>,
  },
  {
    path: "/ai-platform",
    element: <MainLayout><AIPlatformPage /></MainLayout>,
  },
  {
    path: "/workflow",
    element: <MainLayout><WorkflowPage /></MainLayout>,
  },
  {
    path: "/contact",
    element: <MainLayout><ContactPage /></MainLayout>,
  },
  {
    path: "/blog",
    element: <MainLayout><BlogPage /></MainLayout>,
  },
  {
    path: "/blog/:slug",
    element: <MainLayout><BlogPostPage /></MainLayout>,
  },
  {
    path: "/careers",
    element: <MainLayout><CareersPage /></MainLayout>,
  },
  {
    path: "/careers/:id",
    element: <MainLayout><JobDetailPage /></MainLayout>,
  },
  {
    path: "/privacy",
    element: <MainLayout><PrivacyPolicyPage /></MainLayout>,
  },
  {
    path: "/terms",
    element: <MainLayout><TermsPage /></MainLayout>,
  },
  {
    path: "/cookies",
    element: <MainLayout><CookiePolicyPage /></MainLayout>,
  },
  {
    path: "/partner",
    element: <MainLayout><PartnerProgramPage /></MainLayout>,
  },

  // Admin Routes — nested under /admin
  {
    path: "/admin",
    children: [
      // Login page at /admin (index)
      {
        index: true,
        element: <AdminLogin />,
      },
      // Protected admin panel (layout) at /admin/*
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "messages", element: <AdminMessages /> },
          { path: "blog", element: <AdminBlog /> },
          { path: "portfolio", element: <AdminPortfolio /> },
          { path: "testimonials", element: <AdminTestimonials /> },
          { path: "services", element: <AdminServices /> },
          { path: "careers", element: <AdminCareers /> },
          { path: "applications", element: <AdminApplications /> },
          { path: "subscribers", element: <AdminSubscribers /> },
          { path: "settings", element: <AdminSettings /> },
        ],
      },
    ],
  },

  // 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);