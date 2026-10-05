"use client";

import { useActionState } from "react";
import { unlock, type UnlockState } from "@/app/admin/actions";
import { Icon } from "@/components/icons";

export function AdminUnlock() {
  const [state, formAction, pending] = useActionState<UnlockState, FormData>(
    unlock,
    null,
  );

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-sm rounded-3xl border border-brand-100 bg-white p-8 shadow-[0_26px_60px_-44px_rgba(13,61,112,0.5)]"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon name="shield" size={22} />
      </span>
      <h1 className="mt-5 font-display text-[21px] font-extrabold text-ink-900">
        Clinic Dashboard
      </h1>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
        Enter the staff passcode to view appointment requests.
      </p>
      <input
        name="passcode"
        type="password"
        required
        autoFocus
        placeholder="Passcode"
        className="mt-5 w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-[15px] outline-none transition-all focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
      />
      {state?.error ? (
        <p role="alert" className="mt-3 text-[13px] font-medium text-red-600">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
