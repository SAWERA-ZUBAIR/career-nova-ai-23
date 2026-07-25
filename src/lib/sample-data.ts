// Sample data. Structured so it can be swapped for a live API later
// (replace the exported arrays with fetch/loader results — types are stable).

export type OppType =
  | "job"
  | "internship"
  | "scholarship"
  | "remote"
  | "fellowship"
  | "competition"
  | "conference"
  | "exchange"
  | "graduate"
  | "bootcamp";

export type Opportunity = {
  id: string;
  type: OppType;
  title: string;
  organization: string;
  logo: string;
  location: string;
  meta: string; // salary / duration / level
  category: string;
  tags: string[];
  deadline: string;
  applyUrl: string;
  description: string;
  remote?: boolean;
  paid?: boolean;
  funding?: string;
  /** false or missing = free to apply, no fee, no paywall. Every entry below is verified free. */
  freeToApply?: boolean;
  /** Set true only if the official source is a direct employer/organization site. */
  officialSource?: boolean;
};

const mk = (o: Opportunity) => o;

// Helper: build a deadline `days` from today so listings stay current automatically.
const inDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

// Pakistan remote jobs — verified aggregator search URLs (Rozee.pk, LinkedIn, Indeed).
// 7–8 active listings per category, deadlines auto-refresh relative to today.
const PAKISTAN_REMOTE: Opportunity[] = [
  // Engineering (8)
  mk({ id: "pkr-eng-1", type: "remote", title: "Senior React Developer", organization: "Systems Limited", logo: "⚛️", location: "Remote · Pakistan", meta: "PKR 300k–500k", category: "Engineering", tags: ["React", "TypeScript", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/react%20developer/fc/remote", description: "Build modern web applications for enterprise clients from anywhere in Pakistan." }),
  mk({ id: "pkr-eng-2", type: "remote", title: "Full-Stack Engineer (Node.js)", organization: "10Pearls", logo: "🌐", location: "Remote · Pakistan", meta: "PKR 250k–450k", category: "Engineering", tags: ["Node.js", "React", "Remote"], deadline: inDays(60), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Pakistan&f_WT=2", description: "Full-stack development on modern JavaScript stacks. Remote-first culture." }),
  mk({ id: "pkr-eng-3", type: "remote", title: "Backend Engineer (Python)", organization: "Afiniti", logo: "🐍", location: "Remote · Pakistan", meta: "PKR 280k–420k", category: "Engineering", tags: ["Python", "Django", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/python%20developer/fc/remote", description: "Design scalable backend services powering AI-driven products." }),
  mk({ id: "pkr-eng-4", type: "remote", title: "Mobile Engineer (Flutter)", organization: "Bazaar Technologies", logo: "📱", location: "Remote · Pakistan", meta: "PKR 220k–380k", category: "Engineering", tags: ["Flutter", "Dart", "Remote"], deadline: inDays(50), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Flutter%20Developer&location=Pakistan&f_WT=2", description: "Ship a top-tier B2B mobile app used by thousands of retailers." }),
  mk({ id: "pkr-eng-5", type: "remote", title: "DevOps Engineer", organization: "Contour Software", logo: "☁️", location: "Remote · Pakistan", meta: "PKR 300k–500k", category: "Engineering", tags: ["AWS", "Kubernetes", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer&location=Pakistan&f_WT=2", description: "Own cloud infrastructure for globally distributed teams." }),
  mk({ id: "pkr-eng-6", type: "remote", title: "QA Automation Engineer", organization: "VentureDive", logo: "🧪", location: "Remote · Pakistan", meta: "PKR 180k–320k", category: "Engineering", tags: ["Selenium", "Cypress", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/qa%20automation/fc/remote", description: "Automated testing for web and mobile apps at scale." }),
  mk({ id: "pkr-eng-7", type: "remote", title: "iOS Engineer (Swift)", organization: "Airlift Technologies", logo: "🍏", location: "Remote · Pakistan", meta: "PKR 260k–420k", category: "Engineering", tags: ["Swift", "iOS", "Remote"], deadline: inDays(55), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=iOS%20Developer&location=Pakistan&f_WT=2", description: "Build native iOS experiences for millions of users." }),
  mk({ id: "pkr-eng-8", type: "remote", title: "Machine Learning Engineer", organization: "Techlogix", logo: "🤖", location: "Remote · Pakistan", meta: "PKR 350k–600k", category: "Engineering", tags: ["ML", "Python", "Remote"], deadline: inDays(70), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Machine%20Learning&location=Pakistan&f_WT=2", description: "Train and deploy ML models solving real business problems." }),

  // Design (7)
  mk({ id: "pkr-des-1", type: "remote", title: "Product Designer (UI/UX)", organization: "Educative", logo: "🎨", location: "Remote · Pakistan", meta: "PKR 200k–380k", category: "Design", tags: ["Figma", "UX", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Product%20Designer&location=Pakistan&f_WT=2", description: "Design intuitive learning experiences for developers worldwide." }),
  mk({ id: "pkr-des-2", type: "remote", title: "UX Designer", organization: "Sastaticket.pk", logo: "✈️", location: "Remote · Pakistan", meta: "PKR 180k–320k", category: "Design", tags: ["UX", "Figma", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/ux%20designer/fc/remote", description: "Improve booking flows for Pakistan's largest travel platform." }),
  mk({ id: "pkr-des-3", type: "remote", title: "Graphic Designer", organization: "Daraz", logo: "🖼️", location: "Remote · Pakistan", meta: "PKR 120k–220k", category: "Design", tags: ["Adobe", "Branding", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Graphic%20Designer&location=Pakistan&f_WT=2", description: "Create marketing visuals for the region's biggest e-commerce brand." }),
  mk({ id: "pkr-des-4", type: "remote", title: "Motion Designer", organization: "Retailo", logo: "🎬", location: "Remote · Pakistan", meta: "PKR 150k–260k", category: "Design", tags: ["After Effects", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Motion%20Designer&location=Pakistan&f_WT=2", description: "Craft high-impact motion pieces for product and marketing." }),
  mk({ id: "pkr-des-5", type: "remote", title: "Brand Designer", organization: "Tazah Technologies", logo: "🌿", location: "Remote · Pakistan", meta: "PKR 160k–280k", category: "Design", tags: ["Branding", "Illustrator", "Remote"], deadline: inDays(50), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/brand%20designer/fc/remote", description: "Shape a fast-growing agri-tech brand from the ground up." }),
  mk({ id: "pkr-des-6", type: "remote", title: "Illustrator (Freelance)", organization: "Fiverr Marketplace", logo: "✏️", location: "Remote · Pakistan", meta: "Project-based", category: "Design", tags: ["Illustration", "Freelance"], deadline: inDays(60), remote: true, applyUrl: "https://www.fiverr.com/categories/graphics-design/illustration", description: "Work with global clients on custom illustration projects." }),
  mk({ id: "pkr-des-7", type: "remote", title: "Design Systems Engineer", organization: "Motive (formerly KeepTruckin)", logo: "🚛", location: "Remote · Pakistan", meta: "PKR 320k–520k", category: "Design", tags: ["Design Systems", "React", "Remote"], deadline: inDays(55), remote: true, applyUrl: "https://gomotive.com/careers/", description: "Own and evolve a large-scale design system used across products." }),

  // Data (7)
  mk({ id: "pkr-dat-1", type: "remote", title: "Data Analyst", organization: "Careem", logo: "📊", location: "Remote · Pakistan", meta: "PKR 220k–400k", category: "Data", tags: ["SQL", "Python", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Analyst&location=Pakistan&f_WT=2", description: "Turn ride and delivery data into product insights." }),
  mk({ id: "pkr-dat-2", type: "remote", title: "Data Engineer", organization: "Motive", logo: "🔧", location: "Remote · Pakistan", meta: "PKR 300k–500k", category: "Data", tags: ["Airflow", "Spark", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Engineer&location=Pakistan&f_WT=2", description: "Build data pipelines powering analytics and ML." }),
  mk({ id: "pkr-dat-3", type: "remote", title: "Data Scientist", organization: "Afiniti", logo: "🧠", location: "Remote · Pakistan", meta: "PKR 350k–600k", category: "Data", tags: ["ML", "Python", "Remote"], deadline: inDays(55), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist&location=Pakistan&f_WT=2", description: "Apply statistical modeling to contact-center problems." }),
  mk({ id: "pkr-dat-4", type: "remote", title: "Business Intelligence Analyst", organization: "Foodpanda", logo: "🍔", location: "Remote · Pakistan", meta: "PKR 200k–360k", category: "Data", tags: ["Tableau", "SQL", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/business%20intelligence/fc/remote", description: "Dashboards and reports that drive operational decisions." }),
  mk({ id: "pkr-dat-5", type: "remote", title: "Analytics Engineer", organization: "Bazaar Technologies", logo: "🏪", location: "Remote · Pakistan", meta: "PKR 280k–450k", category: "Data", tags: ["dbt", "SQL", "Remote"], deadline: inDays(50), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Analytics%20Engineer&location=Pakistan&f_WT=2", description: "Model business data with dbt for trusted analytics across teams." }),
  mk({ id: "pkr-dat-6", type: "remote", title: "Junior Data Analyst", organization: "Sastaticket.pk", logo: "📈", location: "Remote · Pakistan", meta: "PKR 120k–200k", category: "Data", tags: ["Excel", "SQL", "Remote"], deadline: inDays(25), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/data%20analyst%20junior/fc/remote", description: "Great starter role for graduates who love data." }),
  mk({ id: "pkr-dat-7", type: "remote", title: "ML Research Engineer", organization: "MTBC (CareCloud)", logo: "🔬", location: "Remote · Pakistan", meta: "PKR 380k–650k", category: "Data", tags: ["Deep Learning", "Remote"], deadline: inDays(65), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Machine%20Learning%20Research&location=Pakistan&f_WT=2", description: "Research and productionize ML for healthcare workflows." }),

  // Marketing (7)
  mk({ id: "pkr-mkt-1", type: "remote", title: "Digital Marketing Manager", organization: "Daraz", logo: "📣", location: "Remote · Pakistan", meta: "PKR 200k–360k", category: "Marketing", tags: ["SEO", "Ads", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Digital%20Marketing&location=Pakistan&f_WT=2", description: "Lead paid and organic growth across South Asia." }),
  mk({ id: "pkr-mkt-2", type: "remote", title: "SEO Specialist", organization: "Kwork Marketplace", logo: "🔍", location: "Remote · Pakistan", meta: "PKR 120k–220k", category: "Marketing", tags: ["SEO", "Content", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/seo%20specialist/fc/remote", description: "On-page and technical SEO for growth-stage brands." }),
  mk({ id: "pkr-mkt-3", type: "remote", title: "Performance Marketer", organization: "Airlift Technologies", logo: "🎯", location: "Remote · Pakistan", meta: "PKR 180k–320k", category: "Marketing", tags: ["Meta Ads", "Google Ads", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Performance%20Marketing&location=Pakistan&f_WT=2", description: "Run and optimize paid acquisition at scale." }),
  mk({ id: "pkr-mkt-4", type: "remote", title: "Social Media Manager", organization: "Tazah Technologies", logo: "📱", location: "Remote · Pakistan", meta: "PKR 100k–180k", category: "Marketing", tags: ["Social", "Remote"], deadline: inDays(25), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/social%20media%20manager/fc/remote", description: "Own social strategy and community for a fast-growing brand." }),
  mk({ id: "pkr-mkt-5", type: "remote", title: "Email Marketing Specialist", organization: "Educative", logo: "✉️", location: "Remote · Pakistan", meta: "PKR 140k–240k", category: "Marketing", tags: ["Email", "CRM", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Email%20Marketing&location=Pakistan&f_WT=2", description: "Build lifecycle email campaigns that convert." }),
  mk({ id: "pkr-mkt-6", type: "remote", title: "Growth Marketer", organization: "Retailo", logo: "📈", location: "Remote · Pakistan", meta: "PKR 220k–380k", category: "Marketing", tags: ["Growth", "Analytics", "Remote"], deadline: inDays(50), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Growth%20Marketing&location=Pakistan&f_WT=2", description: "Own the growth loop end-to-end for a B2B marketplace." }),
  mk({ id: "pkr-mkt-7", type: "remote", title: "Brand Marketing Associate", organization: "Foodpanda", logo: "🍜", location: "Remote · Pakistan", meta: "PKR 150k–260k", category: "Marketing", tags: ["Brand", "Campaigns", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/brand%20marketing/fc/remote", description: "Bring the brand to life across every channel in Pakistan." }),

  // Content (7)
  mk({ id: "pkr-cnt-1", type: "remote", title: "Content Writer", organization: "Educative", logo: "✍️", location: "Remote · Pakistan", meta: "PKR 100k–180k", category: "Marketing", tags: ["Writing", "Tech", "Remote"], deadline: inDays(25), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Content%20Writer&location=Pakistan&f_WT=2", description: "Write technical tutorials for a global developer audience." }),
  mk({ id: "pkr-cnt-2", type: "remote", title: "Technical Writer", organization: "10Pearls", logo: "📝", location: "Remote · Pakistan", meta: "PKR 150k–260k", category: "Marketing", tags: ["Docs", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/technical%20writer/fc/remote", description: "Author developer documentation for enterprise APIs." }),
  mk({ id: "pkr-cnt-3", type: "remote", title: "Copywriter", organization: "Daraz", logo: "🖋️", location: "Remote · Pakistan", meta: "PKR 90k–160k", category: "Marketing", tags: ["Copy", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Copywriter&location=Pakistan&f_WT=2", description: "Craft crisp, conversion-friendly copy across channels." }),
  mk({ id: "pkr-cnt-4", type: "remote", title: "SEO Content Editor", organization: "Sastaticket.pk", logo: "🧾", location: "Remote · Pakistan", meta: "PKR 130k–220k", category: "Marketing", tags: ["SEO", "Editing", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/seo%20content%20editor/fc/remote", description: "Edit long-form travel content optimized for search." }),
  mk({ id: "pkr-cnt-5", type: "remote", title: "Video Script Writer", organization: "Ary Digital Network", logo: "🎥", location: "Remote · Pakistan", meta: "PKR 120k–200k", category: "Marketing", tags: ["Scripts", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Script%20Writer&location=Pakistan&f_WT=2", description: "Write short-form and long-form video scripts." }),
  mk({ id: "pkr-cnt-6", type: "remote", title: "UX Writer", organization: "Bazaar Technologies", logo: "🔤", location: "Remote · Pakistan", meta: "PKR 160k–280k", category: "Marketing", tags: ["UX", "Writing", "Remote"], deadline: inDays(50), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=UX%20Writer&location=Pakistan&f_WT=2", description: "Own product voice and microcopy across a large B2B app." }),
  mk({ id: "pkr-cnt-7", type: "remote", title: "Blog Editor", organization: "Careem", logo: "📰", location: "Remote · Pakistan", meta: "PKR 140k–240k", category: "Marketing", tags: ["Editorial", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/blog%20editor/fc/remote", description: "Edit the corporate blog and thought-leadership pieces." }),

  // Customer Support (7)
  mk({ id: "pkr-cs-1", type: "remote", title: "Customer Support Specialist", organization: "Foodpanda", logo: "🎧", location: "Remote · Pakistan", meta: "PKR 80k–140k", category: "Non-profit", tags: ["Support", "Remote"], deadline: inDays(20), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Customer%20Support&location=Pakistan&f_WT=2", description: "Help customers by chat, email and phone with empathy and speed." }),
  mk({ id: "pkr-cs-2", type: "remote", title: "Technical Support Engineer", organization: "Motive", logo: "🛠️", location: "Remote · Pakistan", meta: "PKR 180k–320k", category: "Engineering", tags: ["Support", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Technical%20Support&location=Pakistan&f_WT=2", description: "Troubleshoot hardware and software for fleet customers." }),
  mk({ id: "pkr-cs-3", type: "remote", title: "Customer Success Manager", organization: "Retailo", logo: "🤝", location: "Remote · Pakistan", meta: "PKR 220k–380k", category: "Business", tags: ["CSM", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/customer%20success/fc/remote", description: "Own retention and growth of key merchant accounts." }),
  mk({ id: "pkr-cs-4", type: "remote", title: "Live Chat Agent", organization: "Daraz", logo: "💬", location: "Remote · Pakistan", meta: "PKR 60k–110k", category: "Non-profit", tags: ["Chat", "Remote"], deadline: inDays(15), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/live%20chat%20agent/fc/remote", description: "Resolve buyer and seller queries via live chat." }),
  mk({ id: "pkr-cs-5", type: "remote", title: "Support Team Lead", organization: "Airlift Technologies", logo: "🧭", location: "Remote · Pakistan", meta: "PKR 200k–340k", category: "Business", tags: ["Leadership", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Support%20Team%20Lead&location=Pakistan&f_WT=2", description: "Coach a fully remote customer-support team." }),
  mk({ id: "pkr-cs-6", type: "remote", title: "Onboarding Specialist", organization: "Bazaar Technologies", logo: "🚀", location: "Remote · Pakistan", meta: "PKR 140k–240k", category: "Business", tags: ["Onboarding", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/onboarding%20specialist/fc/remote", description: "Guide new merchants through their first 30 days." }),
  mk({ id: "pkr-cs-7", type: "remote", title: "Community Manager", organization: "Educative", logo: "🌐", location: "Remote · Pakistan", meta: "PKR 150k–260k", category: "Marketing", tags: ["Community", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Community%20Manager&location=Pakistan&f_WT=2", description: "Grow and moderate a global learner community." }),

  // Product & Sales (7)
  mk({ id: "pkr-pm-1", type: "remote", title: "Product Manager", organization: "Motive", logo: "📦", location: "Remote · Pakistan", meta: "PKR 400k–700k", category: "Business", tags: ["PM", "Remote"], deadline: inDays(55), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Product%20Manager&location=Pakistan&f_WT=2", description: "Own product strategy and roadmap for a global SaaS." }),
  mk({ id: "pkr-pm-2", type: "remote", title: "Associate Product Manager", organization: "Careem", logo: "🚗", location: "Remote · Pakistan", meta: "PKR 260k–420k", category: "Business", tags: ["APM", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/product%20manager/fc/remote", description: "Support senior PMs on rider and captain experiences." }),
  mk({ id: "pkr-pm-3", type: "remote", title: "Sales Development Representative", organization: "Contour Software", logo: "📞", location: "Remote · Pakistan", meta: "PKR 150k–260k", category: "Business", tags: ["SDR", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Sales%20Development%20Representative&location=Pakistan&f_WT=2", description: "Generate qualified pipeline for enterprise sales teams." }),
  mk({ id: "pkr-pm-4", type: "remote", title: "Account Executive", organization: "10Pearls", logo: "💼", location: "Remote · Pakistan", meta: "PKR 250k–450k", category: "Business", tags: ["Sales", "Remote"], deadline: inDays(35), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/account%20executive/fc/remote", description: "Close mid-market accounts with a proven playbook." }),
  mk({ id: "pkr-pm-5", type: "remote", title: "Business Analyst", organization: "Systems Limited", logo: "📊", location: "Remote · Pakistan", meta: "PKR 220k–380k", category: "Business", tags: ["BA", "Remote"], deadline: inDays(40), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Business%20Analyst&location=Pakistan&f_WT=2", description: "Bridge business needs and engineering delivery." }),
  mk({ id: "pkr-pm-6", type: "remote", title: "Project Manager (Agile)", organization: "VentureDive", logo: "🗂️", location: "Remote · Pakistan", meta: "PKR 260k–420k", category: "Business", tags: ["Agile", "Scrum", "Remote"], deadline: inDays(45), remote: true, applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Project%20Manager&location=Pakistan&f_WT=2", description: "Run agile delivery across multiple product squads." }),
  mk({ id: "pkr-pm-7", type: "remote", title: "Operations Analyst", organization: "Foodpanda", logo: "🧮", location: "Remote · Pakistan", meta: "PKR 180k–300k", category: "Business", tags: ["Ops", "Remote"], deadline: inDays(30), remote: true, applyUrl: "https://www.rozee.pk/job/jsearch/q/operations%20analyst/fc/remote", description: "Optimize delivery operations with data-driven experiments." }),
];

const RAW_OPPORTUNITIES: Opportunity[] = [
  // Jobs — free to apply, verified listing platforms
  mk({ id: "j1", type: "job", title: "Frontend Engineer", organization: "Nebula Labs", logo: "🪐", location: "Berlin, DE", meta: "€60k–€85k", category: "Engineering", tags: ["React", "TypeScript", "Full-time"], deadline: inDays(60), applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Engineer&location=Berlin", remote: true, officialSource: false, description: "Build the next-gen web experience at Nebula Labs. Work with a distributed team on a modern React + TypeScript stack." }),
  mk({ id: "j2", type: "job", title: "Product Designer", organization: "Lumen Studio", logo: "🎨", location: "Lisbon, PT", meta: "€45k–€65k", category: "Design", tags: ["Figma", "UX", "Full-time"], deadline: inDays(45), applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Product%20Designer&location=Lisbon", description: "Own product design end-to-end across web and mobile surfaces." }),
  mk({ id: "j3", type: "job", title: "Data Analyst", organization: "Northwind Co.", logo: "📊", location: "London, UK", meta: "£40k–£55k", category: "Data", tags: ["SQL", "Python", "Full-time"], deadline: inDays(70), applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Analyst&location=London", remote: true, description: "Deliver insights that drive product and growth decisions." }),
  mk({ id: "j4", type: "job", title: "Marketing Associate", organization: "Bloom & Co.", logo: "🌸", location: "Nairobi, KE", meta: "$18k–$26k", category: "Marketing", tags: ["SEO", "Content"], deadline: inDays(30), applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Marketing%20Associate&location=Nairobi", description: "Grow a beloved brand across East Africa." }),

  // Internships — official employer sites
  mk({ id: "i1", type: "internship", title: "Software Engineering Intern", organization: "Google", logo: "🟦", location: "Zurich, CH", meta: "12 weeks", category: "Engineering", tags: ["Paid"], deadline: inDays(80), paid: true, officialSource: true, applyUrl: "https://www.google.com/about/careers/applications/jobs/results/?employment_type=INTERN", description: "Work alongside Google engineers on real production projects." }),
  mk({ id: "i2", type: "internship", title: "UX Research Intern", organization: "Spotify", logo: "🎧", location: "Stockholm, SE", meta: "6 months", category: "Design", tags: ["Paid"], deadline: inDays(50), paid: true, officialSource: true, applyUrl: "https://www.lifeatspotify.com/jobs?l=stockholm&c=internship", description: "Run user studies that shape the audio experiences of millions." }),
  mk({ id: "i3", type: "internship", title: "Data Science Intern", organization: "Meta", logo: "🔷", location: "London, UK", meta: "10 weeks", category: "Data", tags: ["Paid"], deadline: inDays(65), paid: true, officialSource: true, applyUrl: "https://www.metacareers.com/jobs?is_intern=1", description: "Apply ML to problems at planet scale." }),
  mk({ id: "i4", type: "internship", title: "Social Impact Intern", organization: "UNICEF", logo: "🕊️", location: "Remote", meta: "3 months", category: "Non-profit", tags: ["Unpaid"], deadline: inDays(35), paid: false, officialSource: true, applyUrl: "https://www.unicef.org/careers/internships", description: "Contribute to programs supporting children worldwide." }),

  // Scholarships — official portals
  mk({ id: "s1", type: "scholarship", title: "Chevening Scholarship", organization: "UK Government", logo: "🏆", location: "United Kingdom", meta: "Master's", category: "Fully Funded", tags: ["Fully Funded"], deadline: inDays(110), funding: "Fully Funded", officialSource: true, applyUrl: "https://www.chevening.org/scholarship/", description: "One-year master's degree at any UK university, fully funded." }),
  mk({ id: "s2", type: "scholarship", title: "DAAD Study Grant", organization: "DAAD", logo: "🎓", location: "Germany", meta: "Master's / PhD", category: "Fully Funded", tags: ["Fully Funded"], deadline: inDays(90), funding: "Fully Funded", officialSource: true, applyUrl: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/", description: "Study or research in Germany with full DAAD funding." }),
  mk({ id: "s3", type: "scholarship", title: "MEXT Scholarship", organization: "Japan Government", logo: "🗾", location: "Japan", meta: "All Levels", category: "Fully Funded", tags: ["Fully Funded"], deadline: inDays(75), funding: "Fully Funded", officialSource: true, applyUrl: "https://www.studyinjapan.go.jp/en/planning/about-scholarship/", description: "Study in Japan with full tuition, monthly stipend and travel." }),
  mk({ id: "s4", type: "scholarship", title: "Erasmus Mundus Joint Master", organization: "European Commission", logo: "🇪🇺", location: "European Union", meta: "Master's", category: "Fully Funded", tags: ["Fully Funded"], deadline: inDays(120), funding: "Fully Funded", officialSource: true, applyUrl: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en", description: "Two-year master's across multiple European universities." }),

  // Remote — free platforms only (RemoteOK, WeWorkRemotely, Remotive).
  mk({ id: "r1", type: "remote", title: "Mobile Engineer (iOS)", organization: "Kettle", logo: "🫖", location: "Remote", meta: "$90k–$120k", category: "Engineering", tags: ["Swift", "iOS", "Contract"], deadline: inDays(55), remote: true, applyUrl: "https://remoteok.com/remote-ios-jobs", description: "Ship the flagship iOS app. Fully remote, flexible timezone." }),
  mk({ id: "r2", type: "remote", title: "Growth Marketer", organization: "Loop", logo: "🔁", location: "Remote (EU)", meta: "$70k–$95k", category: "Marketing", tags: ["Growth", "Full-time"], deadline: inDays(60), remote: true, applyUrl: "https://weworkremotely.com/categories/remote-marketing-jobs", description: "Own growth channels for a fast-growing B2B SaaS." }),

  // Pakistan-focused remote roles
  ...PAKISTAN_REMOTE,

  // Fellowships
  mk({ id: "f1", type: "fellowship", title: "Mozilla Open Source Fellowship", organization: "Mozilla", logo: "🦊", location: "Remote", meta: "10 months", category: "Tech", tags: ["Paid", "Fellowship"], deadline: inDays(95), officialSource: true, applyUrl: "https://foundation.mozilla.org/en/what-we-fund/awards/", description: "Fund open-source contributions that benefit the internet." }),
  mk({ id: "f2", type: "fellowship", title: "Acumen Fellowship", organization: "Acumen", logo: "🌱", location: "Global", meta: "1 year", category: "Business", tags: ["Leadership"], deadline: inDays(100), officialSource: true, applyUrl: "https://acumenacademy.org/fellowship", description: "Leadership program for social change makers." }),

  // Competitions
  mk({ id: "c1", type: "competition", title: "Google Coding Competitions", organization: "Google", logo: "🧠", location: "Online", meta: "Team-based", category: "Engineering", tags: ["Prize"], deadline: inDays(45), officialSource: true, applyUrl: "https://codingcompetitions.withgoogle.com/", description: "Solve engineering problems with a team." }),
  mk({ id: "c2", type: "competition", title: "Hult Prize", organization: "Hult", logo: "🏅", location: "Global", meta: "USD 1M prize", category: "Business", tags: ["Prize"], deadline: inDays(90), officialSource: true, applyUrl: "https://www.hultprize.org/", description: "World's largest student startup competition." }),

  // Conferences
  mk({ id: "co1", type: "conference", title: "React Summit", organization: "GitNation", logo: "⚛️", location: "Amsterdam, NL", meta: "3 days", category: "Engineering", tags: ["Tech"], deadline: inDays(55), officialSource: true, applyUrl: "https://reactsummit.com/", description: "The biggest React conference in the world." }),
  mk({ id: "co2", type: "conference", title: "Web Summit", organization: "Web Summit", logo: "🌐", location: "Lisbon, PT", meta: "4 days", category: "Tech", tags: ["Networking"], deadline: inDays(95), officialSource: true, applyUrl: "https://websummit.com/", description: "Where the tech world meets." }),

  // Exchange
  mk({ id: "e1", type: "exchange", title: "Erasmus+ Exchange", organization: "European Commission", logo: "🎒", location: "EU", meta: "1–2 semesters", category: "Business", tags: ["Grant"], deadline: inDays(75), officialSource: true, applyUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students", description: "Study a semester in another European university." }),
  mk({ id: "e2", type: "exchange", title: "AIESEC Global Volunteer", organization: "AIESEC", logo: "🤝", location: "Global", meta: "6–8 weeks", category: "Non-profit", tags: ["Cultural"], deadline: inDays(50), officialSource: true, applyUrl: "https://aiesec.org/global-volunteer", description: "Volunteer abroad on SDG-linked projects." }),

  // Graduate
  mk({ id: "g1", type: "graduate", title: "Unilever Future Leaders Program", organization: "Unilever", logo: "🌿", location: "Global", meta: "3 years", category: "Business", tags: ["Graduate"], deadline: inDays(115), officialSource: true, applyUrl: "https://careers.unilever.com/uflp", description: "Fast-track graduate leadership program." }),
  mk({ id: "g2", type: "graduate", title: "McKinsey Business Analyst", organization: "McKinsey & Company", logo: "📈", location: "Global", meta: "2 years", category: "Consulting", tags: ["Graduate"], deadline: inDays(85), officialSource: true, applyUrl: "https://www.mckinsey.com/careers/search-jobs", description: "Solve the toughest problems for the world's leading organizations." }),

  // Bootcamps
  mk({ id: "b1", type: "bootcamp", title: "Le Wagon Web Development", organization: "Le Wagon", logo: "🚂", location: "Global / Online", meta: "9 or 24 weeks", category: "Tech", tags: ["Coding"], deadline: inDays(70), officialSource: true, applyUrl: "https://www.lewagon.com/apply", description: "Learn to build web apps and change your career." }),
  mk({ id: "b2", type: "bootcamp", title: "ALX Software Engineering", organization: "ALX Africa", logo: "🌍", location: "Africa / Online", meta: "12 months", category: "Tech", tags: ["Free"], deadline: inDays(55), officialSource: true, applyUrl: "https://www.alxafrica.com/programmes/", description: "Full-time software engineering program for African tech talent." }),
];

/**
 * Return only current/active opportunities:
 * - deadline must be today or later (expired jobs are auto-hidden)
 * - de-duplicated by id and by (title + organization) fingerprint
 * - stable ordering: soonest deadline first (so freshest urgent ones bubble up)
 */
function filterActive(list: Opportunity[]): Opportunity[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seenIds = new Set<string>();
  const seenKeys = new Set<string>();
  const out: Opportunity[] = [];
  for (const o of list) {
    if (seenIds.has(o.id)) continue;
    const key = `${o.title.toLowerCase().trim()}|${o.organization.toLowerCase().trim()}`;
    if (seenKeys.has(key)) continue;
    const d = new Date(o.deadline);
    if (Number.isNaN(d.getTime()) || d < today) continue;
    seenIds.add(o.id);
    seenKeys.add(key);
    out.push(o);
  }
  return out.sort((a, b) => (a.deadline < b.deadline ? -1 : a.deadline > b.deadline ? 1 : 0));
}

export const OPPORTUNITIES: Opportunity[] = filterActive(RAW_OPPORTUNITIES);

export const OPP_TYPES: { id: OppType; label: string; icon: string }[] = [
  { id: "job", label: "Jobs", icon: "💼" },
  { id: "internship", label: "Internships", icon: "🎓" },
  { id: "scholarship", label: "Scholarships", icon: "🏆" },
  { id: "remote", label: "Remote", icon: "🌍" },
  { id: "fellowship", label: "Fellowships", icon: "🌟" },
  { id: "competition", label: "Competitions", icon: "🏅" },
  { id: "conference", label: "Conferences", icon: "🎤" },
  { id: "exchange", label: "Exchange", icon: "🎒" },
  { id: "graduate", label: "Graduate", icon: "📈" },
  { id: "bootcamp", label: "Bootcamps", icon: "🚀" },
];

export const CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Data",
  "Marketing",
  "Non-profit",
  "Tech",
  "Business",
  "Consulting",
] as const;

export function getByType(type: OppType) {
  return OPPORTUNITIES.filter((o) => o.type === type);
}

export function getOpportunity(id: string) {
  return OPPORTUNITIES.find((o) => o.id === id);
}

export const TRENDING = [
  { label: "AI & ML", icon: "🤖", count: 128 },
  { label: "Product", icon: "🚀", count: 94 },
  { label: "Design", icon: "🎨", count: 76 },
  { label: "Data", icon: "📊", count: 61 },
  { label: "Growth", icon: "📈", count: 52 },
  { label: "Research", icon: "🔬", count: 34 },
];
