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
};

const mk = (o: Opportunity) => o;

export const OPPORTUNITIES: Opportunity[] = [
  // Jobs
  mk({ id: "j1", type: "job", title: "Frontend Engineer", organization: "Nebula Labs", logo: "🪐", location: "Berlin, DE", meta: "€60k–€85k", category: "Engineering", tags: ["React", "TypeScript", "Full-time"], deadline: "2026-08-14", applyUrl: "https://jobs.ashbyhq.com/", remote: true, description: "Build the next-gen web experience at Nebula Labs. Work with a distributed team on a modern React + TypeScript stack." }),
  mk({ id: "j2", type: "job", title: "Product Designer", organization: "Lumen Studio", logo: "🎨", location: "Lisbon, PT", meta: "€45k–€65k", category: "Design", tags: ["Figma", "UX", "Full-time"], deadline: "2026-08-01", applyUrl: "https://www.linkedin.com/jobs/", description: "Own product design end-to-end across web and mobile surfaces." }),
  mk({ id: "j3", type: "job", title: "Data Analyst", organization: "Northwind Co.", logo: "📊", location: "London, UK", meta: "£40k–£55k", category: "Data", tags: ["SQL", "Python", "Full-time"], deadline: "2026-08-20", applyUrl: "https://www.linkedin.com/jobs/", remote: true, description: "Deliver insights that drive product and growth decisions." }),
  mk({ id: "j4", type: "job", title: "Marketing Associate", organization: "Bloom & Co.", logo: "🌸", location: "Nairobi, KE", meta: "$18k–$26k", category: "Marketing", tags: ["SEO", "Content"], deadline: "2026-07-30", applyUrl: "https://www.linkedin.com/jobs/", description: "Grow a beloved brand across East Africa." }),

  // Internships
  mk({ id: "i1", type: "internship", title: "Software Engineering Intern", organization: "Google", logo: "🟦", location: "Zurich, CH", meta: "12 weeks", category: "Engineering", tags: ["Paid"], deadline: "2026-09-01", paid: true, applyUrl: "https://careers.google.com/students/", description: "Work alongside Google engineers on real production projects." }),
  mk({ id: "i2", type: "internship", title: "UX Research Intern", organization: "Spotify", logo: "🎧", location: "Stockholm, SE", meta: "6 months", category: "Design", tags: ["Paid"], deadline: "2026-08-10", paid: true, applyUrl: "https://www.lifeatspotify.com/students", description: "Run user studies that shape the audio experiences of millions." }),
  mk({ id: "i3", type: "internship", title: "Data Science Intern", organization: "Meta", logo: "🔷", location: "London, UK", meta: "10 weeks", category: "Data", tags: ["Paid"], deadline: "2026-08-18", paid: true, applyUrl: "https://www.metacareers.com/careerprograms", description: "Apply ML to problems at planet scale." }),
  mk({ id: "i4", type: "internship", title: "Social Impact Intern", organization: "UNICEF", logo: "🕊️", location: "Remote", meta: "3 months", category: "Non-profit", tags: ["Unpaid"], deadline: "2026-07-28", paid: false, applyUrl: "https://www.unicef.org/careers/internships", description: "Contribute to programs supporting children worldwide." }),

  // Scholarships
  mk({ id: "s1", type: "scholarship", title: "Chevening Scholarship", organization: "UK Government", logo: "🏆", location: "United Kingdom", meta: "Master's", category: "Fully Funded", tags: ["Fully Funded"], deadline: "2026-11-05", funding: "Fully Funded", applyUrl: "https://www.chevening.org/scholarship/", description: "One-year master's degree at any UK university, fully funded." }),
  mk({ id: "s2", type: "scholarship", title: "DAAD Study Grant", organization: "DAAD", logo: "🎓", location: "Germany", meta: "Master's / PhD", category: "Fully Funded", tags: ["Fully Funded"], deadline: "2026-10-15", funding: "Fully Funded", applyUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/", description: "Study or research in Germany with full DAAD funding." }),
  mk({ id: "s3", type: "scholarship", title: "MEXT Scholarship", organization: "Japan Government", logo: "🗾", location: "Japan", meta: "All Levels", category: "Fully Funded", tags: ["Fully Funded"], deadline: "2026-06-30", funding: "Fully Funded", applyUrl: "https://www.studyinjapan.go.jp/en/planning/scholarship/", description: "Study in Japan with full tuition, monthly stipend and travel." }),
  mk({ id: "s4", type: "scholarship", title: "Erasmus Mundus Joint Master", organization: "European Commission", logo: "🇪🇺", location: "European Union", meta: "Master's", category: "Fully Funded", tags: ["Fully Funded"], deadline: "2026-01-15", funding: "Fully Funded", applyUrl: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en", description: "Two-year master's across multiple European universities." }),

  // Remote (also flagged remote in jobs above; keep dedicated entries too)
  mk({ id: "r1", type: "remote", title: "Mobile Engineer (iOS)", organization: "Kettle", logo: "🫖", location: "Remote", meta: "$90k–$120k", category: "Engineering", tags: ["Swift", "iOS", "Contract"], deadline: "2026-08-25", remote: true, applyUrl: "https://remoteok.com/remote-ios-jobs", description: "Ship the flagship iOS app. Fully remote, flexible timezone." }),
  mk({ id: "r2", type: "remote", title: "Growth Marketer", organization: "Loop", logo: "🔁", location: "Remote (EU)", meta: "$70k–$95k", category: "Marketing", tags: ["Growth", "Full-time"], deadline: "2026-08-30", remote: true, applyUrl: "https://weworkremotely.com/", description: "Own growth channels for a fast-growing B2B SaaS." }),

  // Fellowships
  mk({ id: "f1", type: "fellowship", title: "Mozilla Open Source Fellowship", organization: "Mozilla", logo: "🦊", location: "Remote", meta: "10 months", category: "Tech", tags: ["Paid", "Fellowship"], deadline: "2026-09-30", applyUrl: "https://foundation.mozilla.org/en/what-we-fund/awards/", description: "Fund open-source contributions that benefit the internet." }),
  mk({ id: "f2", type: "fellowship", title: "Acumen Fellowship", organization: "Acumen", logo: "🌱", location: "Global", meta: "1 year", category: "Impact", tags: ["Leadership"], deadline: "2026-10-01", applyUrl: "https://acumenacademy.org/fellowship", description: "Leadership program for social change makers." }),

  // Competitions
  mk({ id: "c1", type: "competition", title: "Google Hash Code", organization: "Google", logo: "🧠", location: "Online", meta: "Team-based", category: "Coding", tags: ["Prize"], deadline: "2026-04-15", applyUrl: "https://codingcompetitions.withgoogle.com/", description: "Solve engineering problems with a team of up to four." }),
  mk({ id: "c2", type: "competition", title: "Hult Prize", organization: "Hult", logo: "🏅", location: "Global", meta: "USD 1M prize", category: "Startup", tags: ["Prize"], deadline: "2026-09-15", applyUrl: "https://www.hultprize.org/", description: "World's largest student startup competition." }),

  // Conferences
  mk({ id: "co1", type: "conference", title: "React Summit", organization: "GitNation", logo: "⚛️", location: "Amsterdam, NL", meta: "3 days", category: "Engineering", tags: ["Tech"], deadline: "2026-05-01", applyUrl: "https://reactsummit.com/", description: "The biggest React conference in the world." }),
  mk({ id: "co2", type: "conference", title: "Web Summit", organization: "Web Summit", logo: "🌐", location: "Lisbon, PT", meta: "4 days", category: "Tech", tags: ["Networking"], deadline: "2026-10-01", applyUrl: "https://websummit.com/", description: "Where the tech world meets." }),

  // Exchange programs
  mk({ id: "e1", type: "exchange", title: "Erasmus+ Exchange", organization: "European Commission", logo: "🎒", location: "EU", meta: "1–2 semesters", category: "Study Abroad", tags: ["Grant"], deadline: "2026-03-01", applyUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students", description: "Study a semester in another European university." }),
  mk({ id: "e2", type: "exchange", title: "AIESEC Global Volunteer", organization: "AIESEC", logo: "🤝", location: "Global", meta: "6–8 weeks", category: "Volunteering", tags: ["Cultural"], deadline: "2026-06-01", applyUrl: "https://aiesec.org/global-volunteer", description: "Volunteer abroad on SDG-linked projects." }),

  // Graduate programs
  mk({ id: "g1", type: "graduate", title: "Unilever Future Leaders Program", organization: "Unilever", logo: "🌿", location: "Global", meta: "3 years", category: "Business", tags: ["Graduate"], deadline: "2026-11-30", applyUrl: "https://careers.unilever.com/unilever-future-leaders-programme", description: "Fast-track graduate leadership program." }),
  mk({ id: "g2", type: "graduate", title: "McKinsey Business Analyst", organization: "McKinsey & Company", logo: "📈", location: "Global", meta: "2 years", category: "Consulting", tags: ["Graduate"], deadline: "2026-09-15", applyUrl: "https://www.mckinsey.com/careers/students", description: "Solve the toughest problems for the world's leading organizations." }),

  // Bootcamps
  mk({ id: "b1", type: "bootcamp", title: "Le Wagon Web Development", organization: "Le Wagon", logo: "🚂", location: "Global / Online", meta: "9 or 24 weeks", category: "Tech", tags: ["Coding"], deadline: "2026-09-01", applyUrl: "https://www.lewagon.com/", description: "Learn to build web apps and change your career." }),
  mk({ id: "b2", type: "bootcamp", title: "ALX Software Engineering", organization: "ALX Africa", logo: "🌍", location: "Africa / Online", meta: "12 months", category: "Tech", tags: ["Free"], deadline: "2026-08-15", applyUrl: "https://www.alxafrica.com/", description: "Full-time software engineering program for African tech talent." }),
];

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
