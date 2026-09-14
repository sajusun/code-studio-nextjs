export function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://sajusun.github.io/#person",
        "name": "Sakhawat Hossain",
        "alternateName": ["sajusun", "Saju Sun", "Saju"],
        "jobTitle": "Backend Software Engineer & Full-Stack Architect",
        "url": "https://sajusun.github.io/",
        "sameAs": [
          "https://github.com/sajusun",
          "https://linkedin.com/in/sajusun"
        ],
        "knowsAbout": [
          "PHP",
          "Laravel",
          "Next.js",
          "React",
          "TypeScript",
          "Amazon Web Services (AWS)",
          "RESTful APIs",
          "Microservices & Modular Architecture",
          "WebSockets",
          "Laravel Reverb",
          "MySQL",
          "Redis",
          "Docker"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Softvence IT Ltd"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dhaka",
          "addressCountry": "Bangladesh"
        }
      },
      {
        "@type": "WebApplication",
        "@id": "https://code-studio-pro.vercel.app/#webapp",
        "name": "CodeStudio PRO",
        "alternateName": "CodeStudio Software Showcase & Engineering Hub",
        "url": "https://code-studio-pro.vercel.app",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": "A modern, full-featured digital software marketplace, developer showcase, and interactive engineering platform built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and Laravel headless backend.",
        "codeRepository": "https://github.com/sajusun/code-studio-nextjs",
        "license": "https://opensource.org/licenses/MIT",
        "author": {
          "@id": "https://sajusun.github.io/#person"
        },
        "creator": {
          "@id": "https://sajusun.github.io/#person"
        },
        "maintainer": {
          "@id": "https://sajusun.github.io/#person"
        },
        "copyrightHolder": {
          "@id": "https://sajusun.github.io/#person"
        },
        "programmingLanguage": [
          "TypeScript",
          "React 19",
          "Next.js 16",
          "Tailwind CSS v4",
          "PHP",
          "Laravel 12"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/OnlineOnly"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://code-studio-pro.vercel.app/#website",
        "url": "https://code-studio-pro.vercel.app",
        "name": "CodeStudio PRO — Software Showcase & Engineering Hub",
        "description": "Explore production-ready web applications, mobile apps, SaaS tools, and headless microservices with live interactive sandbox demos.",
        "publisher": {
          "@id": "https://sajusun.github.io/#person"
        },
        "author": {
          "@id": "https://sajusun.github.io/#person"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
