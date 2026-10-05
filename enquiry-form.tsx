"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import { Icon } from "@/components/icons";

const inputCls =
  "w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-[15px] text-ink-900 outline-none transition-all placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100";

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(
    sendEnquiry,
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-3xl border border-brand-100 bg-white p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint-500/12 text-mint-600">
          <Icon name="check" size={26} strokeWidth={2.4} />
        </span>
        <p className="mt-5 font-display text-[19px] font-bold text-ink-900">
          Message received
        </p>
        <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-600">
          Thank you for writing to us. Someone from the clinic will get back to
          you on the number you shared.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-brand-100 bg-white p-7 shadow-[0_26px_60px_-44px_rgba(13,61,112,0.5)] sm:p-8"
    >
      <p className="font-display text-[19px] font-bold text-ink-900">
        Send us a message
      </p>
      <p className="mt-1.5 text-[14px] text-ink-600">
        Have a question before booking? Write to us and we will respond.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="e-name" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
            Full name <span className="text-brand-500">*</span>
          </label>
          <input id="e-name" name="fullName" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="e-phone" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
            Mobile number <span className="text-brand-500">*</span>
          </label>
          <input
            id="e-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            placeholder="10-digit mobile number"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="e-msg" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
            Message <span className="text-brand-500">*</span>
          </label>
          <textarea
            id="e-msg"
            name="message"
            rows={4}
            required
            placeholder="How can we help you?"
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      {state && !state.ok ? (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(36,128,228,1)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Sending…" : <>Send Message<Icon name="arrow" size={17} /></>}
      </button>
    </form>
  );
}
