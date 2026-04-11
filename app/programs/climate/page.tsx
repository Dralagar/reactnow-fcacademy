import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

const actions = [
  { title: "Clean-up drives", desc: "Neighbourhood and pitch-side clean-ups after training and match days." },
  { title: "Tree planting", desc: "Linking every season to greening the spaces where we play and gather." },
  { title: "Education", desc: "Short talks and challenges so players carry climate habits home." },
];

export default function ProgramsClimatePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Climate Action"
        subtitle="Football belongs to the outdoors—we teach young people to protect the fields and streets we share."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="Community and environment"
      />
      <section className="section bg-primary-50">
        <div className="container-custom mx-auto max-w-5xl px-4">
          <ul className="grid gap-6 md:grid-cols-3">
            {actions.map((a) => (
              <li
                key={a.title}
                className="rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-2 text-lg font-bold text-emerald-900">{a.title}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{a.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href="/sustainability" className="btn btn-outline">
              Sustainability overview
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
