import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

const commitments = [
  {
    title: "Mission",
    body: "Use football as an engine for structure, character, and opportunity for vulnerable youth—on the pitch, in school, and in life.",
  },
  {
    title: "Vision",
    body: "A community where every young person who wants to grow finds coaches, mentors, and programs that believe in their future.",
  },
  {
    title: "How we work",
    body: "Free to participate where possible, high expectations always: attendance, respect, effort, and teamwork are non-negotiable.",
  },
];

export default function AboutMissionPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Mission & Vision"
        subtitle="Clear north stars guide every training session, parent conversation, and partnership we say yes to."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC team spirit on the field"
      />
      <section className="section bg-surface">
        <div className="container-custom mx-auto max-w-5xl px-4">
          <ul className="grid gap-6 md:grid-cols-3">
            {commitments.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="mb-3 text-lg font-bold text-primary">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base text-text-secondary">
            Our full roadmap and annual goals will live here as we publish
            them. Until then, walk the site—every program page reflects how we
            turn this mission into weekly practice.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/programs/academy" className="btn btn-primary">
              Explore programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
