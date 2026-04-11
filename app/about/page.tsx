import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="About React Now FC Academy"
        subtitle="Grassroots football with structure, heart, and a long view—so talent everywhere can meet opportunity."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC players training together"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                Who we are
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                We are a community-rooted academy in Nairobi using the beautiful
                game to build discipline, education habits, and real pathways
                for young people—not only on match day, but every week.
              </p>
              <p className="mb-8 text-base leading-relaxed text-text-secondary">
                Football is our starting point. Growth, accountability, and
                belonging are the destination we train toward together with
                families, coaches, and partners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about/story" className="btn btn-primary">
                  Our story
                </Link>
                <Link href="/impact" className="btn btn-outline">
                  See our impact
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="/testimonials/george-dralagar.jpg"
                alt="George Dralagar, Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
