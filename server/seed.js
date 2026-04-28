const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');
const Service = require('./models/Service');
const Job = require('./models/Job');
const Settings = require('./models/Settings');

dotenv.config({ path: './server/.env' });

const initialBlogPosts = [
  {
    title: "Why Your Business Needs a Website in 2024",
    slug: "why-your-business-needs-website",
    category: "Business",
    excerpt: "In today's digital-first world, having a professional website is no longer optional — it's the foundation of your business credibility.",
    content: "In today's digital-first world, having a professional website is no longer optional. Your website is your 24/7 salesperson, your brand headquarters, and your first impression to potential clients. Without one, you're leaving money on the table every single day.",
    author: "Pengu AI",
    date: "2024-12-01",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    published: true,
  },
  {
    title: "AI Automation for Small Business: The Complete Guide",
    slug: "ai-automation-small-business",
    category: "AI & Automation",
    excerpt: "Discover how small businesses are using AI automation to save time, reduce costs, and scale faster than ever before.",
    content: "AI automation is no longer exclusive to enterprise companies. Small businesses can now leverage powerful AI tools to automate repetitive tasks, engage customers 24/7, and make data-driven decisions — all without hiring a large team.",
    author: "Pengu AI",
    date: "2024-11-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    published: true,
  },
  {
    title: "How to Increase Sales Online: 10 Proven Strategies",
    slug: "how-to-increase-sales-online",
    category: "Marketing",
    excerpt: "Learn the top 10 proven strategies that successful online businesses use to consistently grow their revenue.",
    content: "Growing online sales requires a combination of the right strategy, tools, and execution. From optimizing your website for conversions to leveraging AI chatbots for 24/7 customer support, we cover all the tactics that actually work.",
    author: "Pengu AI",
    date: "2024-11-01",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    published: true,
  },
];

