import SitePageHero from "@/components/SitePageHero";

const pillars = [
  { emoji: "⚽", title: "Football excellence", desc: "Tactics, fitness, and love for the game—trained with patience and standards." },
  { emoji: "🧠", title: "Character & discipline", desc: "Showing up on time, speaking with respect, leading when no one is watching." },
  { emoji: "📚", title: "Education & digital skills", desc: "Homework support, literacy, and opening doors to tech and careers." },
  { emoji: "🤝", title: "Community & care", desc: "Parents, neighbours, and partners woven into how we protect and uplift kids." },
  { emoji: "🌍", title: "Climate & service", desc: "Clean-ups, trees, and responsibility for the places we train and call home." },
];

export default function AboutPillarsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Core Pillars"
        subtitle="These are the values that shape every drill, decision, and conversation at React Now FC Academy."
        imageSrc="/images/React7.jpeg"
        imageAlt="Coach mentoring young players"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-5xl px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-3 text-3xl transition-transform group-hover:scale-110">
                  {p.emoji}
                </div>
                <h2 className="mb-2 text-lg font-bold text-text-primary">{p.title}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
