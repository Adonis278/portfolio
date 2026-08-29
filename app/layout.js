import { Inter, JetBrains_Mono } from "next/font/google";
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

const fullName = `${identity.firstName} ${identity.lastName}`;

export const metadata = {
  title: `${fullName} | AI Engineer & Cloud Solutions Architect`,
  description: identity.subtitle,
  openGraph: {
    title: `${fullName} | AI Engineer & Cloud Solutions Architect`,
    description: identity.subtitle,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#030407",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        {children}
        <FirebaseAnalytics />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