const initialPortfolio = [
  {
    title: "Pengu Education Help",
    slug: "pengu-education-help",
    category: "AI Platform",
    description: "Advanced AI-powered education assistant helping students with personalized learning, homework help, and academic scheduling.",
    tags: ["AI", "Education", "SaaS"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    featured: true,
  },
  {
    title: "ElevateCV",
    slug: "elevatecv-builder",
    category: "Web App",
    description: "A professional free CV builder that uses AI to optimize resumes for ATS and generate high-impact professional summaries.",
    tags: ["React", "AI", "Tool"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    featured: true,
  },
  {
    title: "GetProject Smart Lead",
    slug: "getproject-lead-system",
    category: "Automation",
    description: "Automated client conversion system that captures leads and sends project briefs directly to the team's dashboard and email.",
    tags: ["Leads", "Automation", "CRM"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: true,
  },
  {
    title: "Admission Bondu",
    slug: "admission-bondu",
    category: "Portal",
    description: "Comprehensive admission portal for college students, simplifying the application process and institutional management.",
    tags: ["Education", "Portal", "Web"],
    image: "https://images.unsplash.com/photo-1523050335456-adabc08b97e4?w=800&q=80",
    featured: true,
  },
  {
    title: "Rizqara Restaurant System",
    slug: "rizqara-restaurants",
    category: "Business Engine",
    description: "End-to-end restaurant management system featuring digital menus, live order tracking, and inventory analytics.",
    tags: ["Hospitality", "POS", "Full Stack"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    featured: true,
  },
  {
    title: "Rizqara Innovation Club",
    slug: "rizqara-innovation-club",
    category: "Platform",
    description: "Scaling platform for science and innovation clubs to manage memberships, events, and research projects.",
    tags: ["Community", "SaaS", "Science"],
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    featured: true,
  },
];

const initialTestimonials = [
  {
    name: "James Carter",
    role: "CEO, TechNova",
    content: "Pengu completely transformed our business. Their AI automation system saved us 40 hours per week and increased our revenue by 200%. Absolutely incredible!",
    rating: 5,
    published: true,
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, GrowthHive",
    content: "The Pengu team delivered our SaaS platform in record time. The AI features are next-level. Our customers love the smart automation workflows.",
    rating: 5,
    published: true,
  },
  {
    name: "David Chen",
    role: "CTO, DataFlow Inc.",
    content: "We replaced 5 different tools with Pengu's platform. Best decision we ever made. The unified dashboard gives us complete control over everything.",
    rating: 5,
    published: true,
  },
];

const initialServices = [
  {
    slug: "website-development",
    icon: "🌐",
    title: "Website Development",
    tagline: "Your digital HQ — built to convert",
    description: "Custom landing pages, business websites, and e-commerce platforms built with cutting-edge technology.",
    longDescription: "We build high-performance websites that don't just look great — they work as your best salesperson. From landing pages to complex e-commerce platforms, every pixel is crafted for results. Our development process focuses on speed, SEO, and user experience, ensuring your business stands out in the digital landscape.",
    image: "/images/services/website-dev.png",
    features: ["Landing Pages", "Business Websites", "E-Commerce", "Custom CMS", "SEO Optimized", "Mobile-first Design"],
    subServices: [
      { name: "E-Commerce Solutions", desc: "Scale your store with Shopify, WooCommerce or Custom builds." },
      { name: "Corporate Websites", desc: "Professional digital presence for established businesses." },
      { name: "High-Speed Landing Pages", desc: "Optimized for maximum conversion and ad performance." }
    ],
    active: true,
  },
  {
    slug: "mobile-app-development",
    icon: "📱",
    title: "Mobile App Development",
    tagline: "Next-gen apps for iOS & Android",
    description: "Native iOS & Android apps, cross-platform solutions, and SaaS applications that scale.",
    longDescription: "Cross-platform mobile applications for iOS and Android that deliver seamless user experiences. From consumer apps to enterprise SaaS, we build apps that scale to millions of users. We leverage technologies like React Native and Flutter to deliver high-quality apps with a single codebase.",
    image: "/images/services/mobile-app.png",
    features: ["Android / iOS", "SaaS Apps", "Admin Panels", "Push Notifications", "Offline Support", "Secure APIs"],
    subServices: [
      { name: "iOS & Android Development", desc: "Native-quality cross-platform applications." },
      { name: "SaaS Mobile Extensions", desc: "Bring your dashboard to your pocket." },
      { name: "App Store Optimization", desc: "Get discovered by the right audience." }
    ],
    active: true,
  },
  {
    slug: "ai-and-chatbots",
    icon: "🤖",
    title: "AI & Chatbots",
    tagline: "Intelligent systems that never sleep",
    description: "GPT-powered chatbots, LLM integrations, and intelligent AI systems for your business.",
    longDescription: "GPT-powered AI systems, custom chatbots, and intelligent automation that transform how your business operates. Train AI on your specific data for maximum accuracy and relevance. Our AI solutions help you reduce response times, increase customer satisfaction, and automate complex decision-making processes.",
    image: "/images/services/ai-chatbot.png",
    features: ["Chatbot Builder", "LLM Integration", "AI Automation", "Voice AI", "GPT-4 Powered", "Multi-language Support"],
    subServices: [
      { name: "Custom GPT Agents", desc: "AI trained specifically on your company data." },
      { name: "Customer Support Bots", desc: "Handle 80% of queries automatically 24/7." },
      { name: "AI Strategy Consulting", desc: "Find where AI can save you the most money." }
    ],
    active: true,
  },
  {
    slug: "automation-systems",
    icon: "⚡",
    title: "Automation Systems",
    tagline: "Put your business on autopilot",
    description: "End-to-end workflow automation, CRM automation, and data processing pipelines.",
    longDescription: "End-to-end business process automation that eliminates repetitive tasks, reduces errors, and scales your operations without scaling your team. We connect your entire software stack to create seamless data flow and automated actions across your organization.",
    image: "/images/services/automation.png",
    features: ["CRM Automation", "Workflow Systems", "Data Scraping", "API Integration", "Error Handling", "Real-time Monitoring"],
    subServices: [
      { name: "Sales Pipeline Automation", desc: "From lead capture to closed deal — automatically." },
      { name: "Custom API Integrations", desc: "Make all your different software talk to each other." },
      { name: "Data Processing Bots", desc: "Eliminate manual data entry forever." }
    ],
    active: true,
  },
  {
    slug: "saas-and-dashboards",
    icon: "📊",
    title: "SaaS & Dashboards",
    tagline: "Data-driven business control",
    description: "Custom SaaS platforms, analytics dashboards, and business intelligence systems.",
    longDescription: "Custom SaaS platforms and analytics dashboards that give you complete visibility into your business. Beautiful, fast, and packed with insights that actually matter. We build robust architectures that handle large volumes of data and provide real-time reporting.",
    image: "/images/services/saas-dashboard.png",
    features: ["Custom Dashboards", "Analytics", "Admin Systems", "Real-time Data", "Custom Charts", "Role-based Access"],
    subServices: [
      { name: "Custom SaaS Platforms", desc: "Build your own software-as-a-service product." },
      { name: "Internal Admin Panels", desc: "Streamline your team's internal operations." },
      { name: "Analytics & BI", desc: "Turn raw data into actionable business decisions." }
    ],
    active: true,
  },
  {
    slug: "branding-and-design",
    icon: "🎨",
    title: "Branding & Design",
    tagline: "Identities that demand attention",
    description: "Complete brand identity, UI/UX design, and social media design systems.",
    longDescription: "Complete brand identity systems that make your business unforgettable. From logo to UI, we craft visual identities that communicate your values and attract your ideal clients. Our design approach is research-driven and focused on creating emotional connections with your audience.",
    image: "/images/services/branding.png",
    features: ["Logo Design", "UI/UX", "Social Media", "Brand Guidelines", "Brand Strategy", "Style Guides"],
    subServices: [
      { name: "Full Visual Identity", desc: "Logos, colors, typography, and brand voice." },
      { name: "UI/UX Product Design", desc: "User-centric designs for apps and websites." },
      { name: "Marketing Collateral", desc: "High-impact assets for social and print." }
    ],
    active: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Post.deleteMany();
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await Service.deleteMany();
    await Job.deleteMany();
    await Settings.deleteMany();

    // Insert new data
    await Post.insertMany(initialBlogPosts);
    await Project.insertMany(initialPortfolio);
    await Testimonial.insertMany(initialTestimonials);
    await Service.insertMany(initialServices);
    
    // Default Settings
    await Settings.create({
      siteName: "Pengu AI",
      tagline: "Build. Automate. Scale Your Business.",
      email: "pengui.org@gmail.com",
      phone: "0134-3042761",
      whatsapp: "https://wa.me/message/CSYKXUISDAIVI1",
      location: "221B Baker Street, London | Dhaka, Bangladesh",
      metaTitle: "Pengu AI — Build, Automate & Scale Your Business",
      metaDescription: "The all-in-one AI platform for websites, mobile apps, automation, and digital transformation.",
      aiPlatformDemoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    });

    console.log('✅ Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
