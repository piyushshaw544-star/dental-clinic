"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { appointments, services } from "@/db/schema";
import { TIME_SLOTS, todayISO } from "@/lib/clinic";

export type BookingState = {
  ok: boolean;
  ref?: string;
  summary?: { name: string; date: string; time: string; service: string };
  error?: string;
  field?: string;
} | null;

function generateRef(): string {
  const n = Math.floor(Math.random() * 46_655).toString(36).toUpperCase();
  const t = Date.now().toString(36).slice(-3).toUpperCase();
  return `DRC-${t}${n.padStart(3, "0")}`;
}

const PHONE_RE = /^(\+?91[-\s]?)?[6-9]\d{9}$/;

export async function createAppointment(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phone = phoneRaw.replace(/[\s-]/g, "");
  const email = String(formData.get("email") ?? "").trim();
  const serviceSlug = String(formData.get("serviceSlug") ?? "").trim();
  const preferredDate = String(formData.get("preferredDate") ?? "").trim();
  const preferredTime = String(formData.get("preferredTime") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (fullName.length < 2) {
    return { ok: false, error: "Please enter your full name.", field: "fullName" };
  }
  if (!PHONE_RE.test(phone)) {
    return {
      ok: false,
      error: "Please enter a valid 10-digit mobile number.",
      field: "phone",
    };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right.", field: "email" };
  }
  if (!serviceSlug) {
    return { ok: false, error: "Please choose a service.", field: "serviceSlug" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || preferredDate < todayISO()) {
    return {
      ok: false,
      error: "Please choose a date from today onwards.",
      field: "preferredDate",
    };
  }
  if (!(TIME_SLOTS as readonly string[]).includes(preferredTime)) {
    return { ok: false, error: "Please choose a time slot.", field: "preferredTime" };
  }

  const serviceRows = await db
    .select()
    .from(services)
    .where(eq(services.slug, serviceSlug))
    .limit(1);
  const service = serviceRows[0];
  if (!service) {
    return { ok: false, error: "That service is not available.", field: "serviceSlug" };
  }

  // slot still free?
  const clash = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        eq(appointments.preferredDate, preferredDate),
        eq(appointments.preferredTime, preferredTime),
      ),
    )
    .limit(1);

  if (clash.length > 0) {
    return {
      ok: false,
      error: "That slot has just been taken. Please pick another time.",
      field: "preferredTime",
    };
  }

  const ref = generateRef();

  try {
    await db.insert(appointments).values({
      ref,
      fullName,
      phone,
      email: email || null,
      serviceSlug,
      serviceName: service.name,
      preferredDate,
      preferredTime,
      notes: notes || null,
    });
  } catch {
    return {
      ok: false,
      error: "That slot has just been taken. Please pick another time.",
      field: "preferredTime",
    };
  }

  return {
    ok: true,
    ref,
    summary: {
      name: fullName,
      date: preferredDate,
      time: preferredTime,
      service: service.name,
    },
  };
}

export async function getTakenSlots(date: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const rows = await db
    .select({ time: appointments.preferredTime })
    .from(appointments)
    .where(eq(appointments.preferredDate, date));
  return rows.map((r) => r.time);
}
