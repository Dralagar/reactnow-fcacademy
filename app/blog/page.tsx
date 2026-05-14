import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

// SEO metadata for blog page
export const metadata: Metadata = {
  title: "Blog | React Now FC Academy Nairobi",
  description: "Read the React Now FC Academy blog for match recaps, player spotlights, coach reflections, and stories from Nairobi's accessible football training community. All abilities welcome.",
  keywords: [
    "React Now FC blog",
    "football academy stories",
    "youth football blog Nairobi",
    "accessible sports blog",
    "player spotlights",
    "football match recaps",
    "coach reflections",
    "community football stories",
    "inclusive sports blog"
  ],
  openGraph: {
    title: "React Now FC Academy Blog | Stories from the Pitch",
    description: "Discover inspiring stories from Nairobi's accessible football academy - player spotlights, match recaps, and community impact stories.",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "React Now FC Academy Blog - Stories from the Pitch"
      }
    ]
  },
  alternates: {
    canonical: "https://reactnowfc.org/blog"
  }
};

export default function BlogPage() {
  return <BlogClient />;
}
