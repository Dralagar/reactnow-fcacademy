import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

const topics = ["Safe internet & social media", "Intro to coding & logic", "Tools for school & CV basics"];

export default function ProgramsDigitalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Digital Literacy"
        subtitle="The same discipline we teach in defence applies online: think, verify, and use tech to open doors."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="Youth at React Now FC"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-3xl px-4">
          <p className="mb-8 text-lg leading-relaxed text-text-secondary">
            Weekly-style workshops introduce youth to coding concepts, digital
            safety, and practical tools—always alongside our football calendar
            so no child has to choose between pitch and progress.
          </p>
          <h2 className="mb-4 text-lg font-bold text-text-primary">Sample focus areas</h2>
          <ul className="mb-10 space-y-3">
            {topics.map((t) => (
              <li
                key={t}
                className="rounded-xl border border-border bg-white px-4 py-3 text-text-secondary shadow-sm"
              >
                {t}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary">
            Offer devices or mentor time
          </Link>
        </div>
      </section>
    </main>
  );
}
