import SitePageHero from "@/components/SitePageHero";

const faqs: { q: string; a: string }[] = [
  {
    q: "Is the academy free to join?",
    a: "We aim to keep core participation free or heavily subsidised so cost is never the reason a child stays home. Donations and partners help cover kits, transport, and learning materials.",
  },
  {
    q: "What ages do you train?",
    a: "Age groups depend on each season’s registration. Email us with your child’s age and area—we’ll share the right cohort and schedule.",
  },
  {
    q: "Do players need prior football experience?",
    a: "No. We assess attitude and coachability first. Technical skills grow with consistent attendance and listening.",
  },
  {
    q: "How do parents stay informed?",
    a: "We use clear channels for schedules, expectations, and concerns. Ask at registration how your cohort communicates best.",
  },
  {
    q: "Can organisations sponsor or volunteer?",
    a: "Yes. See Join → Partner or Volunteer, or email info@reactnowfc.org with your idea—we’ll respond with next steps.",
  },
];

export default function FaqPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Frequently Asked Questions"
        subtitle="Straight answers for families, players, and supporters—tap a question to read more."
        imageSrc="/images/Geo.JPG"
        imageAlt="React Now FC FAQ"
        minHeightClass="min-h-[36vh]"
      />
      <section className="section bg-surface">
        <div className="container-custom mx-auto max-w-3xl px-4">
          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-white px-5 py-1 shadow-sm open:shadow-md open:ring-1 open:ring-primary/15"
              >
                <summary className="cursor-pointer list-none py-4 font-semibold text-text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.q}
                    <span className="text-primary transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="border-t border-border pb-4 pt-3 text-sm leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
