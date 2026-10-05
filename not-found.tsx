import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-brand-200/50"
      />
      <div className="relative mx-auto flex min-h-[72vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-brand-500 shadow-[0_20px_44px_-22px_rgba(13,61,112,0.5)] ring-1 ring-brand-100">
          <Icon name="tooth" size={38} strokeWidth={1.4} />
        </span>
        <p className="mt-8 font-display text-6xl font-extrabold tracking-tight text-brand-600">
          404
        </p>
        <h1 className="mt-3 font-display text-[26px] font-extrabold tracking-tight text-ink-900">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-600">
          The page you were looking for may have moved. Let&rsquo;s get you back
          to the clinic.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(36,128,228,1)] transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <Link
            href="/book"
            className="rounded-full border-2 border-brand-200 bg-white px-7 py-[12px] text-[15px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
