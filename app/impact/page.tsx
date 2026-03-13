import Link from "next/link";

export default function ImpactPage() {
  return (
    <main className="section bg-[#F8FAFC]">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Our Impact
          </h1>
          <p className="mb-6 text-lg leading-8 text-slate-600">
            Impact at React Now FC Academy is measured in discipline, school
            attendance, leadership, and opportunities created for youth on and
            off the pitch.
          </p>
          <p className="mb-8 text-base leading-7 text-slate-600">
            This space will later hold detailed stats, stories, and annual
            reports. For now, it anchors all links that refer to our impact
            journey.
          </p>
          <Link href="/join" className="btn btn-primary">
            Join the Movement
          </Link>
        </div>
      </div>
    </main>
  );
}

