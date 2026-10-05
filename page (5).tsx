import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CLINIC, phoneHref } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Contact Dr Rohit's Multispeciality Dental Clinic in J.K. Nagar, West Bengal — phone number, clinic hours and directions.",
};

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "J.K. Nagar, West Bengal, India",
)}&output=embed`;

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white pb-24">
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand-200/50"
      />
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-96 opacity-40 [mask-image:linear-gradient(black,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
              <Icon name="pin" size={13} />
              Contact
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900">
              Visit {CLINIC.shortName}
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
              We are located in {CLINIC.area}, {CLINIC.state}. Call us, send a
              message, or book your appointment online.
            </p>
          </div>
        </Reveal>

        {/* info cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: "pin",
              title: "Clinic Address",
              lines: CLINIC.addressLines,
            },
            {
              icon: "phone",
              title: "Phone",
              lines: [CLINIC.phoneDisplay, "Call during clinic hours"],
              href: phoneHref,
            },
            {
              icon: "clock",
              title: "Clinic Hours",
              lines: CLINIC.hours.map((h) => `${h.day}`),
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-brand-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(13,61,112,0.45)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Icon name={card.icon} size={22} />
                </span>
                <p className="mt-4 font-display text-[16px] font-bold text-ink-900">
                  {card.title}
                </p>
                <div className="mt-2 space-y-1 text-[14.5px] leading-relaxed text-ink-600">
                  {card.lines.map((line) => (
                    <p key={line}>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="font-semibold text-brand-600 hover:underline"
                        >
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* map + form */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full overflow-hidden rounded-3xl border border-brand-100 bg-white">
              <iframe
                title={`Map showing ${CLINIC.area}, ${CLINIC.state}`}
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 lg:h-[460px]"
              />
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-100 p-6">
                <div>
                  <p className="font-display text-[15px] font-bold text-ink-900">
                    Finding the clinic
                  </p>
                  <p className="mt-1 text-[14px] text-ink-600">
                    Call us if you need directions — we will guide you to the
                    entrance.
                  </p>
                </div>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 px-5 py-2.5 text-[14px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                >
                  <Icon name="phone" size={16} />
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <EnquiryForm />
          </Reveal>
        </div>

        {/* hours detail + CTA */}
        <Reveal delay={100}>
          <div className="mt-8 grid gap-6 rounded-3xl border border-brand-100 bg-white p-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-display text-[19px] font-bold text-ink-900">
                Clinic timings
              </p>
              <ul className="mt-4 space-y-3 text-[14.5px]">
                {CLINIC.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex flex-wrap justify-between gap-2 border-b border-brand-50 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold text-ink-900">{h.day}</span>
                    <span className="text-ink-600">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-7 text-white">
              <p className="font-display text-[18px] font-bold">
                Book online in under a minute
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                Choose your treatment, date and time slot — we will confirm by
                phone.
              </p>
              <Link
                href="/book"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-brand-700 transition-transform hover:-translate-y-0.5"
              >
                <Icon name="calendar" size={16} />
                Book an Appointment
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
