import Image from "next/image";
import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

export default function ProgramsMentorshipPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Mentorship"
        subtitle="Trusted adults who show up beyond the final whistle—for homework, heart, and hard conversations."
        imageSrc="/testimonials/george-dralagar.jpg"
        imageAlt="Mentorship and leadership"
      />
      <section className="section">
        <div className="container-custom mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-lg leading-relaxed text-text-secondary">
              Mentors pair consistency with care: checking in on school, family
              dynamics, and goals outside football. We train mentors to listen
              first and model the same respect we expect on the pitch.
            </p>
            <p className="mb-8 text-base leading-relaxed text-text-secondary">
              Mentor onboarding and schedules will be published here. Want to
              walk with one player or a small group? Start with contact.
            </p>
            <Link href="/join/volunteer" className="btn btn-primary">
              Become a mentor
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src="/testimonials/coach-keroro.jpg"
              alt="Coach mentoring players"
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
