import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function ProgramsAcademyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Football Academy"
        subtitle="Age-appropriate training, clear expectations, and coaches who coach the person—not only the player."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="Academy training session"
      />
      <section className="section">
        <div className="container-custom mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src="/images/Geo.JPG"
              alt="Coach demonstrating technique"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="mb-4 text-lg leading-relaxed text-text-secondary">
              Sessions blend technical work, small-sided games, and match
              preparation. Discipline is part of the curriculum: punctuality,
              kit care, and communication with parents.
            </p>
            <p className="mb-8 text-base leading-relaxed text-text-secondary">
              Schedules, age brackets, and registration will be posted here as
              we finalise the season calendar.
            </p>
            <Link href="/join/player" className="btn btn-primary">
              Join as a player
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
