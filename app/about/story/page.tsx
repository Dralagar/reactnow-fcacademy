import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function AboutStoryPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Our Story"
        subtitle="From one pitch and a stubborn belief that structure changes lives—this is how React Now FC took shape."
        imageSrc="/images/Geo.JPG"
        imageAlt="Coaching session with React Now FC"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-3xl px-4">
          <p className="mb-6 text-lg leading-relaxed text-text-secondary">
            React Now FC Academy was born from a simple idea:{" "}
            <strong className="font-semibold text-text-primary">
              care, consistency, and opportunity
            </strong>{" "}
            should not be reserved for a lucky few. What started as grassroots
            training has grown into a disciplined program where football opens
            the door to mentorship, school support, and digital literacy.
          </p>
          <p className="mb-6 text-base leading-relaxed text-text-secondary">
            Every milestone—new players, parent trust, community clean-ups, and
            partnerships—writes another chapter. We are building slowly and
            intentionally, because youth development is a long match, not a
            single highlight.
          </p>
          <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src="/images/Hero1.jpeg"
              alt="Youth football in action with React Now FC"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          <Link href="/about/mission" className="btn btn-primary">
            Mission &amp; vision
          </Link>
        </div>
      </section>
    </main>
  );
}
