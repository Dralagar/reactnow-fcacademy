import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

const spotlights = [
  {
    title: "Player of the Week",
    name: "James 'Jamo' Odhiambo",
    detail: "Midfielder · Age 12 · 95% attendance — leads warm-ups and lifts teammates.",
  },
  {
    title: "Rising Star",
    name: "kAMA",
    detail: "Forward · Age 6 — clinical finishing and relentless work rate in training.",
  },
  {
    title: "Training moment",
    name: "Kama",
    detail: "consistnent traing for three days — proof of belief, fitness, and never switching off.",
  },
];

export default function TeamHighlightsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Player Highlights"
        subtitle="Celebrating discipline, effort, and the small wins that become careers and character."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC match action"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border shadow-lg lg:min-h-[320px]">
              <Image
                src="/images/Hero1.jpeg"
                alt="Youth football highlight moment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-3 text-2xl font-bold text-text-primary">
                Stories from the pitch
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                This archive will grow with photos, short clips, and quotes from
                players and parents. For now, these spotlights mirror what you
                see on the home page—real names, real standards, real joy.
              </p>
            </div>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {spotlights.map((s) => (
              <li
                key={s.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.title}
                </p>
                <h3 className="mt-2 text-lg font-bold text-text-primary">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href="/" className="btn btn-outline">
              Back to home
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
