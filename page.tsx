import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { appointments, enquiries } from "@/db/schema";
import { AdminUnlock } from "@/components/admin-unlock";
import { Icon } from "@/components/icons";
import { formatDateLong, formatSlot } from "@/lib/clinic";
import { isUnlocked, lock, setStatus } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clinic Dashboard",
  robots: { index: false, follow: false },
};

const STATUS_STYLES: Record<string, string> = {
  requested: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-brand-50 text-brand-700 ring-brand-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default async function AdminPage() {
  if (!(await isUnlocked())) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-gradient-to-b from-brand-50 to-white px-6 py-16">
        <AdminUnlock />
      </main>
    );
  }

  const [rows, messages] = await Promise.all([
    db.select().from(appointments).orderBy(desc(appointments.createdAt)).limit(100),
    db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(25),
  ]);

  const counts = {
    total: rows.length,
    requested: rows.filter((r) => r.status === "requested").length,
    confirmed: rows.filter((r) => r.status === "confirmed").length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-extrabold tracking-tight text-ink-900">
              Clinic Dashboard
            </h1>
            <p className="mt-1 text-[14.5px] text-ink-600">
              Appointment requests and patient messages.
            </p>
          </div>
          <form action={lock}>
            <button
              type="submit"
              className="rounded-full border-2 border-brand-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Lock dashboard
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total requests", value: counts.total, icon: "calendar" },
            { label: "Awaiting confirmation", value: counts.requested, icon: "clock" },
            { label: "Confirmed", value: counts.confirmed, icon: "check" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-brand-100 bg-white p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={s.icon} size={19} />
              </span>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink-900">
                {s.value}
              </p>
              <p className="text-[13px] text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* appointments */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-brand-100 bg-white">
          <div className="border-b border-brand-100 px-6 py-5">
            <h2 className="font-display text-[17px] font-bold text-ink-900">
              Appointment requests
            </h2>
          </div>

          {rows.length === 0 ? (
            <p className="px-6 py-16 text-center text-[14.5px] text-ink-500">
              No appointment requests yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-[14px]">
                <thead className="bg-brand-50/60 text-[11px] uppercase tracking-[0.12em] text-ink-500">
                  <tr>
                    <th className="px-6 py-3.5 font-bold">Ref</th>
                    <th className="px-4 py-3.5 font-bold">Patient</th>
                    <th className="px-4 py-3.5 font-bold">Service</th>
                    <th className="px-4 py-3.5 font-bold">Slot</th>
                    <th className="px-4 py-3.5 font-bold">Status</th>
                    <th className="px-6 py-3.5 font-bold">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {rows.map((r) => (
                    <tr key={r.id} className="align-top hover:bg-brand-50/40">
                      <td className="px-6 py-4 font-mono text-[12.5px] font-semibold text-brand-700">
                        {r.ref}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-ink-900">{r.fullName}</p>
                        <p className="text-[13px] text-ink-500">{r.phone}</p>
                        {r.email ? (
                          <p className="text-[13px] text-ink-400">{r.email}</p>
                        ) : null}
                        {r.notes ? (
                          <p className="mt-1 max-w-xs text-[12.5px] italic text-ink-500">
                            “{r.notes}”
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 text-ink-700">{r.serviceName}</td>
                      <td className="px-4 py-4 text-ink-700">
                        <p className="font-medium">{formatDateLong(r.preferredDate)}</p>
                        <p className="text-[13px] text-ink-500">
                          {formatSlot(r.preferredTime)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-wide ring-1 ${
                            STATUS_STYLES[r.status] ?? STATUS_STYLES.requested
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {["confirmed", "completed", "cancelled"].map((s) => (
                            <form action={setStatus} key={s}>
                              <input type="hidden" name="id" value={r.id} />
                              <input type="hidden" name="status" value={s} />
                              <button
                                type="submit"
                                className="rounded-lg border border-brand-100 px-2.5 py-1.5 text-[12px] font-semibold text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                              >
                                {s}
                              </button>
                            </form>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* enquiries */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-brand-100 bg-white">
          <div className="border-b border-brand-100 px-6 py-5">
            <h2 className="font-display text-[17px] font-bold text-ink-900">
              Messages
            </h2>
          </div>
          {messages.length === 0 ? (
            <p className="px-6 py-14 text-center text-[14.5px] text-ink-500">
              No messages yet.
            </p>
          ) : (
            <ul className="divide-y divide-brand-50">
              {messages.map((m) => (
                <li key={m.id} className="px-6 py-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold text-ink-900">{m.fullName}</p>
                    <p className="text-[13px] text-ink-500">{m.phone}</p>
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">
                    {m.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
