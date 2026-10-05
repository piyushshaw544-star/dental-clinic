import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 font-display text-[clamp(1.75rem,4vw,2.65rem)] font-extrabold leading-[1.15] tracking-tight text-ink-900">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={150}>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
