import SitePageHero from "@/components/SitePageHero";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Contact Us"
        subtitle="Partnerships, media, parent questions, or a simple hello—we read every message."
        imageSrc="/images/Geo.JPG"
        imageAlt="React Now FC community"
      />
      <section className="section bg-surface">
        <div className="container-custom mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm md:p-10">
            <p className="mb-6 text-lg leading-relaxed text-text-secondary">
              Have a question, a partnership idea, or want to support the
              academy? Reach out and we&apos;ll respond as soon as we can.
            </p>
            <dl className="space-y-6">
              <div className="flex flex-col gap-1 border-b border-border pb-6 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Email
                </dt>
                <dd>
                  <a
                    href="mailto:info@reactnowfc.org"
                    className="text-lg font-medium text-text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                  >
                    info@reactnowfc.org
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Location
                </dt>
                <dd className="text-lg text-text-primary">Nairobi, Kenya</dd>
              </div>
            </dl>
            <p className="mt-8 text-sm text-text-muted">
              Prefer a form? We&apos;ll wire a secure contact form here soon—for
              now, email is the fastest way to reach our team.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
