"use client";
import React from "react";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function CoachesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Our Coaches"
        subtitle="Meet the people who make our academy possible."
        imageSrc="/images/React10.jpeg"
        imageAlt="Coach Keroro - Nicolas Wol Atak"
      />
    </main>
  );
}