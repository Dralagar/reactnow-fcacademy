import SitePageHero from "@/components/SitePageHero";
import { SITE_IMAGES } from "@/lib/site-images";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Terms of Use"
        subtitle="Rules for using this website and participating in React Now FC Academy programmes."
        imageSrc={SITE_IMAGES.coachSession}
        imageAlt="Coaching session with React Now FC Academy"
        minHeightClass="min-h-[34vh] sm:min-h-[38vh]"
      />
      <section className="section bg-surface">
        <div className="container-custom px-4">
          <article className="page-article">
            <p className="text-lg leading-relaxed text-text-secondary">
              <strong className="text-text-primary">Last updated:</strong> April 2026.
              These terms apply to your use of reactnowfc.org and related pages.
              Participation in training or events may also be governed by separate
              registration forms or waivers.
            </p>

            <h2>Acceptance</h2>
            <p>
              By using the site, you agree to these terms. If you do not agree,
              please do not use the site. We may update the terms; continued use
              after changes means you accept the updated version.
            </p>

            <h2>Programme participation</h2>
            <p>
              Football and community activities involve physical risk. Players and
              guardians are responsible for disclosing relevant health information
              and following coach and staff instructions. We may refuse or end
              participation where safety, behaviour, or capacity requires it.
            </p>

            <h2>Code of conduct</h2>
            <ul>
              <li>Respect coaches, volunteers, opponents, officials, and families.</li>
              <li>No harassment, discrimination, or violence.</li>
              <li>No misuse of academy names, logos, or intellectual property.</li>
            </ul>

            <h2>Intellectual property</h2>
            <p>
              Site content (text, graphics, logos, and design) belongs to React Now
              FC Academy or its licensors unless otherwise stated. You may not copy,
              scrape, or redistribute materials for commercial use without written
              permission.
            </p>

            <h2>Third-party links</h2>
            <p>
              The site may link to partners or social platforms. We are not
              responsible for their content or privacy practices; review their terms
              separately.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The site is provided &quot;as is.&quot; We aim for accurate
              information but do not guarantee completeness or uninterrupted access.
              To the extent permitted by law, we are not liable for indirect or
              consequential damages arising from use of the site.
            </p>

            <h2>Indemnity</h2>
            <p>
              You agree to indemnify and hold harmless React Now FC Academy and its
              volunteers from claims arising from your misuse of the site or breach
              of these terms, where permitted by law.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of Kenya, subject to mandatory
              consumer protections where applicable.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:info@reactnowfc.org">info@reactnowfc.org</a>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
