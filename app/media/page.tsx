import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

export default function MediaPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Media Kit"
        subtitle="Logos, colours, and facts for journalists, creators, and partners who tell our story accurately."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC on the pitch"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-4xl px-4">
          <div className="mb-10 flex justify-center">
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-md md:h-56 md:w-56">
              <Image
                src="/images/reactnowlog.png"
                alt="React Now FC logo download preview"
                fill
                className="object-contain p-4"
                sizes="224px"
              />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-text-primary">Quick facts</h2>
            <ul className="list-inside list-disc space-y-2 text-text-secondary">
              <li>Name: React Now FC Academy</li>
              <li>Focus: Grassroots football, education, mentorship, climate action</li>
              <li>Location: Nairobi, Kenya</li>
              <li>Contact: info@reactnowfc.org</li>
            </ul>
            <p className="mt-6 text-sm text-text-muted">
              High-resolution logo packs and press releases will be linked here
              for download. For urgent media requests, email us directly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
