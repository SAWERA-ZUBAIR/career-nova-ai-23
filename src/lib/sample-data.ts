// Sample data. Structured so it can later be swapped for API calls.

export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string; // emoji or initials placeholder
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract";
  remote: boolean;
  deadline: string;
  category: string;
  tags: string[];
};

export type Internship = {
  id: string;
  role: string;
  company: string;
  logo: string;
  duration: string;
  paid: boolean;
  location: string;
  deadline: string;
  category: string;
};

export type Scholarship = {
  id: string;
  name: string;
  country: string;
  university: string;
  funding: "Fully Funded" | "Partial" | "Tuition Only";
  deadline: string;
  level: string;
};

export type RemoteJob = Job & { timezone: string };

export const JOBS: Job[] = [
  { id: "j1", title: "Frontend Engineer", company: "Nebula Labs", logo: "🪐", location: "Berlin, DE", salary: "€60k–€85k", type: "Full-time", remote: true, deadline: "2026-08-14", category: "Engineering", tags: ["React", "TypeScript"] },
  { id: "j2", title: "Product Designer", company: "Lumen Studio", logo: "🎨", location: "Lisbon, PT", salary: "€45k–€65k", type: "Full-time", remote: false, deadline: "2026-08-01", category: "Design", tags: ["Figma", "UX"] },
  { id: "j3", title: "Data Analyst", company: "Northwind Co.", logo: "📊", location: "London, UK", salary: "£40k–£55k", type: "Full-time", remote: true, deadline: "2026-08-20", category: "Data", tags: ["SQL", "Python"] },
  { id: "j4", title: "Marketing Associate", company: "Bloom & Co.", logo: "🌸", location: "Nairobi, KE", salary: "$18k–$26k", type: "Full-time", remote: false, deadline: "2026-07-30", category: "Marketing", tags: ["SEO", "Content"] },
  { id: "j5", title: "Mobile Engineer (iOS)", company: "Kettle", logo: "🫖", location: "Remote", salary: "$90k–$120k", type: "Contract", remote: true, deadline: "2026-08-25", category: "Engineering", tags: ["Swift", "iOS"] },
];

export const INTERNSHIPS: Internship[] = [
  { id: "i1", role: "Software Engineering Intern", company: "Google", logo: "🟦", duration: "12 weeks", paid: true, location: "Zurich, CH", deadline: "2026-09-01", category: "Engineering" },
  { id: "i2", role: "UX Research Intern", company: "Spotify", logo: "🎧", duration: "6 months", paid: true, location: "Stockholm, SE", deadline: "2026-08-10", category: "Design" },
  { id: "i3", role: "Data Science Intern", company: "Meta", logo: "🔷", duration: "10 weeks", paid: true, location: "London, UK", deadline: "2026-08-18", category: "Data" },
  { id: "i4", role: "Social Impact Intern", company: "UNICEF", logo: "🕊️", duration: "3 months", paid: false, location: "Remote", deadline: "2026-07-28", category: "Non-profit" },
];

export const SCHOLARSHIPS: Scholarship[] = [
  { id: "s1", name: "Chevening Scholarship", country: "United Kingdom", university: "Multiple", funding: "Fully Funded", deadline: "2026-11-05", level: "Master's" },
  { id: "s2", name: "DAAD Study Grant", country: "Germany", university: "Multiple", funding: "Fully Funded", deadline: "2026-10-15", level: "Master's / PhD" },
  { id: "s3", name: "MEXT Scholarship", country: "Japan", university: "Multiple", funding: "Fully Funded", deadline: "2026-06-30", level: "All Levels" },
  { id: "s4", name: "Erasmus Mundus", country: "European Union", university: "Consortium", funding: "Fully Funded", deadline: "2026-01-15", level: "Master's" },
  { id: "s5", name: "Rhodes Scholarship", country: "United Kingdom", university: "Oxford", funding: "Fully Funded", deadline: "2026-10-01", level: "Postgraduate" },
];

export const REMOTE_JOBS: RemoteJob[] = JOBS.filter((j) => j.remote).map((j) => ({ ...j, timezone: "Flexible" }));

export const CATEGORIES = ["All", "Engineering", "Design", "Data", "Marketing", "Non-profit"] as const;

export const TRENDING = [
  { label: "AI & ML", icon: "🤖", count: 128 },
  { label: "Product", icon: "🚀", count: 94 },
  { label: "Design", icon: "🎨", count: 76 },
  { label: "Data", icon: "📊", count: 61 },
  { label: "Growth", icon: "📈", count: 52 },
  { label: "Research", icon: "🔬", count: 34 },
];
