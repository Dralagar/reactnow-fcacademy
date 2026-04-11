import SitePageHero from "@/components/SitePageHero";
import { SITE_IMAGES } from "@/lib/site-images";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Privacy Policy"
        subtitle="How React Now FC Academy handles information for players, families, volunteers, partners, and visitors."
        imageSrc={SITE_IMAGES.hero}
        imageAlt="React Now FC Academy on the pitch"
        minHeightClass="min-h-[34vh] sm:min-h-[38vh]"
      />
      <section className="section page-band">
        <div className="container-custom px-4">
          <article className="page-article">
            <p className="text-lg leading-relaxed text-text-secondary">
              <strong className="text-text-primary">Last updated:</strong> April 2026.
              This policy describes our current practices while we finalise full
              legal review. If anything here conflicts with a signed registration
              or partnership agreement, the agreement takes precedence.
            </p>

            <h2>Who we are</h2>
            <p>
              React Now FC Academy is a grassroots football and youth-development
              initiative based in Nairobi, Kenya. For privacy questions, contact{" "}
              <a href="mailto:info@reactnowfc.org">info@reactnowfc.org</a>.
            </p>

            <h2>Information we may collect</h2>
            <ul>
              <li>
                <strong>Participant &amp; family data:</strong> names, ages or date of
                birth, school level, emergency contacts, medical notes you choose to
                share, and attendance records.
              </li>
              <li>
                <strong>Programme data:</strong> training participation, mentorship
                notes, and safeguarding-related reports where required.
              </li>
              <li>
                <strong>Website &amp; communications:</strong> email address, message
                content, and basic technical data (e.g. browser type) if you contact
                us or subscribe to updates.
              </li>
              <li>
                <strong>Media:</strong> photos or video from matches and events,
                only where we have appropriate consent or a legitimate programme
                interest.
              </li>
            </ul>

            <h2>How we use information</h2>
            <p>
              We use data to run safe sessions, coordinate volunteers, communicate
              with families, measure impact, comply with law, and improve our
              programmes. We do not sell personal data.
            </p>

            <h2>Legal bases (summary)</h2>
            <p>
              Depending on the situation, we rely on consent, contractual necessity,
              legitimate interests (e.g. safeguarding and programme operations),
              or legal obligation. We minimise data and keep it only as long as
              needed for those purposes.
            </p>

            <h2>Sharing</h2>
            <p>
              We may share limited information with coaches, mentors, and
              authorised volunteers; professional advisers; or authorities when
              required for safety or law. Any service providers we use must protect
              data appropriately.
            </p>

            <h2>Security &amp; retention</h2>
            <p>
              We apply reasonable organisational and technical measures to protect
              information. Retention periods depend on the type of data and legal
              requirements; we delete or anonymise data when it is no longer
              needed.
            </p>

            <h2>Your rights</h2>
            <p>
              Subject to applicable law, you may request access, correction,
              deletion, restriction, or portability of your personal data, or object
              to certain processing. Contact us at the email above; we will respond
              within a reasonable time.
            </p>

            <h2>Children</h2>
            <p>
              Our programmes serve young people. Where consent is required, we seek
              it from parents or guardians. We design our communications and data
              practices to protect minors.
            </p>

            <h2>International transfers</h2>
            <p>
              If data is processed outside Kenya, we will ensure appropriate
              safeguards where required by law.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this policy as our programmes or the law evolve. The
              &quot;Last updated&quot; date will change when we publish a new
              version.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
