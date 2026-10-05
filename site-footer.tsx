import Link from "next/link";
import { Icon } from "@/components/icons";
import { CLINIC, phoneHref } from "@/lib/clinic";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white/70">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-600/25 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-mint-500/15 blur-[90px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
              <Icon name="tooth" size={22} strokeWidth={1.7} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-extrabold text-white">
                Dr Rohit&rsquo;s
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                Multispeciality Dental Clinic
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
            Comfortable, reliable and comprehensive dental care for you and your
            family &mdash; with multiple types of dental treatment available
            under one roof.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              Book an Appointment
            </Link>
            <a
              href={phoneHref}
              className="flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Icon name="phone" size={15} />
              Call Now
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            {[
              { href: "/#about", label: "About the Clinic" },
              { href: "/#services", label: "Dental Services" },
              { href: "/#why", label: "Why Choose Us" },
              { href: "/#faq", label: "FAQ" },
              { href: "/contact", label: "Contact & Directions" },
              { href: "/book", label: "Book Appointment" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 transition-colors hover:text-brand-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Visit Us
          </h3>
          <ul className="mt-5 space-y-4 text-[15px]">
            <li className="flex gap-3">
              <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-brand-300" />
              <span className="text-white/60">
                {CLINIC.addressLines.join(", ")}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-brand-300" />
              <a href={phoneHref} className="text-white/60 transition-colors hover:text-brand-300">
                {CLINIC.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" size={18} className="mt-0.5 shrink-0 text-brand-300" />
              <div className="space-y-1 text-white/60">
                {CLINIC.hours.map((h) => (
                  <p key={h.day}>
                    <span className="text-white/80">{h.day}:</span> {h.time}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[13px] text-white/45 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </p>
          <p>
            For dental emergencies, please call the clinic directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
