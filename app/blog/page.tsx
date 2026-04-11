import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Academy Blog"
        subtitle="Match recaps, player spotlights, and honest notes from the people who live this work daily."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC stories"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="/images/Geo.JPG"
                alt="From the pitch"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                We&apos;re building a living archive: parents&apos; voices,
                coach reflections, and the moments that don&apos;t fit a
                scoreline. Posts will appear here as we publish—subscribe via
                contact if you want updates.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Request updates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
