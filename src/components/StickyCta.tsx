import Link from "next/link";

export function StickyCta() {
  return (
    <div className="sticky-cta md:hidden">
      <Link href="/start" className="btn btn-primary shadow-2xl">
        Schedule
      </Link>
    </div>
  );
}
