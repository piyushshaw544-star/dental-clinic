"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { CLINIC, phoneHref } from "@/lib/clinic";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#why", label: "Why Us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* utility strip */}
      <div className="hidden bg-ink-900 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[12px]">
          <p className="flex items-center gap-2 text-white/80">
            <Icon name="pin" size={14} className="text-brand-300" />
            {CLINIC.area}, {CLINIC.state}, {CLINIC.country}
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2 text-white/80">
              <Icon name="clock" size={14} className="text-brand-300" />
              Mon&ndash;Sat · Morning &amp; Evening hours
            </p>
            <a
              href={phoneHref}
              className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-300"
            >
              <Icon name="phone" size={14} className="text-brand-300" />
              {CLINIC.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-brand-100 bg-white/90 shadow-[0_6px_28px_-18px_rgba(13,61,112,0.45)] backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[14px] font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-brand-700 transition-all hover:border-brand-400 hover:bg-brand-50 sm:inline-flex"
            >
              <Icon name="phone" size={15} />
              Call Now
            </a>
            <Link
              href="/book"
              className="hidden rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(36,128,228,0.95)] transition-all hover:shadow-[0_14px_30px_-10px_rgba(36,128,228,1)] hover:brightness-105 sm:inline-block"
            >
              Book Appointment
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-xl border border-brand-100 bg-white text-ink-800 transition-colors hover:bg-brand-50 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          className={`absolute inset-x-3 top-[118px] rounded-3xl border border-brand-100 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(13,61,112,0.4)] transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
              <Icon name="arrow" size={16} className="text-brand-400" />
            </Link>
          ))}
          <div className="mt-3 grid gap-2.5 border-t border-brand-100 pt-4">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3.5 text-center text-sm font-semibold text-white"
            >
              Book an Appointment
            </Link>
            <a
              href={phoneHref}
              className="flex items-center justify-center gap-2 rounded-2xl border border-brand-200 px-5 py-3.5 text-sm font-semibold text-brand-700"
            >
              <Icon name="phone" size={16} />
              {CLINIC.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
