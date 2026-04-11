import Image from "next/image";
import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

const leaders = [
  {
    name: "George Dralagar",
    role: "Founder & Executive Director",
    src: "/testimonials/george-dralagar.jpg",
    alt: "George Dralagar",
    blurb: "Sets the vision: football as a bridge to education, dignity, and long-term opportunity.",
  },
  {
    name: "Keroro — Nicolas Wol Atak",
    role: "Head Coach",
    src: "/testimonials/coach-keroro.jpg",
    alt: "Coach Keroro",
    blurb: "Leads the technical side—building confident players and captains on and off the ball.",
  },
];

export default function AboutTeamPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="The Team Behind the Academy"
        subtitle="Coaches, coordinators, volunteers, and partners who keep standards high and young people seen."
        imageSrc="/testimonials/coach-keroro.jpg"
        imageAlt="React Now FC coaching staff"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-5xl px-4">
          <div className="grid gap-10 md:grid-cols-2">
            {leaders.map((person) => (
              <article
                key={person.name}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={person.src}
                    alt={person.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-text-primary">{person.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-primary">{person.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{person.blurb}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-text-secondary">
            Volunteers, parents, and partner organisations expand this team every week. Want to stand with us?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/join/volunteer" className="btn btn-outline">
              Volunteer
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
