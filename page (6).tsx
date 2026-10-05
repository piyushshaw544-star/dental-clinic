import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { CLINIC, phoneHref } from "@/lib/clinic";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";

const WHY = [
  {
    icon: "heart",
    title: "Gentle, patient-focused care",
    body: "Every step is explained before we begin, so you always know what to expect during your visit.",
  },
  {
    icon: "tooth",
    title: "Multispeciality under one roof",
    body: "Routine, restorative, orthodontic and cosmetic treatments are all handled at the same clinic.",
  },
  {
    icon: "shield",
    title: "Comfort-first environment",
    body: "Our goal is to make every patient's dental visit safe, comfortable and stress-free.",
  },
  {
    icon: "users",
    title: "Care for the whole family",
    body: "From children to older adults, we welcome patients of every age at the clinic.",
  },
  {
    icon: "chat",
    title: "Clear, simple communication",
    body: "Your questions are answered in plain language, with time to think before you decide.",
  },
  {
    icon: "calendar",
    title: "Organised appointments",
    body: "Reserve a slot online or by phone so your visit fits neatly into your day.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Book your slot",
    body: "Request an appointment online or call the clinic and pick a time that suits you.",
  },
  {
    step: "02",
    title: "Consultation & examination",
    body: "We examine your teeth and gums and listen carefully to the concern that brought you in.",
  },
  {
    step: "03",
    title: "Options explained",
    body: "The available treatment options are explained clearly so you can decide what you prefer.",
  },
  {
    step: "04",
    title: "Treatment & follow-up",
    body: "Treatment is carried out at your pace, followed by guidance for care at home.",
  },
];

const FAQS = [
  {
    q: "Do I need an appointment before visiting?",
    a: "An appointment helps us keep time aside for you and reduces waiting at the clinic. You can request a slot through the booking form on this website or call the clinic directly.",
  },
  {
    q: "What happens during a first visit?",
    a: "We begin with an examination of your teeth and gums and a conversation about the concern that brought you in. The findings and the available options are then explained to you before anything is planned.",
  },
  {
    q: "Which treatments are available at the clinic?",
    a: "The clinic offers check-ups, teeth cleaning, fillings, extractions, crowns, orthodontic treatment with braces, root canal treatment, cosmetic dentistry, gum care and general dental treatment — all under one roof.",
  },
  {
    q: "Do you see children and older family members?",
    a: "Yes. Patients of all ages are welcome, and appointments can be arranged for more than one family member where slots allow.",
  },
  {
    q: "What should I bring with me?",
    a: "If you have them, please carry any previous dental reports or X-rays, a list of medicines you currently take, and details of any medical condition your dentist should know about.",
  },
  {
    q: "How do I reschedule or cancel an appointment?",
    a: "Please call the clinic as early as you can so the slot can be offered to another patient and a more convenient time can be arranged for you.",
  },
];

