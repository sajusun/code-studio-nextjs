import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeStudio PRO — Software Showcase & Engineering Hub",
    short_name: "CodeStudio PRO",
    description:
      "Enterprise digital software marketplace, SaaS tools showcase, and interactive engineering platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
