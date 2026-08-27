export interface AgencyChannel {
  name: string;
  label: string;
  url: string;
  iconName: string;
  color: string;
  badge?: string;
  description: string;
}

export const AGENCY_CONFIG = {
  name: "CodeStudio",
  tagline: "Software & Mobile App Development Team",
  shortBio:
    "We design, build, and deploy production-ready web apps, Flutter & native mobile apps, and scalable microservices. Available for custom contracts on Fiverr, Upwork, and direct hiring.",
  email: "contact@codestudio.dev",
  phone: "+880 1700-000000",
  whatsappNumber: "+8801700000000",
  whatsappUrl: "https://wa.me/8801700000000?text=Hello%20CodeStudio%2C%20I%20want%20to%20discuss%20a%20custom%20software%2Fapp%20project.",
  fiverrUrl: "https://www.fiverr.com",
  upworkUrl: "https://www.upwork.com",
  linkedinUrl: "https://www.linkedin.com",
  githubUrl: "https://github.com",
  
  services: [
    {
      title: "Build Brand New App",
      description: "Custom UI/UX, full-stack architecture, API integration, and app store release from ground up.",
      badge: "End-to-End",
    },
    {
      title: "Rebuild / Customize Existing Project",
      description: "Take any of our showcased platforms or your existing codebase and customize it for your brand & business rules.",
      badge: "Fast Turnaround",
    },
    {
      title: "Dedicated Developer Hiring",
      description: "Hire our specialized Frontend, Flutter, Android, iOS, or Backend engineers on milestone/contract basis.",
      badge: "Flexible",
    },
  ],

  trustBadges: [
    { label: "100% Source Code Ownership", sub: "Clean & modular git repo" },
    { label: "Marketplace Verified", sub: "Hire safely via Fiverr / Upwork" },
    { label: "Direct Support & Revisions", sub: "WhatsApp / Slack / Email" },
    { label: "Private Client Portal", sub: "Live milestone tracking" },
  ],
};
