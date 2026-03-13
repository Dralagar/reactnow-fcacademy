import Link from "next/link";

export default function TeamPage() {
  return (
    <main className="section bg-white">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Meet the Team
          </h1>
          <p className="mb-6 text-lg leading-8 text-slate-600">
            Behind React Now FC Academy is a dedicated group of coaches,
            mentors, and community leaders committed to long-term youth
            development.
          </p>
          <p className="mb-8 text-base leading-7 text-slate-600">
            This page will soon showcase detailed profiles and stories of our
            staff, volunteers, and role models who keep the academy moving.
          </p>
          <Link href="/team/highlights" className="btn btn-primary">
            View Player Highlights
          </Link>
        </div>
      </div>
    </main>
  );
}

