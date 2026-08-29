import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import SiteNav from "@/components/ui/SiteNav";
import SiteFooter from "@/components/ui/SiteFooter";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";
import ServiceWorkerRegistrar from "@/components/pwa/ServiceWorkerRegistrar";
import { identity } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

/**
 * The display face. Fraunces is a variable serif with an optical-size axis, so
 * the masthead can be set at a high optical size where the contrast between
 * thick and thin strokes is at its most dramatic, while smaller headings stay
 * sturdy. A geometric sans at display size is what the previous build used and
 * is the single strongest tell of a generated portfolio.
 */
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  // No `weight` here on purpose: next/font only accepts custom `axes` when the
  // face is loaded as a true variable font, which means leaving weight
  // unpinned. That is what we want anyway, since the masthead and the smaller
  // headings sit at different weights on the same axis.
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-serif",
});

const fullName = `${identity.firstName} ${identity.lastName}`;

export const metadata = {
  title: `${fullName} | ${identity.role}`,
  description: identity.subtitle,
  openGraph: {
    title: `${fullName} | ${identity.role}`,
    description: identity.subtitle,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#f4f1ea",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${display.variable}`}>
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
        <FirebaseAnalytics />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
