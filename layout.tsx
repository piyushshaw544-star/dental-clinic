import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CLINIC } from "@/lib/clinic";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${CLINIC.name} — Dental Care in ${CLINIC.area}`,
    template: `%s · ${CLINIC.shortName}`,
  },
  description:
    "Dr Rohit's Multispeciality Dental Clinic in J.K. Nagar, West Bengal offers complete dental care — check-ups, cleaning, fillings, crowns, braces, root canal treatment, gum care and more under one roof.",
  keywords: [
    "dental clinic J.K. Nagar",
    "dentist West Bengal",
    "Dr Rohit dental clinic",
    "root canal treatment",
    "braces",
    "teeth cleaning",
  ],
  openGraph: {
    title: `${CLINIC.name} — Dental Care in ${CLINIC.area}`,
    description:
      "Professional, gentle and patient-focused dental care for you and your family.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#2480e4" />
      </head>
      <body className="min-h-screen bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