export default async function HomePage() {
  const services = await getServices();

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div
          aria-hidden
          className="blob pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-200/55"
        />
        <div
          aria-hidden
          className="blob pointer-events-none absolute -right-32 top-20 h-[26rem] w-[26rem] rounded-full bg-mint-400/25"
          style={{ animationDelay: "3s" }}
        />
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-full opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-16 pt-12 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-16">
          {/* ── copy ── */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/90 py-2 pl-2.5 pr-4 text-[12.5px] font-semibold text-brand-800 shadow-[0_6px_20px_-10px_rgba(36,128,228,0.6)] backdrop-blur">
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white">
                  <span className="pulse-ring absolute inset-0 text-brand-400/70" />
                  <Icon name="check" size={13} strokeWidth={2.6} />
                </span>
                Trusted Dental Care in {CLINIC.area}
              </span>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-7 font-display text-[15px] font-bold uppercase tracking-[0.14em] text-brand-600">
                {CLINIC.name}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="mt-3 font-display text-[clamp(2.1rem,5.4vw,3.6rem)] font-extrabold leading-[1.08] tracking-tight text-ink-900">
                Complete Dental Care for a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-brand-600 to-mint-500 bg-clip-text text-transparent">
                    Healthy, Confident
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 300 14"
                    className="absolute -bottom-1 left-0 z-0 h-3 w-full text-brand-200"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9c60-7 140-9 296-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Smile
              </h1>
            </Reveal>

            <Reveal delay={210}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-600">
                Professional, gentle and patient-focused dental care for you and
                your family.
              </p>
            </Reveal>

            <Reveal delay={270}>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href="/book"
                  className="sheen group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_32px_-12px_rgba(36,128,228,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(36,128,228,1)]"
                >
                  <Icon name="calendar" size={18} />
                  Book an Appointment
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-brand-200 bg-white px-7 py-[14px] text-[15px] font-semibold text-brand-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50"
                >
                  <Icon name="phone" size={18} />
                  Call Now
                </a>
              </div>
            </Reveal>

            <Reveal delay={330}>
              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-brand-100 pt-7">
                {[
                  "All treatments under one roof",
                  "Appointment-based visits",
                  "Patients of every age",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[14px] font-medium text-ink-700"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-mint-500/15 text-mint-600">
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── visual ── */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-xl">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2.75rem] bg-gradient-to-tr from-brand-100 via-white to-mint-400/20"
              />
              <div className="relative overflow-hidden rounded-[2.25rem] ring-1 ring-brand-100 shadow-[0_40px_80px_-30px_rgba(13,61,112,0.45)]">
                <Image
                  src="/images/hero-clinic.jpg"
                  alt="Modern dental treatment room at Dr Rohit's Multispeciality Dental Clinic"
                  width={1536}
                  height={1024}
                  priority
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/25 via-transparent to-transparent"
                />
              </div>

              {/* floating card — top left */}
              <div className="float-slow absolute -left-3 top-8 hidden rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-[0_18px_40px_-18px_rgba(13,61,112,0.5)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name="shield" size={20} />
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-bold text-ink-900">
                      Multispeciality Care
                    </p>
                    <p className="text-[11.5px] text-ink-500">
                      Treatments under one roof
                    </p>
                  </div>
                </div>
              </div>

              {/* floating card — bottom right */}
              <div className="float-slower absolute -right-3 bottom-8 hidden rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-[0_18px_40px_-18px_rgba(13,61,112,0.5)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-500/12 text-mint-600">
                    <Icon name="clock" size={20} />
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-bold text-ink-900">
                      Mon &ndash; Sat
                    </p>
                    <p className="text-[11.5px] text-ink-500">
                      Morning &amp; evening hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ TRUST STRIP ═══════════════ */}
      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-brand-100 px-0 lg:grid-cols-4">
          {[
            { icon: "pin", t: CLINIC.area, s: "West Bengal, India" },
            { icon: "tooth", t: "10 Services", s: "Available at the clinic" },
            { icon: "users", t: "All Ages", s: "Family dental care" },
            { icon: "calendar", t: "Easy Booking", s: "Online or by phone" },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 70}>
              <div className="flex h-full items-center gap-4 bg-white px-6 py-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={item.icon} size={22} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-bold text-ink-900">
                    {item.t}
                  </p>
                  <p className="truncate text-[13px] text-ink-500">{item.s}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
          {/* images */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] ring-1 ring-brand-100 shadow-[0_30px_70px_-34px_rgba(13,61,112,0.5)]">
                <Image
                  src="/images/clinic-reception.jpg"
                  alt="Reception and waiting area of the dental clinic"
                  width={1536}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="float-slow absolute -bottom-10 -right-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-[0_24px_50px_-20px_rgba(13,61,112,0.55)] sm:block">
                <Image
                  src="/images/sterile-tools.jpg"
                  alt="Sterilised dental instruments arranged on a tray"
                  width={768}
                  height={512}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute -left-6 -top-6 -z-10 h-32 w-32 rounded-3xl bg-brand-100"
              />
            </div>
          </Reveal>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="About the Clinic"
              title={
                <>
                  Comfortable, reliable and{" "}
                  <span className="text-brand-600">comprehensive</span> dental
                  care
                </>
              }
            />
            <Reveal delay={200}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-600">
                {CLINIC.name} is dedicated to providing comfortable, reliable
                and comprehensive dental care. Our goal is to make every
                patient&rsquo;s dental visit safe, comfortable and stress-free.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                The clinic provides multiple types of dental treatment under one
                roof &mdash; from routine check-ups and cleaning to fillings,
                crowns, braces, root canal treatment and gum care &mdash; so
                your family can be looked after in a single, familiar place in{" "}
                {CLINIC.area}.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "tooth",
                  t: "One roof, many treatments",
                  s: "General, restorative, orthodontic and cosmetic dentistry.",
                },
                {
                  icon: "heart",
                  t: "A calm, unhurried visit",
                  s: "Time to ask questions and understand your options.",
                },
              ].map((b, i) => (
                <Reveal key={b.t} delay={320 + i * 80}>
                  <div className="h-full rounded-2xl border border-brand-100 bg-brand-50/50 p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
                      <Icon name={b.icon} size={20} />
                    </span>
                    <p className="mt-3.5 font-display text-[15px] font-bold text-ink-900">
                      {b.t}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">
                      {b.s}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section
        id="services"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-brand-50/60 to-white py-20 sm:py-28"
      >
        <div
          aria-hidden
          className="blob pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-brand-200/40"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Our Dental Services"
            title={
              <>
                Dental treatments available{" "}
                <span className="text-brand-600">under one roof</span>
              </>
            }
            description="From routine care to specialised treatment, here is what we offer at the clinic. Tell us your concern and we will guide you to the right option."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 5) * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-12 text-center text-[14px] text-ink-500">
              Not sure which treatment you need?{" "}
              <Link
                href="/book"
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                Book a dental check-up
              </Link>{" "}
              and we will examine and advise you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section id="why" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={
              <>
                Dental care built around{" "}
                <span className="text-brand-600">your comfort</span>
              </>
            }
            description="We keep the experience simple, clear and unhurried — from the moment you book to the guidance you take home."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 90}>
                <div className="group h-full rounded-3xl border border-brand-100 bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:bg-brand-50/40 hover:shadow-[0_24px_48px_-26px_rgba(13,61,112,0.4)]">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-3.5 text-white shadow-[0_10px_22px_-10px_rgba(36,128,228,0.9)] transition-transform duration-400 group-hover:scale-105">
                    <Icon name={item.icon} size={24} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-[17px] font-bold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white sm:py-28">
        <div
          aria-hidden
          className="blob pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-brand-600/35"
        />
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
                How a Visit Works
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,4vw,2.65rem)] font-extrabold leading-[1.15] tracking-tight text-white">
                Four simple steps, start to finish
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="relative h-full rounded-3xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-brand-400/50 hover:bg-white/[0.1]">
                  <span className="font-display text-4xl font-extrabold text-brand-400/40">
                    {p.step}
                  </span>
                  <h3 className="mt-3 font-display text-[17px] font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">
                    {p.body}
                  </p>
                  {i < PROCESS.length - 1 ? (
                    <span className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500 text-white lg:flex">
                      <Icon name="arrow" size={13} strokeWidth={2.4} />
                    </span>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow="Questions"
                title={
                  <>
                    Frequently asked{" "}
                    <span className="text-brand-600">questions</span>
                  </>
                }
                description="A few things patients often ask before their first visit to the clinic."
              />
              <Reveal delay={220}>
                <div className="mt-8 rounded-3xl border border-brand-100 bg-brand-50/60 p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-600 ring-1 ring-brand-100">
                    <Icon name="chat" size={21} />
                  </span>
                  <p className="mt-4 font-display text-[16px] font-bold text-ink-900">
                    Still have a question?
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
                    Call the clinic and our team will be glad to help you decide
                    the next step.
                  </p>
                  <a
                    href={phoneHref}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    <Icon name="phone" size={16} />
                    {CLINIC.phoneDisplay}
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="space-y-3.5 lg:col-span-7">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group rounded-2xl border border-brand-100 bg-white px-6 py-5 transition-all duration-300 open:border-brand-200 open:bg-brand-50/50 open:shadow-[0_16px_36px_-24px_rgba(13,61,112,0.4)] hover:border-brand-200">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[16px] font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          aria-hidden
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink-600">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800 px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="blob pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20"
              />
              <div
                aria-hidden
                className="blob pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-mint-400/25"
                style={{ animationDelay: "4s" }}
              />
              <div
                aria-hidden
                className="dot-grid pointer-events-none absolute inset-0 opacity-20"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                  <Icon name="tooth" size={13} />
                  Trusted Dental Care in {CLINIC.area}
                </span>
                <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-white">
                  Ready to take care of your smile?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/80">
                  Book an appointment at a time that suits you, or call the
                  clinic and we will help you find a slot.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-bold text-brand-700 shadow-[0_16px_34px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Icon name="calendar" size={18} />
                    Book an Appointment
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-7 py-[14px] text-[15px] font-bold text-white transition-colors duration-300 hover:bg-white/15"
                  >
                    <Icon name="phone" size={18} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
