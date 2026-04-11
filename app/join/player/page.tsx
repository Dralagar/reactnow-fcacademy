import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function JoinPlayerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Join as a Player"
        subtitle="For youth who are ready to learn, listen, and grow—with football as the classroom."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="Youth football training"
      />
      <section className="section">
        <div className="container-custom mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold text-text-primary">What we look for</h2>
            <ul className="mb-8 list-inside list-disc space-y-2 text-text-secondary">
              <li>Commitment to training times and team standards</li>
              <li>Respect for coaches, peers, and the community</li>
              <li>Willingness to balance school and sport</li>
            </ul>
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              Full registration steps and age groups will be published here
              soon. Until then, email us or visit contact—we will walk families
              through the next steps personally.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Start a conversation
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src="/images/Geo.JPG"
              alt="Coach working with academy players"
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
