"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appointments } from "@/db/schema";

const COOKIE = "clinic_admin";

function adminPasscode(): string {
  return process.env.ADMIN_PASSCODE ?? "clinic123";
}

export async function isUnlocked(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE)?.value === adminPasscode();
}

export type UnlockState = { error?: string } | null;

export async function unlock(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const code = String(formData.get("passcode") ?? "");
  if (code !== adminPasscode()) {
    return { error: "Incorrect passcode." };
  }
  const store = await cookies();
  store.set(COOKIE, code, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  revalidatePath("/admin");
  return null;
}

export async function lock(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
  revalidatePath("/admin");
}

export async function setStatus(formData: FormData): Promise<void> {
  if (!(await isUnlocked())) return;
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  if (!Number.isFinite(id) || !["requested", "confirmed", "completed", "cancelled"].includes(status)) {
    return;
  }
  await db.update(appointments).set({ status }).where(eq(appointments.id, id));
  revalidatePath("/admin");
}
