import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="section bg-white">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            About React Now FC Academy
          </h1>
          <p className="mb-6 text-lg leading-8 text-slate-600">
            React Now FC Academy is a grassroots football initiative using sport,
            structure, and mentorship to empower vulnerable youth in Kenya.
          </p>
          <p className="mb-8 text-base leading-7 text-slate-600">
            This page will grow into a full storytelling hub for our history,
            values, and long-term vision. For now, it gives you a clear starting
            point while we build out the rest of the content.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about/story" className="btn btn-primary">
              Our Story
            </Link>
            <Link href="/impact" className="btn btn-outline">
              View Our Impact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

