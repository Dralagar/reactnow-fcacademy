import Link from "next/link";
import Image from "next/image";
import SitePageHero from "@/components/SitePageHero";

const roles = [
  "Training helpers & kit managers",
  "Homework and literacy support",
  "Event and match-day coordination",
  "Photography and storytelling",
];

export default function JoinVolunteerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Volunteer"
        subtitle="Your time multiplies what we can offer—on the pitch, in the classroom, and behind the scenes."
        imageSrc="/testimonials/coach-keroro.jpg"
        imageAlt="Coaching and mentoring at React Now FC"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="/images/Hero1.jpeg"
                alt="Team practice at React Now FC"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold text-text-primary">Ways to help</h2>
              <ul className="mb-8 space-y-3">
                {roles.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-text-secondary shadow-sm"
                  >
                    <span className="mt-0.5 text-primary" aria-hidden>
                      ✓
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Offer your skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
