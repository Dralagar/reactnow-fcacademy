import Link from "next/link";
import SitePageHero from "@/components/SitePageHero";

export default function JoinDonatePage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <SitePageHero
        title="Donate"
        subtitle="Every contribution funds pitch time, boots, tutoring, and the quiet costs that keep a free academy honest."
        imageSrc="/images/Hero1.jpeg"
        imageAlt="React Now FC players"
      />
      <section className="section">
        <div className="container-custom mx-auto max-w-2xl px-4 text-center">
          <p className="mb-6 text-lg leading-relaxed text-text-secondary">
            We are setting up structured donation channels. For now, the
            fastest way to support us is to reach out by email—we will share
            official payment details and impact receipts.
          </p>
          <a href="mailto:info@reactnowfc.org" className="btn btn-primary">
            Email info@reactnowfc.org
          </a>
          <p className="mt-8 text-sm text-text-muted">
            Thank you for believing in grassroots football with purpose.
          </p>
          <p className="mt-6">
            <Link href="/impact" className="text-primary underline underline-offset-4 hover:text-primary-700">
              Read about our impact
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
