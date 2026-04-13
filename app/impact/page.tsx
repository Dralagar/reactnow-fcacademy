import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

const stats = [
  { value: "15+", label: "Youth players engaged" },
  { value: "5", label: "Countries represented" },
  { value: "100%", label: "Free to participate" },
  { value: "95%", label: "Parent satisfaction (goal)" },
];

export default function ImpactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Our Impact"
        subtitle="Measured in attendance, grades, leadership moments, and the trust families place in us week after week."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC impact on the pitch"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-5xl px-4">
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-text-secondary">
            Impact is not one poster metric—it is homework turned in, a shy
            player speaking in a huddle, a clean-up day that fills a pitch with
            pride. Detailed reports and stories will anchor this page as we
            publish them.
          </p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="rounded-2xl border border-border bg-white px-6 py-8 text-center shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-2 text-sm font-medium text-text-secondary">{s.label}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/join" className="btn btn-primary">
              Join the movement
            </Link>
            <Link href="/sustainability" className="btn btn-outline">
              Climate & service
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
