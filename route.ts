import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { TIME_SLOTS } from "@/lib/clinic";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }

  const rows = await db
    .select({ time: appointments.preferredTime })
    .from(appointments)
    .where(eq(appointments.preferredDate, date));

  const taken = rows.map((r) => r.time);
  return Response.json({
    date,
    taken,
    available: TIME_SLOTS.filter((slot) => !taken.includes(slot)),
  });
}
