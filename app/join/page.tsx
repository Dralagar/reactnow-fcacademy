import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

const paths = [
  {
    href: "/join/player",
    title: "Join as a player",
    desc: "Train with structure, standards, and coaches who invest in your future.",
  },
  {
    href: "/join/volunteer",
    title: "Volunteer",
    desc: "Mentor, organise, or share a skill—time is one of our greatest assets.",
  },
  {
    href: "/join/partner",
    title: "Partner with us",
    desc: "Align your brand or organisation with grassroots impact that lasts.",
  },
  {
    href: "/join/donate",
    title: "Donate",
    desc: "Fund kits, learning materials, and pitch time for kids who need it most.",
  },
];

export default function JoinPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Get Involved"
        subtitle="Players, volunteers, partners, donors—there is a lane for everyone who believes football can change lives."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="Young players ready to train"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-5xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {paths.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-primary/35 hover:bg-white hover:shadow-lg"
              >
                <h2 className="text-xl font-bold text-text-primary group-hover:text-primary">
                  {p.title}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
