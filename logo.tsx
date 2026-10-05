import Link from "next/link";
import { Icon } from "@/components/icons";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(36,128,228,0.85)] transition-transform duration-300 group-hover:scale-105">
        <Icon name="tooth" size={22} strokeWidth={1.7} />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink-900 sm:text-base">
          Dr Rohit&rsquo;s
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600 ${
            compact ? "" : "sm:text-[11px]"
          }`}
        >
          Multispeciality Dental Clinic
        </span>
      </span>
    </Link>
  );
}
