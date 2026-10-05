import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  summary: text("summary").notNull(),
  icon: text("icon").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const appointments = pgTable(
  "appointments",
  {
    id: serial("id").primaryKey(),
    ref: text("ref").notNull().unique(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    serviceSlug: text("service_slug").notNull(),
    serviceName: text("service_name").notNull(),
    preferredDate: text("preferred_date").notNull(),
    preferredTime: text("preferred_time").notNull(),
    notes: text("notes"),
    status: text("status").notNull().default("requested"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("appointments_slot_idx").on(
      table.preferredDate,
      table.preferredTime,
    ),
  ],
);

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
