import type { SVGProps } from "react";

const TOOTH_D =
  "M8 3C5.2 3 3.8 5.1 3.8 7.7c0 1.9.6 3.3 1.1 4.9.4 1.4.6 2.7.8 4.1.2 1.3.5 2.5 1.5 2.5 1.1 0 1.4-1.3 1.7-2.8.3-1.5.6-3.1 1.6-3.1s1.3 1.6 1.6 3.1c.3 1.5.6 2.8 1.7 2.8 1 0 1.3-1.2 1.5-2.5.2-1.4.4-2.7.8-4.1.5-1.6 1.1-3 1.1-4.9C20.2 5.1 18.8 3 16 3c-1.2 0-2.2.5-4 .5S9.2 3 8 3Z";

/** Tooth scaled down so a badge can sit in the lower-right corner. */
function ToothSmall() {
  return (
    <g transform="translate(0.6 0.4) scale(0.8)">
      <path d={TOOTH_D} />
    </g>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <circle cx="17.6" cy="17.6" r="5.1" fill="#fff" stroke="none" />
      <circle cx="17.6" cy="17.6" r="4.4" />
      {children}
    </g>
  );
}

const PATHS: Record<string, React.ReactNode> = {
  checkup: (
    <>
      <ToothSmall />
      <Badge>
        <path d="m15.7 17.6 1.3 1.3 2.5-2.6" />
      </Badge>
    </>
  ),
  cleaning: (
    <>
      <ToothSmall />
      <Badge>
        <path d="M17.6 15.1c.35 1.75 1 2.4 2.75 2.75-1.75.35-2.4 1-2.75 2.75-.35-1.75-1-2.4-2.75-2.75 1.75-.35 2.4-1 2.75-2.75Z" />
      </Badge>
    </>
  ),
  extraction: (
    <>
      <ToothSmall />
      <Badge>
        <path d="M17.6 15.2v4.8m0 0-1.7-1.7m1.7 1.7 1.7-1.7" />
      </Badge>
    </>
  ),
  crown: (
    <>
      <path d="M3.6 19.2h16.8" />
      <path d="M4.9 19.2 3.3 8.1l5.4 3.6L12 4.6l3.3 7.1 5.4-3.6-1.6 11.1" />
      <circle cx="12" cy="15.4" r="1.1" />
    </>
  ),
  braces: (
    <>
      <path d="M2.6 12h18.8" />
      <rect x="3.7" y="9.1" width="3.8" height="5.8" rx="1.3" />
      <rect x="10.1" y="9.1" width="3.8" height="5.8" rx="1.3" />
      <rect x="16.5" y="9.1" width="3.8" height="5.8" rx="1.3" />
    </>
  ),
  "root-canal": (
    <>
      <path d={TOOTH_D} />
      <path d="M10.2 9.4c-.1 2.7-.5 4.6-1 7.1" />
      <path d="M13.8 9.4c.1 2.7.5 4.6 1 7.1" />
      <path d="M9.4 7.4h5.2" />
    </>
  ),
  filling: (
    <>
      <path d={TOOTH_D} />
      <path
        d="M10 7.2h4a1.3 1.3 0 0 1 1.3 1.3v2.2a1.3 1.3 0 0 1-1.3 1.3h-4a1.3 1.3 0 0 1-1.3-1.3V8.5A1.3 1.3 0 0 1 10 7.2Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
    </>
  ),
  cosmetic: (
    <>
      <ToothSmall />
      <Badge>
        <path d="m17.6 15 1.8 2.6-1.8 2.6-1.8-2.6L17.6 15Z" />
      </Badge>
    </>
  ),
  gum: (
    <>
      <path d="M3.9 15.2c0-3.1 2.4-4.8 8.1-4.8s8.1 1.7 8.1 4.8c0 2.4-1.8 3.9-3.5 2.9-1.2-.7-1.8-1.9-4.6-1.9s-3.4 1.2-4.6 1.9c-1.7 1-3.5-.5-3.5-2.9Z" />
      <path d="M7.7 10.5V7.1a1.7 1.7 0 0 1 3.4 0v3.1" />
      <path d="M13.1 10.3V7.1a1.7 1.7 0 0 1 3.4 0v3.4" />
    </>
  ),
  general: (
    <>
      <ToothSmall />
      <Badge>
        <path d="M17.6 15.2v4.8M15.2 17.6h4.8" />
      </Badge>
    </>
  ),
  /* ── UI icons ───────────────────────────── */
  phone: (
    <path d="M6.3 3.5h3l1.5 3.8-1.9 1.1a12.4 12.4 0 0 0 5.7 5.7l1.1-1.9 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A15.9 15.9 0 0 1 4.5 5.5a1.8 1.8 0 0 1 1.8-2Z" />
  ),
  calendar: (
    <>
      <rect x="3.2" y="5" width="17.6" height="16" rx="3" />
      <path d="M3.2 10h17.6M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.3" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 7v5.3l3.3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.8 5.9v5.4c0 4.5 3 8.7 7.2 9.9 4.2-1.2 7.2-5.4 7.2-9.9V5.9L12 2.8Z" />
      <path d="m9.2 11.9 2 2 3.6-3.8" />
    </>
  ),
  sparkle: (
    <path d="M12 3.2c.6 3.9 2.2 5.5 6.1 6.1-3.9.6-5.5 2.2-6.1 6.1-.6-3.9-2.2-5.5-6.1-6.1 3.9-.6 5.5-2.2 6.1-6.1Z" />
  ),
  heart: (
    <path d="M12 20.3s-7.6-4.6-7.6-9.6a4.2 4.2 0 0 1 7.6-2.5 4.2 4.2 0 0 1 7.6 2.5c0 5-7.6 9.6-7.6 9.6Z" />
  ),
  users: (
    <>
      <circle cx="9.2" cy="8.4" r="3.4" />
      <path d="M2.8 20c0-3.5 2.9-5.6 6.4-5.6s6.4 2.1 6.4 5.6" />
      <path d="M16.2 5.4a3.4 3.4 0 0 1 0 6.3M17.4 14.8c2.3.5 3.8 2.3 3.8 5.2" />
    </>
  ),
  chat: (
    <path d="M20.6 12.3c0 4-3.9 7.2-8.6 7.2a9.9 9.9 0 0 1-2.6-.3l-5 1.5 1.6-4A6.8 6.8 0 0 1 3.4 12c0-4 3.8-7.2 8.6-7.2s8.6 3.2 8.6 7.5Z" />
  ),
  check: <path d="m4.8 12.6 4.7 4.6L19.4 7" />,
  arrow: <path d="M4.5 12h15m0 0-5.6-5.6M19.5 12l-5.6 5.6" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: (
    <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z" />
  ),
  tooth: <path d={TOOTH_D} />,
};

export type IconName = keyof typeof PATHS | string;

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.6,
  ...rest
}: { name: IconName; size?: number; strokeWidth?: number } & Omit<
  SVGProps<SVGSVGElement>,
  "name"
>) {
  const node = PATHS[name] ?? PATHS.tooth;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {node}
    </svg>
  );
}
