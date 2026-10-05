import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { services, type Service } from "@/db/schema";

export async function getServices(): Promise<Service[]> {
  return db.select().from(services).orderBy(asc(services.sortOrder));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}
