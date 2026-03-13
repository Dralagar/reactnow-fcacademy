import Link from "next/link";

export default function JoinPage() {
  return (
    <main className="section bg-white">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Get Involved
          </h1>
          <p className="mb-6 text-lg leading-8 text-slate-600">
            There are many ways to plug into React Now FC Academy — as a
            player, volunteer, partner, or supporter.
          </p>
          <p className="mb-8 text-base leading-7 text-slate-600">
            Choose the path that best matches your interest today. These pages
            will grow with more detailed information and forms over time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/join/player" className="btn btn-primary">
              Join as Player
            </Link>
            <Link href="/join/volunteer" className="btn btn-outline">
              Volunteer
            </Link>
            <Link href="/join/partner" className="btn btn-outline">
              Partner With Us
            </Link>
            <Link href="/join/donate" className="btn btn-outline">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

