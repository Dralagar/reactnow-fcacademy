import SitePageHero from "@/components/SitePageHero";
import { SITE_IMAGES } from "@/lib/site-images";

export default function CookiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies on this website."
        imageSrc={SITE_IMAGES.hero}
        imageAlt="React Now FC Academy"
        minHeightClass="min-h-[34vh] sm:min-h-[38vh]"
      />
      <section className="section page-band">
        <div className="container-custom px-4">
          <article className="page-article">
            <p className="text-lg leading-relaxed text-text-secondary">
              <strong className="text-text-primary">Last updated:</strong> April 2026.
              We keep cookie use minimal. This page explains what cookies are, how
              we may use them, and how you can control them.
            </p>

            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a
              site. They can remember preferences, keep you signed in, or help us
              understand how the site is used.
            </p>

            <h2>How we use cookies</h2>
            <ul>
              <li>
                <strong>Essential:</strong> required for basic site function (e.g.
                security, load balancing, cookie consent choice).
              </li>
              <li>
                <strong>Functional:</strong> remember choices such as language or
                accessibility settings, if we add those features.
              </li>
              <li>
                <strong>Analytics (optional):</strong> if enabled, help us see which
                pages are visited so we can improve content. We would only turn this
                on with appropriate notice and, where required, consent.
              </li>
            </ul>

            <h2>Third parties</h2>
            <p>
              Embedded videos, maps, or social feeds may set their own cookies. We
              do not control those; please read the respective providers&apos;
              policies.
            </p>

            <h2>Managing cookies</h2>
            <p>
              You can block or delete cookies through your browser settings. Blocking
              essential cookies may affect how the site works. Our cookie banner (if
              shown) lets you accept or reject non-essential categories where
              applicable.
            </p>

            <h2>Updates</h2>
            <p>
              We will revise this policy if our use of cookies changes. Check the
              date at the top when you visit.
            </p>

            <h2>Contact</h2>
            <p>
              <a href="mailto:info@reactnowfc.org">info@reactnowfc.org</a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
