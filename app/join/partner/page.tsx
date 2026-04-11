import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function JoinPartnerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Partner With Us"
        subtitle="Sponsor kits, learning labs, or community days—stand beside a brand that shows up where it matters."
        imageSrc="/images/Geo.JPG"
        imageAlt="React Now FC partnership and community"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-xl font-bold text-text-primary">
                Why organisations choose us
              </h2>
              <p className="mb-4 text-base leading-relaxed text-text-secondary">
                Transparent storytelling, visible pitch-side presence, and
                programs that tie football to education and climate action. We
                build partnerships that respect both your brand and our young
                people.
              </p>
              <p className="mb-8 text-base leading-relaxed text-text-secondary">
                Request a short deck or schedule a call—we will tailor impact
                themes to your CSR or community goals.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Talk partnerships
              </Link>
            </div>
            <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl border border-border shadow-lg lg:justify-self-end">
              <Image
                src="/images/reactnowlog.png"
                alt="React Now FC logo"
                fill
                className="object-contain bg-surface p-8"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
