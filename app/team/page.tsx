import Image from "next/image";
import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

export default function TeamPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Meet the Team"
        subtitle="The people who show up early, stay late, and believe in young people before they believe in themselves."
        imageSrc="/images/Hero5.jpeg"
        imageAlt="React Now FC squad and coaches"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary md:text-3xl">
                Coaches, mentors, and community
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                Behind every session is a crew committed to long-term youth
                development—not quick wins. We grow when players grow.
              </p>
              <p className="mb-8 text-base leading-relaxed text-text-secondary">
                Explore leadership profiles on our about section, then dive into
                player spotlights and weekly features.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about/team" className="btn btn-primary">
                  Staff & leadership
                </Link>
                <Link href="/team/highlights" className="btn btn-outline">
                  Player highlights
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-md">
                <Image
                  src="/testimonials/coach-keroro.jpg"
                  alt="Head coach Keroro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-md">
                <Image
                  src="/images/Hero1.jpeg"
                  alt="Founder George Dralagar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative col-span-2 aspect-[21/9] overflow-hidden rounded-2xl border border-border shadow-md">
                <Image
                  src="/images/Geo.JPG"
                  alt="Training with React Now FC"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
