import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CLINIC, phoneHref } from "@/lib/clinic";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request a dental appointment at Dr Rohit's Multispeciality Dental Clinic, J.K. Nagar, West Bengal. Choose your treatment, date and preferred time slot.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [{ service }, services] = await Promise.all([
    searchParams,
    getServices(),
  ]);

  const valid = services.some((s) => s.slug === service) ? service : undefined;

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white pb-24">
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand-200/50"
      />
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-96 opacity-40 [mask-image:linear-gradient(black,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
              <Icon name="calendar" size={13} />
              Appointments
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900">
              Book an Appointment
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
              Pick a treatment, choose a date and select a time that works for
              you. We will call to confirm your slot.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 xl:col-span-8">
            <BookingForm services={services} defaultService={valid} />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 xl:col-span-4">
            <div className="space-y-5">
              {/* call card */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-7 text-white">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Icon name="phone" size={22} />
                </span>
                <p className="mt-4 font-display text-[18px] font-bold">
                  Prefer to speak to us?
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                  Call the clinic directly and we will find a slot for you over
                  the phone.
                </p>
                <a
                  href={phoneHref}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-bold text-brand-700 transition-transform hover:-translate-y-0.5"
                >
                  <Icon name="phone" size={16} />
                  {CLINIC.phoneDisplay}
                </a>
              </div>

              {/* hours */}
              <div className="rounded-3xl border border-brand-100 bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name="clock" size={20} />
                  </span>
                  <p className="font-display text-[16px] font-bold text-ink-900">
                    Clinic Hours
                  </p>
                </div>
                <ul className="mt-4 space-y-3 text-[14px]">
                  {CLINIC.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex flex-col gap-0.5 border-b border-brand-50 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-semibold text-ink-900">{h.day}</span>
                      <span className="text-ink-600">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* what to bring */}
              <div className="rounded-3xl border border-brand-100 bg-brand-50/50 p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
                    <Icon name="shield" size={20} />
                  </span>
                  <p className="font-display text-[16px] font-bold text-ink-900">
                    What to bring
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5 text-[14px] text-ink-600">
                  {[
                    "Previous dental reports or X-rays, if any",
                    "A list of medicines you currently take",
                    "Details of any medical condition we should know",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Icon
                        name="check"
                        size={16}
                        strokeWidth={2.4}
                        className="mt-0.5 shrink-0 text-mint-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
