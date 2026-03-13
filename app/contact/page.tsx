export default function ContactPage() {
  return (
    <main className="section bg-white">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Us
          </h1>
          <p className="mb-6 text-lg leading-8 text-slate-600">
            Have a question, partnership idea, or want to support the academy?
            Reach out and we&apos;ll respond as soon as we can.
          </p>
          <div className="space-y-3 text-slate-600">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              info@reactnowfc.org
            </p>
            <p>
              <span className="font-semibold">Location:</span> Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

