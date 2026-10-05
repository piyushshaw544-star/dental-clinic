"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { createAppointment, type BookingState } from "@/app/book/actions";
import { Icon } from "@/components/icons";
import type { Service } from "@/db/schema";
import {
  CLINIC,
  formatDateLong,
  formatSlot,
  phoneHref,
  TIME_SLOTS,
  todayISO,
} from "@/lib/clinic";

const labelCls =
  "mb-1.5 block text-[13px] font-semibold text-ink-800";
const inputCls =
  "w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-[15px] text-ink-900 outline-none transition-all placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100";

export function BookingForm({
  services,
  defaultService,
}: {
  services: Service[];
  defaultService?: string;
}) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(
    createAppointment,
    null,
  );

  const today = todayISO();
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [taken, setTaken] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    let cancelled = false;
    setLoadingSlots(true);
    fetch(`/api/availability?date=${date}`)
      .then((r) => (r.ok ? r.json() : { taken: [] }))
      .then((data: { taken?: string[] }) => {
        if (!cancelled) setTaken(data.taken ?? []);
      })
      .catch(() => {
        if (!cancelled) setTaken([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date, state?.ok]);

  useEffect(() => {
    if (time && taken.includes(time)) setTime("");
  }, [taken, time]);

  /* ── success ── */
  if (state?.ok && state.summary) {
    return (
      <div className="rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-[0_30px_70px_-40px_rgba(13,61,112,0.5)] sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint-500/12 text-mint-600">
          <Icon name="check" size={30} strokeWidth={2.4} />
        </span>
        <h2 className="mt-6 font-display text-[26px] font-extrabold tracking-tight text-ink-900">
          Appointment requested
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
          Thank you, {state.summary.name}. We have received your request and the
          clinic will contact you on your mobile number to confirm the slot.
        </p>

        <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
            Reference
          </p>
          <p className="mt-1 font-display text-xl font-extrabold text-ink-900">
            {state.ref}
          </p>
          <dl className="mt-4 space-y-2.5 border-t border-brand-100 pt-4 text-[14px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Service</dt>
              <dd className="text-right font-medium text-ink-900">
                {state.summary.service}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Date</dt>
              <dd className="text-right font-medium text-ink-900">
                {formatDateLong(state.summary.date)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Time</dt>
              <dd className="text-right font-medium text-ink-900">
                {formatSlot(state.summary.time)}
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 text-[13px] text-ink-500">
          Need to change something? Call us at{" "}
          <a href={phoneHref} className="font-semibold text-brand-600 hover:underline">
            {CLINIC.phoneDisplay}
          </a>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <Link
            href="/book"
            className="rounded-full border-2 border-brand-200 px-6 py-[10px] text-[14px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Book another visit
          </Link>
        </div>
      </div>
    );
  }

  /* ── form ── */
  const err = (field: string) =>
    state && !state.ok && state.field === field ? state.error : null;

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-brand-100 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(13,61,112,0.5)] sm:p-9"
    >
      <input type="hidden" name="preferredTime" value={time} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className={labelCls}>
            Full name <span className="text-brand-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            placeholder="Your full name"
            className={inputCls}
            aria-invalid={Boolean(err("fullName"))}
          />
          {err("fullName") ? <FieldError>{err("fullName")}</FieldError> : null}
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            Mobile number <span className="text-brand-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            placeholder="10-digit mobile number"
            className={inputCls}
            aria-invalid={Boolean(err("phone"))}
          />
          {err("phone") ? <FieldError>{err("phone")}</FieldError> : null}
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputCls}
            aria-invalid={Boolean(err("email"))}
          />
          {err("email") ? <FieldError>{err("email")}</FieldError> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="serviceSlug" className={labelCls}>
            Service required <span className="text-brand-500">*</span>
          </label>
          <select
            id="serviceSlug"
            name="serviceSlug"
            required
            defaultValue={defaultService ?? ""}
            className={inputCls}
          >
            <option value="" disabled>
              Choose a treatment…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
          {err("serviceSlug") ? <FieldError>{err("serviceSlug")}</FieldError> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="preferredDate" className={labelCls}>
            Preferred date <span className="text-brand-500">*</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls}
          />
          {err("preferredDate") ? <FieldError>{err("preferredDate")}</FieldError> : null}
        </div>
      </div>

      {/* time slots */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className={labelCls}>
            Preferred time <span className="text-brand-500">*</span>
          </span>
          {loadingSlots ? (
            <span className="text-[12px] text-ink-400">Checking availability…</span>
          ) : (
            <span className="text-[12px] text-ink-400">
              {TIME_SLOTS.length - taken.length} of {TIME_SLOTS.length} slots open
            </span>
          )}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {TIME_SLOTS.map((slot) => {
            const isTaken = taken.includes(slot);
            const active = time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={isTaken}
                onClick={() => setTime(slot)}
                className={`rounded-xl border px-2 py-2.5 text-[13px] font-semibold transition-all ${
                  isTaken
                    ? "cursor-not-allowed border-brand-50 bg-brand-50/50 text-ink-400 line-through"
                    : active
                      ? "border-brand-600 bg-brand-600 text-white shadow-[0_10px_22px_-12px_rgba(36,128,228,1)]"
                      : "border-brand-100 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {formatSlot(slot)}
              </button>
            );
          })}
        </div>
        {err("preferredTime") ? <FieldError>{err("preferredTime")}</FieldError> : null}
      </div>

      <div className="mt-6">
        <label htmlFor="notes" className={labelCls}>
          Anything you would like us to know{" "}
          <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Briefly describe your concern, or mention a preferred dentist or language."
          className={`${inputCls} resize-none`}
        />
      </div>

      {state && !state.ok && !state.field ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || !time}
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-4 text-[15px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(36,128,228,1)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
      >
        {pending ? (
          "Sending request…"
        ) : (
          <>
            <Icon name="calendar" size={18} />
            Request Appointment
          </>
        )}
      </button>

      <p className="mt-4 text-center text-[12.5px] leading-relaxed text-ink-500">
        Submitting this form sends an appointment <strong>request</strong>. The
        clinic will call you to confirm the final time.
      </p>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-red-600">
      {children}
    </p>
  );
}
