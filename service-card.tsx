import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Service } from "@/db/schema";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white p-7 shadow-[0_2px_8px_rgba(13,61,112,0.04)] transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_24px_48px_-24px_rgba(13,61,112,0.35)]">
      {/* hover wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50/0 via-brand-50/0 to-brand-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:to-brand-50/80"
      />

      <div className="relative">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-brand-100 transition-all duration-400 group-hover:from-brand-600 group-hover:to-brand-500 group-hover:text-white group-hover:ring-brand-300">
          <Icon name={service.icon} size={28} strokeWidth={1.5} />
        </span>

        <h3 className="mt-5 font-display text-[17px] font-bold leading-snug text-ink-900">
          {service.name}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">
          {service.summary}
        </p>
      </div>

      <div className="relative mt-auto pt-5">
        <Link
          href={`/book?service=${service.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Book this service
          <Icon
            name="arrow"
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
