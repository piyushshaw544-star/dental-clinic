"use server";

import { db } from "@/db";
import { enquiries } from "@/db/schema";

export type EnquiryState = { ok: boolean; error?: string } | null;

const PHONE_RE = /^(\+?91[-\s]?)?[6-9]\d{9}$/;

export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim().replace(/[\s-]/g, "");
  const message = String(formData.get("message") ?? "").trim();

  if (fullName.length < 2) return { ok: false, error: "Please enter your name." };
  if (!PHONE_RE.test(phone))
    return { ok: false, error: "Please enter a valid 10-digit mobile number." };
  if (message.length < 5)
    return { ok: false, error: "Please write a short message." };

  await db.insert(enquiries).values({ fullName, phone, message });
  return { ok: true };
}
