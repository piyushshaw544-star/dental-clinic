export const CLINIC = {
  name: "Dr Rohit's Multispeciality Dental Clinic",
  shortName: "Dr Rohit's Dental Clinic",
  tagline: "Complete Dental Care for a Healthy, Confident Smile",
  area: "J.K. Nagar",
  city: "J.K. Nagar, West Bengal",
  state: "West Bengal",
  country: "India",
  addressLines: ["J.K. Nagar", "West Bengal, India"],
  // Update NEXT_PUBLIC_CLINIC_PHONE / _EMAIL in .env to publish real contact details.
  phoneDisplay: process.env.NEXT_PUBLIC_CLINIC_PHONE ?? "+91 00000 00000",
  email: process.env.NEXT_PUBLIC_CLINIC_EMAIL ?? "appointments@drrohitdental.in",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 1:00 PM  ·  5:00 PM – 8:30 PM" },
    { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    { day: "Sunday", time: "By prior appointment" },
  ],
} as const;

export const phoneHref = `tel:${CLINIC.phoneDisplay.replace(/[^\d+]/g, "")}`;

/** Bookable 30-minute slots, stored as 24h "HH:MM" strings. */
export const TIME_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
] as const;

export function formatSlot(value: string): string {
  const [hRaw, m] = value.split(":");
  const h = Number(hRaw);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m} ${suffix}`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
