import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function SustainabilityPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Sustainability & Climate"
        subtitle="Caring for pitches, neighbourhoods, and the planet our players will inherit."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="Community sustainability"
      />
      <section className="section">
        <div className="container-custom mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-lg leading-relaxed text-text-secondary">
              Sustainability means showing up for clean-ups, planting trees,
              reducing waste at events, and teaching young people that
              leadership includes environmental responsibility.
            </p>
            <p className="mb-8 text-base leading-relaxed text-text-secondary">
              Metrics and photo stories from each initiative will be shared here
              as we document the season.
            </p>
            <Link href="/programs/climate" className="btn btn-primary">
              Climate program
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src="/images/Geo.JPG"
              alt="Team and community"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
